from pathlib import Path

patch_path = Path('.github/patch-prize-ticket-tool.py')
source = patch_path.read_text(encoding='utf-8')

# The app has several identical grid declarations. Only replace the first one,
# which is the main .view-tabs rule.
start = source.find('# 4タブ化')
next_block = source.find("replace_once(\n    '<p>CSVを読み込んで、買取表・単品告知画像・X投稿文を作成できます。</p>'", start)
if start < 0 or next_block < 0:
    raise SystemExit('Could not locate prize ticket patch header block')

replacement = '''# 4タブ化
if 'grid-template-columns: repeat(3, minmax(0, 1fr));' not in text:
    raise SystemExit('view tabs grid marker missing')
text = text.replace(
    'grid-template-columns: repeat(3, minmax(0, 1fr));',
    'grid-template-columns: repeat(4, minmax(0, 1fr));',
    1,
)

'''
source = source[:start] + replacement + source[next_block:]

# The same key sequence appears in STORE_DATA_KEYS and JSON_STORE_DATA_KEYS.
# Remove the ambiguous replacements from the original patch and replace them
# with declaration-scoped edits.
def remove_replace_once_by_label(source_text, label):
    tail = f"    '{label}',\n)"
    label_pos = source_text.find(tail)
    if label_pos < 0:
        raise SystemExit(f'Could not locate patch block: {label}')
    block_start = source_text.rfind('replace_once(', 0, label_pos)
    if block_start < 0:
        raise SystemExit(f'Could not locate replace_once start: {label}')
    block_end = label_pos + len(tail)
    while block_end < len(source_text) and source_text[block_end] == '\n':
        block_end += 1
    return source_text[:block_start] + source_text[block_end:]

source = remove_replace_once_by_label(source, 'store data key')
source = remove_replace_once_by_label(source, 'json store data key')

storage_patch = r'''
# 店舗保存キーは宣言ブロックごとに限定して追加する。
def insert_ticket_settings_key_in_block(head, end_marker, label):
    global text
    start_index = text.find(head)
    if start_index < 0:
        raise SystemExit(f'{label}: declaration not found')
    end_index = text.find(end_marker, start_index)
    if end_index < 0:
        raise SystemExit(f'{label}: declaration end not found')
    end_index += len(end_marker)
    block = text[start_index:end_index]
    needle = '        SINGLE_TEMPLATE_STORAGE_KEY,\n        X_POST_TEMPLATE_STORAGE_KEY,'
    if block.count(needle) != 1:
        raise SystemExit(f'{label}: expected one storage insertion point, got {block.count(needle)}')
    block = block.replace(
        needle,
        '        SINGLE_TEMPLATE_STORAGE_KEY,\n        TICKET_SETTINGS_STORAGE_KEY,\n        X_POST_TEMPLATE_STORAGE_KEY,',
        1,
    )
    text = text[:start_index] + block + text[end_index:]

insert_ticket_settings_key_in_block(
    '    const STORE_DATA_KEYS = [',
    '\n    ];',
    'STORE_DATA_KEYS',
)
insert_ticket_settings_key_in_block(
    '    const JSON_STORE_DATA_KEYS = new Set([',
    '\n    ]);',
    'JSON_STORE_DATA_KEYS',
)

'''
insert_marker = '# 引換券画面をメインscript直前へ追加'
insert_pos = source.find(insert_marker)
if insert_pos < 0:
    raise SystemExit('Could not locate ticket view patch marker')
source = source[:insert_pos] + storage_patch + source[insert_pos:]

exec(compile(source, str(patch_path), 'exec'))
