from pathlib import Path

path = Path('index.html')
text = path.read_text(encoding='utf-8')

css_marker = '''        .ticket-product-image {
            display: block;
            width: 100%;'''
if text.count(css_marker) != 1:
    raise SystemExit(f'ticket image css marker: expected 1, got {text.count(css_marker)}')
text = text.replace(
    css_marker,
    '''        .ticket-product-image[hidden],
        .ticket-image-placeholder[hidden] {
            display: none !important;
        }

        .ticket-product-image {
            display: block;
            width: 100%;''',
    1,
)

function_start = text.find('    async function exportPrizeTicket() {')
if function_start < 0:
    raise SystemExit('exportPrizeTicket not found')
function_end = text.find('\n    }', function_start)
# Find the function's actual end after its catch block.
function_end = text.find('\n    }\n', text.find('        } catch (error) {', function_start))
if function_end < 0:
    raise SystemExit('exportPrizeTicket end not found')
segment = text[function_start:function_end + len('\n    }\n')]
old = '''                height: 1039,
                logging: false
            });'''
new = '''                height: 1039,
                logging: false,
                onclone: clonedDocument => {
                    const clonedTicket = clonedDocument.getElementById("prizeTicket");
                    if (clonedTicket) {
                        clonedTicket.style.transform = "none";
                        clonedTicket.style.transformOrigin = "top left";
                    }
                }
            });'''
if segment.count(old) != 1:
    raise SystemExit(f'html2canvas option marker: expected 1, got {segment.count(old)}')
segment = segment.replace(old, new, 1)
text = text[:function_start] + segment + text[function_start + len(text[function_start:function_end + len('\n    }\n')]):]

required = [
    '.ticket-product-image[hidden]',
    'onclone: clonedDocument =>',
    'clonedTicket.style.transform = "none";'
]
for marker in required:
    if marker not in text:
        raise SystemExit(f'missing marker: {marker}')

path.write_text(text, encoding='utf-8')
