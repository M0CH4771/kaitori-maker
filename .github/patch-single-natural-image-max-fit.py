from pathlib import Path

path = Path("index.html")
text = path.read_text(encoding="utf-8")

STYLE_ID = 'single-natural-aspect-max-fit'
SCRIPT_ID = 'single-natural-aspect-max-fit-script'

if STYLE_ID in text or SCRIPT_ID in text:
    raise SystemExit("natural aspect fit already exists")

style = r'''
<style id="single-natural-aspect-max-fit">
/*
 * 単品告知：元画像の縦横比を絶対に崩さず、
 * 各画像エリアに収まる最大サイズへJSでフィットさせる。
 * 既存の width/height:100% 指定より、JSの実寸(!important)を優先する。
 */
.single-ad .single-ad-image-stage {
    min-width: 0 !important;
    min-height: 0 !important;
    overflow: hidden !important;
    box-sizing: border-box !important;
    display: flex !important;
    justify-content: center !important;
}

.single-ad .single-ad-product-image {
    display: block !important;
    flex: 0 0 auto !important;
    object-fit: contain !important;
    object-position: center center !important;
    max-width: none !important;
    max-height: none !important;
    aspect-ratio: auto !important;
}
</style>
'''

script = r'''
<script id="single-natural-aspect-max-fit-script">
(function () {
    let rafId = 0;
    let scheduledPasses = 0;
    const pendingAreas = new Set();
    const observedStages = new WeakSet();
    const resizeObserver = typeof ResizeObserver === "function"
        ? new ResizeObserver(entries => {
            const areas = new Set();
            entries.forEach(entry => {
                const area = entry.target.closest(".single-ad");
                if (area) areas.add(area);
            });
            if (areas.size) scheduleSingleNaturalImageFit(Array.from(areas));
        })
        : null;

    function getAreas(root) {
        if (!root) return [];
        if (Array.isArray(root)) return root.filter(Boolean);
        if (root instanceof Element && root.matches(".single-ad")) return [root];
        if (root instanceof Element || root === document) {
            return Array.from(root.querySelectorAll?.(".single-ad") || []);
        }
        return [];
    }

    function contentBoxSize(stage) {
        const style = getComputedStyle(stage);
        const horizontal =
            (parseFloat(style.paddingLeft) || 0) +
            (parseFloat(style.paddingRight) || 0) +
            (parseFloat(style.borderLeftWidth) || 0) +
            (parseFloat(style.borderRightWidth) || 0);
        const vertical =
            (parseFloat(style.paddingTop) || 0) +
            (parseFloat(style.paddingBottom) || 0) +
            (parseFloat(style.borderTopWidth) || 0) +
            (parseFloat(style.borderBottomWidth) || 0);

        return {
            width: Math.max(0, stage.getBoundingClientRect().width - horizontal),
            height: Math.max(0, stage.getBoundingClientRect().height - vertical)
        };
    }

    function fitImage(img) {
        const stage = img.closest(".single-ad-image-stage");
        if (!stage) return false;

        if (resizeObserver && !observedStages.has(stage)) {
            observedStages.add(stage);
            resizeObserver.observe(stage);
        }

        const naturalWidth = Number(img.naturalWidth) || 0;
        const naturalHeight = Number(img.naturalHeight) || 0;
        if (!naturalWidth || !naturalHeight) return false;

        const box = contentBoxSize(stage);
        if (box.width <= 0 || box.height <= 0) return false;

        const scale = Math.min(
            box.width / naturalWidth,
            box.height / naturalHeight
        );
        if (!Number.isFinite(scale) || scale <= 0) return false;

        const width = naturalWidth * scale;
        const height = naturalHeight * scale;

        img.style.setProperty("width", width.toFixed(3) + "px", "important");
        img.style.setProperty("height", height.toFixed(3) + "px", "important");
        img.style.setProperty("max-width", "none", "important");
        img.style.setProperty("max-height", "none", "important");
        img.style.setProperty("object-fit", "contain", "important");
        img.style.setProperty("aspect-ratio", "auto", "important");

        img.dataset.naturalAspect = (naturalWidth / naturalHeight).toFixed(8);
        img.dataset.fittedWidth = width.toFixed(3);
        img.dataset.fittedHeight = height.toFixed(3);
        return true;
    }

    function fitArea(area) {
        area.querySelectorAll(".single-ad-product-image").forEach(fitImage);
    }

    window.fitSingleNaturalImages = function (root = document) {
        const areas = getAreas(root);
        areas.forEach(fitArea);
        return areas;
    };

    function runScheduledFit() {
        rafId = 0;
        const areas = Array.from(pendingAreas);
        pendingAreas.clear();
        areas.forEach(fitArea);

        scheduledPasses -= 1;
        if (scheduledPasses > 0) {
            areas.forEach(area => pendingAreas.add(area));
            rafId = requestAnimationFrame(runScheduledFit);
            return;
        }

        if (pendingAreas.size) {
            scheduledPasses = 2;
            rafId = requestAnimationFrame(runScheduledFit);
        }
    }

    window.scheduleSingleNaturalImageFit = function (root = document) {
        getAreas(root).forEach(area => pendingAreas.add(area));
        scheduledPasses = Math.max(scheduledPasses, 4);
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
            rafId = requestAnimationFrame(runScheduledFit);
        });
    };

    document.addEventListener("load", event => {
        const img = event.target;
        if (!(img instanceof HTMLImageElement) ||
            !img.classList.contains("single-ad-product-image")) return;
        const area = img.closest(".single-ad");
        if (area) scheduleSingleNaturalImageFit(area);
    }, true);

    document.addEventListener("DOMContentLoaded", () => {
        const container = document.getElementById("singlePreviewContainer");
        if (container && typeof MutationObserver === "function") {
            const observer = new MutationObserver(() => {
                scheduleSingleNaturalImageFit(container);
            });
            observer.observe(container, { childList: true, subtree: true });
        }

        scheduleSingleNaturalImageFit(document);
        document.fonts?.ready?.then(() => scheduleSingleNaturalImageFit(document));
    });

    window.addEventListener("resize", () => {
        scheduleSingleNaturalImageFit(document);
    }, { passive: true });
})();
</script>
'''

if text.count("</head>") != 1:
    raise SystemExit(f"unexpected </head> count: {text.count('</head>')}")
if text.count("</body>") != 1:
    raise SystemExit(f"unexpected </body> count: {text.count('</body>')}")

text = text.replace("</head>", style + "\n</head>", 1)
text = text.replace("</body>", script + "\n</body>", 1)

path.write_text(text, encoding="utf-8")
print("applied single natural-aspect max-fit")
