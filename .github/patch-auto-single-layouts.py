from pathlib import Path
import re

path = Path('index.html')
text = path.read_text(encoding='utf-8')

new_functions = r'''    function getBalancedSingleRowCounts(count, rows, columns) {
        const safeRows = Math.max(1, Number(rows) || 1);
        const safeColumns = Math.max(1, Number(columns) || 1);
        const safeCount = Math.max(1, Number(count) || 1);
        const base = Math.floor(safeCount / safeRows);
        const remainder = safeCount - (base * safeRows);
        const counts = Array(safeRows).fill(base);

        const balancedPriority = {
            1: {0: []},
            2: {0: [], 1: [0]},
            3: {0: [], 1: [1], 2: [0, 2]},
            4: {0: [], 1: [1], 2: [1, 2], 3: [0, 1, 3]},
            5: {0: [], 1: [2], 2: [1, 3], 3: [1, 2, 3], 4: [0, 1, 3, 4]}
        };
        const fallback = Array.from({length: safeRows}, (_, index) => index);
        const priority = balancedPriority[safeRows]?.[remainder] || fallback;
        priority.slice(0, remainder).forEach(index => {
            counts[index] += 1;
        });

        return counts
            .map(value => Math.min(safeColumns, value))
            .filter(value => value > 0);
    }

    function getSingleMultiLayout(size, count) {
        const safeCount = Math.min(
            MAX_SINGLE_ITEMS_PER_IMAGE,
            Math.max(2, Number(count) || 2)
        );
        const normalizedSize = SINGLE_SIZES.includes(size) ? size : "square";

        const layoutMap = {
            portrait: {
                2:[2,1], 3:[3,1], 4:[2,2], 5:[3,2], 6:[3,2],
                7:[4,2], 8:[4,2], 9:[3,3], 10:[4,3], 11:[4,3], 12:[4,3],
                13:[5,3], 14:[5,3], 15:[5,3], 16:[4,4],
                17:[5,4], 18:[5,4], 19:[5,4], 20:[5,4],
                21:[6,4], 22:[6,4], 23:[6,4], 24:[6,4], 25:[5,5],
                26:[6,5], 27:[6,5], 28:[6,5], 29:[6,5], 30:[6,5]
            },
            square: {
                2:[2,1], 3:[3,1], 4:[2,2], 5:[3,2], 6:[3,2],
                7:[4,2], 8:[4,2], 9:[5,2], 10:[5,2],
                11:[4,3], 12:[4,3], 13:[5,3], 14:[5,3], 15:[5,3],
                16:[6,3], 17:[6,3], 18:[6,3], 19:[7,3], 20:[7,3], 21:[7,3],
                22:[6,4], 23:[6,4], 24:[6,4],
                25:[7,4], 26:[7,4], 27:[7,4], 28:[7,4], 29:[8,4], 30:[8,4]
            },
            landscape: {
                2:[2,1], 3:[3,1], 4:[4,1], 5:[5,1],
                6:[3,2], 7:[4,2], 8:[4,2], 9:[5,2], 10:[5,2],
                11:[6,2], 12:[6,2], 13:[7,2], 14:[7,2], 15:[8,2], 16:[8,2],
                17:[6,3], 18:[6,3], 19:[7,3], 20:[7,3], 21:[7,3],
                22:[8,3], 23:[8,3], 24:[8,3],
                25:[9,3], 26:[9,3], 27:[9,3], 28:[10,3], 29:[10,3], 30:[10,3]
            }
        };

        const [columns, rows] = layoutMap[normalizedSize][safeCount];
        const density = safeCount >= 21
            ? "micro"
            : safeCount >= 13
                ? "ultra"
                : safeCount >= 9
                    ? "dense"
                    : safeCount >= 7 || (normalizedSize === "landscape" && safeCount >= 4)
                        ? "compact"
                        : "comfortable";
        const gap = density === "micro"
            ? (columns >= 9 ? 8 : 10)
            : density === "ultra"
                ? (columns >= 7 ? 9 : 11)
                : density === "dense"
                    ? 12
                    : density === "compact"
                        ? 14
                        : 18;
        const rowGap = density === "micro" ? 7 : density === "ultra" ? 9 : gap;
        const totalColumnGap = Math.max(0, columns - 1) * gap;
        const rowCounts = getBalancedSingleRowCounts(safeCount, rows, columns);

        return {
            columns,
            rows,
            rowCounts,
            density,
            gap,
            rowGap,
            cardWidth: `calc((100% - ${totalColumnGap}px) / ${columns})`
        };
    }

    function renderSingleProductRows(cards, settings, layout) {
        const rows = [];
        const rowCounts = Array.isArray(layout.rowCounts) && layout.rowCounts.length
            ? layout.rowCounts
            : [layout.columns];
        let offset = 0;
        rowCounts.forEach(rowCount => {
            if (offset >= cards.length) return;
            rows.push(cards.slice(offset, offset + rowCount));
            offset += rowCount;
        });
        if (offset < cards.length) {
            rows.push(cards.slice(offset));
        }

        return rows.map((row, rowIndex) => `
            <div
                class="single-ad-products-row"
                data-row="${rowIndex + 1}"
                data-items="${row.length}"
            >
                ${row.map(item => singleProductMarkup(item, settings)).join("")}
            </div>
        `).join("");
    }

'''

pattern = re.compile(
    r'    function getSingleMultiLayout\(size, count\) \{.*?\n    function getSingleHeadlineSize',
    re.S,
)
replacement = new_functions + '    function getSingleHeadlineSize'
text, count = pattern.subn(replacement, text, count=1)
if count != 1:
    raise SystemExit(f'layout/render function replacement count={count}')

style = r'''
    <style id="single-layout-auto-optimizer">
        /* 単品告知：商品数・画像比率別の自動最適化 */
        .single-ad.is-multi .single-ad-product-card .single-ad-image-stage {
            padding-bottom: 0 !important;
        }

        .single-ad.is-multi .single-ad-product-card .single-ad-info {
            margin-top: 0 !important;
        }

        .single-ad.is-multi.hide-card-name .single-ad-product-card .single-ad-info {
            margin-top: 0 !important;
        }

        .single-ad.is-multi.hide-card-name .single-ad-product-card .single-ad-price {
            margin-top: 0 !important;
        }

        .single-ad.is-multi[data-density="ultra"] .single-ad-product-card .single-ad-image-stage,
        .single-ad.is-multi[data-density="micro"] .single-ad-product-card .single-ad-image-stage {
            padding-bottom: 0 !important;
        }
    </style>
'''

if 'id="single-layout-auto-optimizer"' in text:
    text = re.sub(
        r'\n\s*<style id="single-layout-auto-optimizer">.*?</style>\n',
        '\n' + style,
        text,
        count=1,
        flags=re.S,
    )
else:
    if '</head>' not in text:
        raise SystemExit('</head> not found')
    text = text.replace('</head>', style + '</head>', 1)

path.write_text(text, encoding='utf-8')
print('adaptive single layouts and zero image-price gap applied')
