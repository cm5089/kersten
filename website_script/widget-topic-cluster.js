// Display above the footer - make part of template?

/* ================================================================= */
/* [D-RESCUE] TOPIC CLUSTER & BLOG NAVIGATOR (Footer-Docked v2.1)    */
/* ================================================================= */
(function() {
    // 1. Gatekeeper: Only run on Blog/News/Product pages (Skip lists/home)
    const currentPath = window.location.pathname;
    if (currentPath === '/' ||
        currentPath.includes('fitment-tool-embed') ||
        currentPath.includes('/cart') ||
        window.location.href.includes('/desk')) return;

    const runClusterEngine = function() {
        // 2. Prevent Duplicates
        if (document.querySelector('.authority-cluster-box')) return;

        // 3. Target the Content Source (for scraping context)
        const contentAnchor = document.querySelector('.blog-content') ||
                              document.querySelector('.web-page-content') ||
                              document.querySelector('.product-description') ||
                              document.querySelector('article');

        // If no content to "read", we can't recommend. Stop.
        if (!contentAnchor) return;

        // 4. Define The Library (Your Assets)
        const library = [
            // Strategy & Compliance
            { keys: ["math", "litre", "load", "volume", "spraying", "chemical"], label: "📉 Strategy: The New Math of Weed Control", url: "/blog/Sweeping,%20moss%20and%20weed%20control/the-new-math-of-weed-management-beyond-the-litre-into-the-load" },
            { keys: ["roadmap", "future", "2026", "nap", "legislation", "defra"], label: "🔮 Vision: The 2026 IWM Roadmap", url: "/blog/Sweeping,%20moss%20and%20weed%20control/the-2026-roadmap-redefining-weed-management-in-the-amenity-sector" },
            { keys: ["edge", "road", "pavement", "structural", "tracy", "highway"], label: "🏗️ Insight: Tracy's Law & Road Integrity", url: "/blog/Sweeping,%20moss%20and%20weed%20control/tracy%E2%80%99s-law-why-losing-the-edge-means-losing-the-road" },

            // Solutions
            { keys: ["sweeper", "debris", "mud", "silt", "collector"], label: "🧹 Machine: Mechanical Sweepers", url: "/sweepers" },
            { keys: ["weedbrush", "moss", "kerb", "edge", "brush"], label: "🌿 Machine: Weedbrushes", url: "/weed-brush" },
            { keys: ["thermal", "hot", "steam", "foam", "heat"], label: "🔥 Machine: Thermal Weed Control", url: "/hoaf-thermal-weed-control" },
            { keys: ["winter", "snow", "ice", "salt", "grit"], label: "❄️ Machine: Winter Maintenance", url: "/winter-equipment" }
        ];

        // 5. Context Matcher
        const pageText = (document.title + " " + contentAnchor.innerText.substring(0, 2000)).toLowerCase();

        let matches = library.filter(item =>
            item.keys.some(k => pageText.includes(k)) &&
            !window.location.href.includes(item.url) // Don't link to self
        );

        // Fallback: If no specific matches, fill with Strategy links
        if (matches.length < 3) {
            const fallback = library.filter(item => !window.location.href.includes(item.url));
            // Add fallbacks to the end, then slice top 4
            matches = [...matches, ...fallback].filter((v,i,a)=>a.findIndex(t=>(t.url===v.url))===i).slice(0, 4);
        } else {
            matches = matches.slice(0, 4);
        }

        // 6. Build the UI (Footer-Docked Style)
        const box = document.createElement('div');
        box.className = 'authority-cluster-box';
        // Style: Full width, subtle background, distinct from footer but connected
        box.style.cssText = "width: 100%; margin: 0; padding: 50px 0; background: #fdfdfd; border-top: 1px solid #eee; font-family: 'Segoe UI', sans-serif; position: relative; z-index: 10;";

        box.innerHTML = `
            <div style="max-width: 1200px; margin: 0 auto; padding: 0 15px;">
                <div style="display:flex; align-items:center; margin-bottom: 25px;">
                    <div style="width: 40px; height: 4px; background: #ffcc00; margin-right: 15px;"></div>
                    <h4 style="margin: 0; color: #004d26; font-size: 18px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
                        Explore Related Solutions & Insights
                    </h4>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px;">
                    ${matches.map(link => `
                        <a href="${link.url}" style="display: flex; align-items: center; text-decoration: none; background: white; padding: 15px 20px; border: 1px solid #e0e0e0; border-radius: 8px; transition: all 0.2s; box-shadow: 0 2px 5px rgba(0,0,0,0.02);">
                            <span style="color: #ffcc00; margin-right: 12px; font-size: 18px; font-weight: 900;">➔</span>
                            <span style="color: #004d26; font-weight: 700; font-size: 14px; line-height: 1.4;">${link.label}</span>
                        </a>
                    `).join('')}
                </div>

                <div style="margin-top: 25px; font-size: 13px; color: #666; font-style: italic; display: flex; align-items: center; gap: 10px;">
                    <span>🛡️ <strong>Kersten Authority Engine:</strong> Linking you to verified engineering data and NAP 2025 compliance frameworks.</span>
                </div>
            </div>
            
            <style>
                .authority-cluster-box a:hover { transform: translateY(-3px); box-shadow: 0 5px 15px rgba(0,0,0,0.08) !important; border-color: #004d26 !important; }
            </style>
        `;

        // 7. Inject (Footer Docking Logic)
        const footer = document.querySelector('footer, .layout-footer, #footer');

        if (footer) {
            // Insert IMMEDIATELY BEFORE the footer
            footer.parentNode.insertBefore(box, footer);
            console.log("Kersten Cluster: Docked above Footer.");
        } else {
            // Fallback: Append to body
            document.body.appendChild(box);
        }
    };

    // 8. Persistence Timer
    let attempts = 0;
    const clusterTimer = setInterval(() => {
        attempts++;
        runClusterEngine();
        // Stop if we found the box OR if we've tried for 4 seconds
        if (document.querySelector('.authority-cluster-box') || attempts > 8) {
            clearInterval(clusterTimer);
        }
    }, 500);

})();