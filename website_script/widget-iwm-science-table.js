// Product pages - Hot air, Hot Water, mechanical weeding
// Generate a table and place at bottom of content

/* --- IWM SCIENCE TABLE (v5.10) --- */
(function() {
    if (window.__kerstenIwmScienceTableStarted) {
        console.log("Kersten IWM Science Table: Duplicate injector blocked.");
        return;
    }
    window.__kerstenIwmScienceTableStarted = true;

    function cleanupDuplicateWidgets() {
        Array.from(document.querySelectorAll('#iwm-science-table')).slice(1).forEach(el => el.remove());
    }

    function widgetAlreadyExists() {
        return !!document.getElementById('iwm-science-table');
    }

    if (window.location.pathname === '/' || window.location.pathname === '/index') return;
    if (window.location.href.includes('integrated-weed-management-trial-bracknell')) return;

    const targetPages = ["chemical-free", "integrated-weed", "pesticide-free", "thermal", "hot-water", "ewk", "hot-air", "electricity", "ripagreen", "zasso"];
    const isBlog = window.location.href.includes('/blog');

    if (!isBlog && !targetPages.some(page => window.location.href.toLowerCase().includes(page))) return;

    const injectWidget = () => {
        if (isBlog) {
            const ctx = window.kerstenBlogContextCache || (window.getKerstenBlogContext ? window.getKerstenBlogContext() : { tool: 'audit' });
            if (ctx.tool !== 'audit') return;

            const cIntro = document.querySelector('.blog-content, .web-page-content, .product-description, .from-markdown, article, #main-content');
            const blogText = (document.title + " " + (cIntro ? cIntro.innerText : document.body.innerText)).toLowerCase();
            if (!blogText.includes('hot water') && !blogText.includes('hot air')) return;
        }

        cleanupDuplicateWidgets();
        if (widgetAlreadyExists()) return true;

        const productTable = document.querySelector('.specification-table, .product-specs, .from-markdown table, .page_content table');
        const contentIntro = document.querySelector('.blog-content, .web-page-content, .product-description, .from-markdown, article, #main-content');

        if (!productTable && !contentIntro && !document.querySelector('.website-list')) return;

        const tableContainer = document.createElement('div');
        tableContainer.id = 'iwm-science-table';
        tableContainer.style.cssText = "margin: 40px auto; max-width: 1200px; background: #fff; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); overflow: hidden; font-family: sans-serif; clear: both; border: 1px solid #eee; width: 100%; display: block;";
        tableContainer.innerHTML = `
            <div style="background: #004d26; color: white; padding: 20px;">
                <h3 style="margin:0; font-size: 20px; font-weight: bold; letter-spacing: 0.5px;">🧪 Technical Comparison: Professional Weed Control Methods</h3>
                <p style="margin: 5px 0 0 0; font-size: 13px; opacity: 0.9;">Engineering data for Council Grounds and Commercial Contracting procurement.</p>
            </div>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; min-width: 950px; font-size: 13px;">
                    <thead>
                        <tr style="background: #f8f9fa; border-bottom: 2px solid #004d26;">
                            <th style="padding: 15px 12px; text-align: left; color: #333; width: 15%;">Method</th>
                            <th style="padding: 15px 12px; text-align: left; color: #333; width: 12%;">Active Temp.</th>
                            <th style="padding: 15px 12px; text-align: left; color: #333; width: 20%;">Best Application</th>
                            <th style="padding: 15px 12px; text-align: left; color: #333;">Typical Speed</th>
                            <th style="padding: 15px 12px; text-align: left; color: #333;">Weather Limit</th>
                            <th style="padding: 15px 12px; text-align: left; color: #333;">Consumables</th>
                            <th style="padding: 15px 12px; text-align: left; color: #333;">Root Kill?</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 15px 12px;"><strong>Hot Water (Thermal)</strong></td>
                            <td style="padding: 15px 12px; background:#e8f5e9; font-weight:bold; color: #004d26;">100°C (Liquid)</td>
                            <td style="padding: 15px 12px; font-weight:bold; color:#555;">Sensitive Stone, Resin & Artificial Turf</td>
                            <td style="padding: 15px 12px;">1.5 - 2.5 km/h</td>
                            <td style="padding: 15px 12px;"><span style="color:#27ae60; font-weight:bold;">All Weather Capable</span></td>
                            <td style="padding: 15px 12px; color: #666;">Water Softener (Hard areas)</td>
                            <td style="padding: 15px 12px;"><span style="color:#27ae60; font-weight:bold;">High</span> (Conductive)</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 15px 12px;"><strong>Hot Air (Thermal)</strong></td>
                            <td style="padding: 15px 12px;">450°C - 700°C</td>
                            <td style="padding: 15px 12px; font-weight:bold; color:#555;">Gravel Paths & Permeable Surfaces</td>
                            <td style="padding: 15px 12px;">2.0 - 3.0 km/h</td>
                            <td style="padding: 15px 12px;"><span style="color:#27ae60; font-weight:bold;">All Weather</span> (Wet Capable)</td>
                            <td style="padding: 15px 12px; color: #666;">Propane / LPG Gas</td>
                            <td style="padding: 15px 12px;"><span style="color:#f39c12; font-weight:bold;">Medium</span> (Radiant)</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 15px 12px;"><strong>Mechanical Brush</strong></td>
                            <td style="padding: 15px 12px; background:#e8f5e9; font-weight:bold; color: #004d26;">Ambient</td>
                            <td style="padding: 15px 12px; font-weight:bold; color:#555;">Kerb Edging, Silt & Moss Removal</td>
                            <td style="padding: 15px 12px;">3.0 - 5.0 km/h</td>
                            <td style="padding: 15px 12px;"><span style="color:#27ae60; font-weight:bold;">All Weather Capable</span></td>
                            <td style="padding: 15px 12px; color: #666;">Spare Brushes (30+ hrs life)</td>
                            <td style="padding: 15px 12px;"><span style="color:#27ae60; font-weight:bold;">Instant</span> (Physical)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style="padding: 15px 20px; background: #f0f9f4; font-size: 14px; color: #004d26; line-height: 1.6; border-top: 1px solid #ccebd6;">
                <strong>💡 IWM Technical Insight:</strong> To maximise efficiency, Kersten recommends a <strong>"Mechanical Pass"</strong> first. Removing the organic growth medium (silt/soil) reduces the frequency of thermal treatments by up to 50%, significantly lowering annual operational costs.
            </div>`;

        const isProductPage = document.querySelector('.product-price, .cart-btn, [itemprop="offers"], .item-price');
        const pTable = productTable || document.querySelector('.specification-table, .product-specs');
        const cIntro = contentIntro || document.querySelector('.blog-content, .web-page-content');

        if (isBlog) {
            if (cIntro) {
                cIntro.appendChild(tableContainer);
            } else {
                const mainTarget = document.querySelector('main, #page-content, article') || document.body;
                mainTarget.appendChild(tableContainer);
            }
        } else if (isProductPage) {
            if (pTable && pTable.parentNode) {
                pTable.parentNode.insertBefore(tableContainer, pTable.nextSibling);
            } else if (cIntro) {
                const paragraphs = cIntro.querySelectorAll('p');
                if (paragraphs.length > 2 && paragraphs[2].parentNode) {
                    paragraphs[2].parentNode.insertBefore(tableContainer, paragraphs[2]);
                } else {
                    cIntro.insertBefore(tableContainer, cIntro.firstChild);
                }
            }
        } else {
            const gridContainer = document.querySelector('.website-list, .item-list, .products-grid');
            const itemCards = document.querySelectorAll('.item-card, .product-card, .item-row');

            if (gridContainer && gridContainer.parentNode) {
                gridContainer.parentNode.insertBefore(tableContainer, gridContainer.nextSibling);
            } else if (itemCards.length > 0) {
                const lastCard = itemCards[itemCards.length - 1];
                const container = lastCard.closest('.row') || lastCard.parentNode;
                if (container && container.parentNode) {
                    container.parentNode.insertBefore(tableContainer, container.nextSibling);
                } else {
                    lastCard.parentNode.insertBefore(tableContainer, lastCard.nextSibling);
                }
            } else {
                const backupTarget = document.querySelector('footer, .web-footer, #footer') || document.querySelector('#page-content, main, .page_content');
                if (backupTarget && backupTarget.parentNode) {
                    backupTarget.parentNode.insertBefore(tableContainer, backupTarget);
                } else {
                    document.body.appendChild(tableContainer);
                }
            }
        }

        const tableRowsArr = tableContainer.querySelectorAll('tbody tr');
        const dynamicFaqs = [];

        tableRowsArr.forEach(row => {
            const cols = row.querySelectorAll('td');
            if (cols.length >= 7) {
                const method = cols[0].innerText.trim();
                dynamicFaqs.push({
                    "@type": "Question",
                    "name": `Is ${method} effective for professional weed control?`,
                    "acceptedAnswer": { "@type": "Answer", "text": `${method} is highly effective for ${cols[2].innerText.trim()}. It operates at ${cols[1].innerText.trim()}, work rate of ${cols[3].innerText.trim()} and provides ${cols[6].innerText.trim()} root kill capability.` }
                });
            }
        });

        const faqScript = document.createElement('script');
        faqScript.type = "application/ld+json";
        faqScript.text = JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": dynamicFaqs });
        document.head.appendChild(faqScript);

        const semanticScript = document.createElement('script');
        semanticScript.type = "application/ld+json";
        semanticScript.text = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "mainEntity": [
                { "@type": "Service", "name": "Hot Water Weed Control", "additionalType": "http://www.productontology.org/id/Thermal_weed_control", "sameAs": "https://en.wikipedia.org/wiki/Thermal_weed_control" },
                { "@type": "IndividualProduct", "name": "Mechanical Weed Brush", "additionalType": "http://www.productontology.org/id/Power_broom", "sameAs": "https://en.wikipedia.org/wiki/Weed_brush" },
                { "@type": "Service", "name": "Integrated Weed Management", "description": "Holistic engineering approach to municipal weed control.", "sameAs": "https://en.wikipedia.org/wiki/Integrated_pest_management" }
            ]
        });
        document.head.appendChild(semanticScript);

        cleanupDuplicateWidgets();
        return true;
    };

    let checkCount = 0;
    const runEnforcer = setInterval(() => {
        cleanupDuplicateWidgets();
        if (!widgetAlreadyExists()) {
            injectWidget();
        }
        checkCount++;
        if (checkCount > 10 || widgetAlreadyExists()) {
            cleanupDuplicateWidgets();
            clearInterval(runEnforcer);
        }
    }, 500);
})();
