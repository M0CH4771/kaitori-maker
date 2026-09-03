from pathlib import Path
import re

path = Path('index.html')
text = path.read_text(encoding='utf-8')

# 1) 固定の絞り込み項目を すべて / 強化 / 超強化 / 掲載 に変更
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

# 2) フィルター候補の生成関数を明示的な4項目ベースに変更
refresh_pattern = re.compile(
    r'\n\s*function\s+refreshSingleStatusFilterOptions\s*\(\s*\)\s*\{.*?\n\s*\}\n(?=\s*function\s+getFilteredSingleCards)',
    re.S,
)
refresh_replacement = r'''

    function refreshSingleStatusFilterOptions() {
        const select = document.getElementById("singleStatusFilterSelect");
        if (!select) return;

        const selectedValue = select.value || "all";
        const fixedStatuses = new Set(["強化", "超強化", "掲載"]);
        const actualStatuses = Array.from(
            new Set(
                globalCardData
                    .map(card => String(card.status || "").trim())
                    .filter(status => status && !fixedStatuses.has(status))
            )
        ).sort((a, b) => a.localeCompare(b, "ja"));
        const hasBlankStatus = globalCardData.some(
            card => !String(card.status || "").trim()
        );

        const options = [
            ["all", "掲載状況：すべて"],
            ["strengthened", "強化"],
            ["super-strengthened", "超強化"],
            ["listed", "掲載"]
        ];
        actualStatuses.forEach(status => {
            options.push([`status:${status}`, `掲載「${status}」だけ`]);
        });
        if (hasBlankStatus) {
            options.push(["status:", "掲載状況：空欄だけ"]);
        }

        select.replaceChildren(
            ...options.map(([value, label]) => {
                const option = document.createElement("option");
                option.value = value;
                option.textContent = label;
                return option;
            })
        );
        select.value = options.some(([value]) => value === selectedValue)
            ? selectedValue
            : "all";
    }
'''
text, count = refresh_pattern.subn(refresh_replacement, text, count=1)
if count != 1:
    raise SystemExit(f'refreshSingleStatusFilterOptions replacement count={count}')

# 3) 既存の判定を完全一致へ。超強化・掲載を追加。
# strengthened の includes("強化") を exact 強化へ変更
strength_pattern = re.compile(
    r'if\s*\(\s*statusFilter\s*===\s*["\']strengthened["\']\s*\)\s*\{?\s*(?:return\s+)?status\.includes\(\s*["\']強化["\']\s*\)\s*;?\s*\}?',
    re.S,
)
strength_replacement = '''if (statusFilter === "strengthened") {
                return status === "強化";
            }
            if (statusFilter === "super-strengthened") {
                return status === "超強化";
            }
            if (statusFilter === "listed") {
                return status === "掲載";
            }'''
text, count = strength_pattern.subn(strength_replacement, text, count=1)
if count != 1:
    # 別形式の ternary/代入を想定して、includes だけをまず exact に変える
    old = 'status.includes("強化")'
    if old not in text:
        raise SystemExit('strengthened filter condition not found')
    text = text.replace(old, 'status === "強化"', 1)
    # strengthened 判定の直後へ2条件追加
    marker = 'status === "強化"'
    pos = text.find(marker)
    line_end = text.find('\n', pos)
    if pos < 0 or line_end < 0:
        raise SystemExit('could not extend strengthened filter')
    # このフォールバックは次の not-strengthened の置換で処理する

# not-strengthened は廃止。存在する場合は super/listed 分岐へ置換
not_strength_pattern = re.compile(
    r'if\s*\(\s*statusFilter\s*===\s*["\']not-strengthened["\']\s*\)\s*\{?\s*(?:return\s+)?!status\.includes\(\s*["\']強化["\']\s*\)\s*;?\s*\}?',
    re.S,
)
if not_strength_pattern.search(text):
    text = not_strength_pattern.sub(
        '''if (statusFilter === "super-strengthened") {
                return status === "超強化";
            }
            if (statusFilter === "listed") {
                return status === "掲載";
            }''',
        text,
        count=1,
    )

# 既に上で強化分岐全体を置換した場合、重複がないことを確認
if text.count('statusFilter === "super-strengthened"') != 1:
    raise SystemExit(f'super-strengthened branch count={text.count(chr(115)+"tatusFilter === "+chr(34)+"super-strengthened"+chr(34))}')
if text.count('statusFilter === "listed"') != 1:
    raise SystemExit('listed branch count is not 1')

# 旧固定項目は残さない
text = text.replace('<option value="not-strengthened">強化以外</option>', '')

path.write_text(text, encoding='utf-8')
print('patched single status filter: all / 強化 / 超強化 / 掲載')
