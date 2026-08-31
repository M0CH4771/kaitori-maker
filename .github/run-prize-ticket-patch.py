from pathlib import Path

patch_path = Path('.github/patch-prize-ticket-tool.py')
source = patch_path.read_text(encoding='utf-8')

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
exec(compile(source, str(patch_path), 'exec'))
