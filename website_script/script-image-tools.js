// 2. IMAGE RECOVERY
    function forceOriginalImages() {
        const blogImages = document.querySelectorAll('.blog-card img, .card-img-top img, .item-card img');
        blogImages.forEach(function(img) {
            let currentSrc = img.getAttribute('src');
            if (currentSrc && currentSrc.includes('/files/') && !img.dataset.fixed) {
                let originalFile = currentSrc.replace(/(-small|-medium|_thumb|_small|_medium)/gi, "").split('?')[0];
                img.src = originalFile + "?v=" + new Date().getTime();
                img.dataset.fixed = "true";
                img.style.display = 'block';
                img.style.opacity = '1';
            }
        });
    }
    forceOriginalImages();
    setTimeout(forceOriginalImages, 2000);

    /* --- AUTO-RELIINK RECOVERY SCRIPT (v129.0) --- */
(function() {
    function forceOriginalImages() {
        const blogImages = document.querySelectorAll('.blog-card img, .card-img-top img, .item-card img');
        blogImages.forEach(function(img) {
            let currentSrc = img.getAttribute('src');
            if (currentSrc && currentSrc.includes('/files/') && !img.dataset.fixed) {
                let originalFile = currentSrc.replace(/(-small|-medium|_thumb|_small|_medium)/gi, "").split('?')[0];
                img.src = originalFile + "?v=" + new Date().getTime();
                img.dataset.fixed = "true";
                img.style.display = 'block';
                img.style.opacity = '1';
                console.log("Recovered Image: " + originalFile);
            }
        });
    }
    forceOriginalImages();
    setTimeout(forceOriginalImages, 2000);
})();

/* --- KERSTEN DEEP IMAGE REPAIR (v128.9) --- */
(function() {
    function deepRepairImages() {
        const images = document.querySelectorAll('img');
        images.forEach(function(img) {
            let src = img.getAttribute('src');
            if (src && src.includes('/files/')) {
                let originalPath = src.replace(/(_small|_thumb|_medium| - small| - medium)/gi, "").split('?')[0].split('#')[0];
                if (!img.dataset.repaired) {
                    img.dataset.repaired = "true";
                    img.src = originalPath + "?v=" + new Date().getTime();
                    img.style.opacity = '1';
                    img.style.visibility = 'visible';
                    img.style.display = 'inline-block';
                    console.log("Deep Repaired: " + originalPath);
                }
            }
        });
    }
    [100, 1500, 4000].forEach(delay => setTimeout(deepRepairImages, delay));
})();

/* --- IMAGE LINK REPAIR ENGINE (v128.7) --- */
(function() {
    function repairImageLinks() {
        const docImages = document.querySelectorAll('img');
        docImages.forEach(function(img) {
            let src = img.getAttribute('src');
            if (src && src.includes('/files/') && src.includes('?')) {
                let cleanSrc = src.split('?')[0];
                img.src = cleanSrc;
                img.removeAttribute('srcset');
                img.removeAttribute('sizes');
                img.style.opacity = '1';
                img.style.visibility = 'visible';
                img.style.contentVisibility = 'visible';
            }
        });
    }
    [100, 1000, 3000].forEach(delay => setTimeout(repairImageLinks, delay));
})();