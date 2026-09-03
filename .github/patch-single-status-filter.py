from pathlib import Path
import re

path = Path('index.html')
text = path.read_text(encoding='utf-8')

# 1) セレクトの固定項目を明示
select_pattern = re.compile(r'(<select\s+id="singleStatusFilterSelect"[^>]*>).*?(</select>)', re.S)
select_replacement = '''\\1
                            <option value="all">掲載状況：すべて</option>
                            <option value="strengthened">強化</option>
                            <option value="super-strengthened">超強化</option>
                            <option value="listed">掲載</option>
                        \\2'''
text, count = select_pattern.subn(select_replacement, text, count=1)
if count != 1:
    raise SystemExit(f'singleStatusFilterSelect replacement count={count}')

# 2) CSV中の追加ステータスは残しつつ、強化/超強化/掲載は重複表示しない
old_refresh = '''    function refreshSingleStatusFilterOptions() {
        const select = document.getElementById("singleStatusFilterSelect");
        if (!select) return;
        const currentValue = select.value || "all";
        const statuses = Array.from(new Set(globalCardData.map(card => String(card.status || "").trim()).filter(Boolean))).sort((a,b) => a.localeCompare(b, "ja", {numeric:true, sensitivity:"base"}));
        const options = [["all","掲載状況：すべて"],["strengthened","強化のみ"],["not-strengthened","強化以外"], ...statuses.map(status => [`status:${status}`, `掲載「${status}」だけ`])];
        if (globalCardData.some(card => !String(card.status || "").trim())) options.push(["status:","掲載状況：空欄だけ"]);
        select.innerHTML = "";
        options.forEach(([value,label]) => { const option = document.createElement("option"); option.value = value; option.textContent = label; select.appendChild(option); });
        select.value = options.some(([value]) => value === currentValue) ? currentValue : "all";
    }
'''
new_refresh = '''    function refreshSingleStatusFilterOptions() {
        const select = document.getElementById("singleStatusFilterSelect");
        if (!select) return;
        const currentValue = select.value || "all";
        const fixedStatuses = new Set(["強化", "超強化", "掲載"]);
        const statuses = Array.from(
            new Set(
                globalCardData
                    .map(card => String(card.status || "").trim())
                    .filter(status => status && !fixedStatuses.has(status))
            )
        ).sort((a,b) => a.localeCompare(b, "ja", {numeric:true, sensitivity:"base"}));
        const options = [
            ["all", "掲載状況：すべて"],
            ["strengthened", "強化"],
            ["super-strengthened", "超強化"],
            ["listed", "掲載"],
            ...statuses.map(status => [`status:${status}`, `掲載「${status}」だけ`])
        ];
        if (globalCardData.some(card => !String(card.status || "").trim())) options.push(["status:","掲載状況：空欄だけ"]);
        select.innerHTML = "";
        options.forEach(([value,label]) => { const option = document.createElement("option"); option.value = value; option.textContent = label; select.appendChild(option); });
        select.value = options.some(([value]) => value === currentValue) ? currentValue : "all";
    }
'''
if old_refresh not in text:
    raise SystemExit('refreshSingleStatusFilterOptions exact block not found')
text = text.replace(old_refresh, new_refresh, 1)

# 3) 強化/超強化/掲載を完全一致で分離
old_match = 'const matchesStatus = statusFilter === "all" ? true : statusFilter === "strengthened" ? status.includes("強化") : statusFilter === "not-strengthened" ? !status.includes("強化") : statusFilter.startsWith("status:") ? status === statusFilter.slice(7) : true;'
new_match = 'const matchesStatus = statusFilter === "all" ? true : statusFilter === "strengthened" ? status === "強化" : statusFilter === "super-strengthened" ? status === "超強化" : statusFilter === "listed" ? status === "掲載" : statusFilter.startsWith("status:") ? status === statusFilter.slice(7) : true;'
if old_match not in text:
    raise SystemExit('getFilteredSingleCards status match line not found')
text = text.replace(old_match, new_match, 1)

path.write_text(text, encoding='utf-8')
print('patched single status filter: all / 強化 / 超強化 / 掲載')
