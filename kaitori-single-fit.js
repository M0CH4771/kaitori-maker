// 単品告知の文字・画像フィット処理（元 single-one-item-overflow-fit-script / single-natural-aspect-max-fit-script）。
(function(){
 function fitElementWidth(el,width,min){if(!el||width<=0)return;el.style.removeProperty("font-size");const measured=el.scrollWidth;if(!measured||measured<=width)return;const current=parseFloat(getComputedStyle(el).fontSize)||min;el.style.setProperty("font-size",Math.max(min,current*(width/measured)*.96).toFixed(2)+"px","important")}
 window.fitSingleOneItemOverflow=function(root=document){const areas=root instanceof Element&&root.matches(".single-ad")?[root]:Array.from(root?.querySelectorAll?.(".single-ad")||[]);areas.filter(a=>a.classList.contains("single-portrait")&&!a.classList.contains("is-multi")).forEach(area=>{const heading=area.querySelector(".single-ad-heading h2");if(heading)fitElementWidth(heading,heading.parentElement.clientWidth,34);area.querySelectorAll(".single-ad-price.is-dual").forEach(container=>{const rows=Array.from(container.querySelectorAll(".single-ad-price-row"));const values=rows.map(row=>row.querySelector(".single-ad-price-value")).filter(Boolean);const sizes=rows.map(row=>{const value=row.querySelector(".single-ad-price-value"),label=row.querySelector(".single-ad-state-label"),style=getComputedStyle(row),gap=parseFloat(style.columnGap||style.gap)||0;if(!value)return 34;value.style.removeProperty("font-size");const current=parseFloat(getComputedStyle(value).fontSize)||34,available=Math.max(0,row.clientWidth-(label?.offsetWidth||0)-gap-10),measured=value.scrollWidth;return measured>available&&available>0?Math.max(34,current*(available/measured)*.96):current});const commonSize=Math.min(...sizes);values.forEach(value=>value.style.setProperty("font-size",commonSize.toFixed(2)+"px","important"))});area.querySelectorAll(".single-ad-price-row").forEach(row=>{if(row.closest(".single-ad-price.is-dual"))return;const value=row.querySelector(".single-ad-price-value"),label=row.querySelector(".single-ad-state-label"),style=getComputedStyle(row),gap=parseFloat(style.columnGap||style.gap)||0;fitElementWidth(value,row.clientWidth-(label?.offsetWidth||0)-gap-10,34)});area.querySelectorAll(".single-ad-price:not(.is-dual) .single-ad-price-value").forEach(value=>fitElementWidth(value,value.parentElement.clientWidth-36,38))})};
 window.scheduleSingleOneItemOverflowFit=function(root=document){requestAnimationFrame(()=>requestAnimationFrame(()=>fitSingleOneItemOverflow(root)))};
 document.addEventListener("DOMContentLoaded",()=>{scheduleSingleOneItemOverflowFit(document);document.fonts?.ready.then(()=>scheduleSingleOneItemOverflowFit(document))});
})();
;
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
        const horizontalPadding =
            (parseFloat(style.paddingLeft) || 0) +
            (parseFloat(style.paddingRight) || 0);
        const verticalPadding =
            (parseFloat(style.paddingTop) || 0) +
            (parseFloat(style.paddingBottom) || 0);

        /*
         * width/height の代入先はCSSレイアウト座標なので、
         * transform後の getBoundingClientRect() ではなく clientWidth/clientHeight を使う。
         * これで scale/transform があるデザインでも数px小さくならない。
         */
        return {
            width: Math.max(0, stage.clientWidth - horizontalPadding),
            height: Math.max(0, stage.clientHeight - verticalPadding)
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
