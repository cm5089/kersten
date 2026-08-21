// Cost and Carbon savings audit widget
// Replaced by "https://kerstenuk.com/Kersten-Integrated-Weed-Management-Business-Case" on some pages

/* --- KERSTEN AUTHORITY AUDIT WIDGET (v5.10) --- */
(function() {
    if (window.__kerstenAuthorityAuditWidgetStarted) {
        console.log("Kersten Authority Audit Widget: Duplicate injector blocked.");
        return;
    }
    window.__kerstenAuthorityAuditWidgetStarted = true;

    function cleanupDuplicateWidgets() {
        Array.from(document.querySelectorAll('.pesticide-load-widget[data-kersten-authority="audit"]')).slice(1).forEach(el => el.remove());
    }

    function widgetAlreadyExists() {
        return !!(
            document.getElementById('kersten-authority-audit-widget') ||
            document.querySelector('.pesticide-load-widget[data-kersten-authority="audit"]')
        );
    }

    function insertAfterReference(widget, reference) {
        if (reference && reference.parentNode) {
            reference.parentNode.insertBefore(widget, reference.nextSibling);
            return true;
        }
        return false;
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
            if (blogText.includes('hot water') || blogText.includes('hot air')) return;
        }

        cleanupDuplicateWidgets();
        if (widgetAlreadyExists()) return true;

        const productTable = document.querySelector('.specification-table, .product-specs, .from-markdown table, .page_content table');
        const contentIntro = document.querySelector('.blog-content, .web-page-content, .product-description, .from-markdown, article, #main-content');

        if (!productTable && !contentIntro && !document.querySelector('.website-list')) return;

        const currentURL = window.location.href.toLowerCase();
        const pageTitle = document.title.toLowerCase();
        const isSweeperContext = currentURL.includes('sweeper') || currentURL.includes('collector') || pageTitle.includes('sweeper');

        const widgetTitle = isSweeperContext ? "💰 Labor & Efficiency Calculator" : "🌍 Cost & Carbon Savings Audit";
        const initialInputLabel = isSweeperContext ? "Weekly Man-Hours (Current)" : "Annual Litres (Concentrate)";
        const distLabel = isSweeperContext ? "Site Size (Acres/Ha)" : "Network Size (KM)";
        const placeholder1 = isSweeperContext ? "e.g. 20" : "e.g. 400";
        const placeholder2 = isSweeperContext ? "e.g. 5" : "e.g. 50";

        const auditWidget = document.createElement('div');
        auditWidget.id = 'kersten-authority-audit-widget';
        auditWidget.className = 'pesticide-load-widget';
        auditWidget.setAttribute('data-kersten-authority', 'audit');
        auditWidget.style.cssText = "background:#f9fbf9; border:2px solid #27ae60; border-radius:12px; margin:30px auto; max-width:1200px; width:100%; box-sizing:border-box; font-family:sans-serif; overflow:hidden; box-shadow:0 4px 15px rgba(39,174,96,0.1); clear:both; display:block;";

        auditWidget.innerHTML = `
            <div style="background:#f0f9f4; padding:15px 20px; border-bottom:1px solid #ccebd6; display:flex; justify-content:space-between; align-items:center;">
                <h4 style="margin:0; color:#004d26; font-weight:800; font-size:16px;">${widgetTitle}</h4>
                <span style="background:#27ae60; color:white; padding:4px 10px; border-radius:4px; font-size:11px; font-weight:bold;">2026 TENDER READY</span>
            </div>
            <div style="padding:25px;">
                <p style="font-size:14px; color:#444; margin-bottom:20px; line-height:1.5;">
                    <strong>${isSweeperContext ? 'Productivity Analysis:' : 'Mandatory Impact Reporting:'}</strong>
                    Calculate your ${isSweeperContext ? 'labor savings and ROI' : 'financial savings, active substance reduction, and carbon offset'} by transitioning to Kersten ${isSweeperContext ? 'mechanical' : 'chemical-free'} technology.
                </p>

                <div style="background:#f9fffb; padding:20px; border-radius:10px; border:1px dashed #27ae60; margin-bottom:20px;">
                    <label style="display:block; font-size:12px; font-weight:bold; color:#004d26; margin-bottom:5px;">What are you comparing against?</label>
                    <select id="q-audit-method" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; font-size:14px; margin-bottom:15px; background:white;">
                        ${isSweeperContext ?
                            `<option value="manual">Manual Sweeping (Brooms/Hand)</option>
                             <option value="contractor">External Contractor</option>`
                            :
                            `<option value="chemical">Glyphosate / Chemical Spraying</option>
                             <option value="foam">Thermal (with Additives)</option>
                             <option value="manual_weed">Manual Scraping / Hoeing</option>`
                        }
                    </select>

                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                        <div>
                            <label id="q-audit-lbl-1" style="display:block; font-size:12px; font-weight:bold; color:#004d26; margin-bottom:5px;">${initialInputLabel}</label>
                            <input type="number" id="q-audit-input1" placeholder="${placeholder1}" style="width:100%; padding:12px; border:1px solid #ccc; border-radius:6px; font-size:15px;">
                        </div>
                        <div>
                            <label style="display:block; font-size:12px; font-weight:bold; color:#004d26; margin-bottom:5px;">${distLabel}</label>
                            <input type="number" id="q-audit-input2" placeholder="${placeholder2}" style="width:100%; padding:12px; border:1px solid #ccc; border-radius:6px; font-size:15px;">
                        </div>
                    </div>
                    <button id="q-audit-btn-exec" style="width:100%; margin-top:20px; background:#004d26; color:white; border:none; padding:15px; border-radius:8px; font-weight:bold; cursor:pointer; font-size:14px; letter-spacing:1px; text-transform:uppercase;">
                        Calculate Savings (Planet & Wallet)
                    </button>
                </div>
                <div id="q-audit-result-display" style="margin-top:20px; display:none; border-top:2px solid #eee; padding-top:20px; animation: fadeIn 0.5s;"></div>
            </div>`;

        const isProductPage = document.querySelector('.product-price, .cart-btn, [itemprop="offers"], .item-price');
        const pTable = productTable || document.querySelector('.specification-table, .product-specs');
        const cIntro = contentIntro || document.querySelector('.blog-content, .web-page-content');
        const scienceTable = document.getElementById('iwm-science-table');

        if (isBlog) {
            if (insertAfterReference(auditWidget, scienceTable)) {
                // placed after science table
            } else if (cIntro) {
                cIntro.appendChild(auditWidget);
            } else {
                const mainTarget = document.querySelector('main, #page-content, article') || document.body;
                mainTarget.appendChild(auditWidget);
            }
        } else if (isProductPage) {
            if (insertAfterReference(auditWidget, scienceTable)) {
                // placed after science table
            } else if (pTable && pTable.parentNode) {
                pTable.parentNode.insertBefore(auditWidget, pTable.nextSibling);
            } else if (cIntro) {
                const paragraphs = cIntro.querySelectorAll('p');
                if (paragraphs.length > 2 && paragraphs[2].parentNode) {
                    paragraphs[2].parentNode.insertBefore(auditWidget, paragraphs[2]);
                } else {
                    cIntro.insertBefore(auditWidget, cIntro.firstChild);
                }
            }
        } else {
            if (insertAfterReference(auditWidget, scienceTable)) {
                // placed after science table
            } else {
                const gridContainer = document.querySelector('.website-list, .item-list, .products-grid');
                const itemCards = document.querySelectorAll('.item-card, .product-card, .item-row');

                if (gridContainer && gridContainer.parentNode) {
                    gridContainer.parentNode.insertBefore(auditWidget, gridContainer.nextSibling);
                } else if (itemCards.length > 0) {
                    const lastCard = itemCards[itemCards.length - 1];
                    const container = lastCard.closest('.row') || lastCard.parentNode;
                    if (container && container.parentNode) {
                        container.parentNode.insertBefore(auditWidget, container.nextSibling);
                    } else {
                        lastCard.parentNode.insertBefore(auditWidget, lastCard.nextSibling);
                    }
                } else {
                    const backupTarget = document.querySelector('footer, .web-footer, #footer') || document.querySelector('#page-content, main, .page_content');
                    if (backupTarget && backupTarget.parentNode) {
                        backupTarget.parentNode.insertBefore(auditWidget, backupTarget);
                    } else {
                        document.body.appendChild(auditWidget);
                    }
                }
            }
        }

        setTimeout(function() {
            const execBtn = document.getElementById('q-audit-btn-exec');
            const methodSelect = document.getElementById('q-audit-method');
            const inputLabel1 = document.getElementById('q-audit-lbl-1');
            const inputField1 = document.getElementById('q-audit-input1');

            if (methodSelect && inputLabel1) {
                methodSelect.addEventListener('change', function() {
                    if (this.value === 'manual_weed') {
                        inputLabel1.innerText = "Weekly Man-Hours (Current)";
                        inputField1.placeholder = "e.g. 20";
                    } else if (!isSweeperContext) {
                        inputLabel1.innerText = "Annual Litres (Concentrate)";
                        inputField1.placeholder = "e.g. 400";
                    }
                });
            }

            if (execBtn) {
                execBtn.onclick = function() {
                    const val1 = parseFloat(document.getElementById('q-audit-input1').value) || 0;
                    const val2 = parseFloat(document.getElementById('q-audit-input2').value) || 0;
                    const method = document.getElementById('q-audit-method').value;

                    if (val1 === 0) return;

                    let financialSaving = 0;
                    let ecoSaving = 0;
                    let activeLoad = 0;
                    let treeCount = 0;

                    let ecoLabel = "CO2e Saved";
                    let financeLabel = "Operational Savings";
                    let insightText = "";
                    let assumptionText = "";
                    let showGreenBanner = false;

                    if (method === 'chemical') {
                        financialSaving = (val1 * 12).toFixed(0);
                        ecoSaving = (val1 * 30.5).toFixed(1);
                        activeLoad = (val1 * 0.360).toFixed(2);
                        treeCount = Math.round(ecoSaving / 25);
                        showGreenBanner = true;
                        insightText = `By eliminating ${val1}L of chemical, you remove ${activeLoad}kg of active substance from the environment and avoid rising procurement costs.`;
                        assumptionText = "Glyphosate cost estimated at £12.00/L. Active substance calc: 360g/L.";
                    } else if (method === 'foam') {
                        financialSaving = (val1 * 6.00).toFixed(0);
                        ecoSaving = (val1 * 12.5).toFixed(1);
                        treeCount = Math.round(ecoSaving / 25);
                        activeLoad = "0.00";
                        showGreenBanner = true;
                        insightText = `<strong>Operational Efficiency:</strong> Eliminating the requirement for additives removes a recurring supply chain cost and simplifies logistics. Kersten systems operate using water only, saving an estimated £${Number(financialSaving).toLocaleString()} annually.`;
                        assumptionText = "Additive costs modeled at typical industry consumable rates. Variables may differ by supplier.";
                    } else if (method === 'manual' || method === 'contractor') {
                        if (method === 'manual') {
                            financialSaving = (val1 * 15 * 50).toFixed(0);
                            ecoSaving = (val1 * 50).toFixed(0);
                            ecoLabel = "Labor Hours Saved";
                            financeLabel = "Labor Re-allocation";
                            assumptionText = "Manual labor rate estimated at £15.00/hr.";
                        } else {
                            financialSaving = (val1 * 45 * 50).toFixed(0);
                            ecoSaving = "100%";
                            ecoLabel = "Control Gained";
                            financeLabel = "Contractor Spend Saved";
                            assumptionText = "External contractor rate estimated at £45.00/hr.";
                        }
                        showGreenBanner = false;
                        insightText = `Productivity Jump: This machine pays for itself in efficiency gains alone compared to manual labor.`;
                    } else if (method === 'manual_weed') {
                        financialSaving = (val1 * 15 * 50 * 0.9).toFixed(0);
                        ecoSaving = (val1 * 50 * 0.9).toFixed(0);
                        ecoLabel = "Hours Reclaimed";
                        financeLabel = "Labor Cost Saved";
                        showGreenBanner = false;
                        insightText = `<strong>Velocity:</strong> Mechanical removal is significantly faster than manual scraping. You reclaim ${(val1 * 50 * 0.9).toFixed(0)} man-hours annually for skilled tasks.`;
                        assumptionText = "Manual labor rate estimated at £15.00/hr. Efficiency gain estimated at 90% vs hand-scraping.";
                    }

                    let greenBannerHTML = '';
                    if (showGreenBanner) {
                        greenBannerHTML = `
                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin-bottom:20px;">
                            <div style="background:#f0f9f4; padding:15px; border-radius:8px; text-align:center; border:1px solid #27ae60;">
                                <span style="display:block; font-size:22px; font-weight:900; color:#004d26;">${activeLoad} kg</span>
                                <span style="font-size:10px; text-transform:uppercase; font-weight:bold; color:#27ae60;">Active Substance Reduced</span>
                            </div>
                            <div style="background:#f0f7ff; padding:15px; border-radius:8px; text-align:center; border:1px solid #2d95f0;">
                                <span style="display:block; font-size:22px; font-weight:900; color:#003366;">${treeCount}</span>
                                <span style="font-size:10px; text-transform:uppercase; font-weight:bold; color:#2d95f0;">Mature Trees Planted (Eq)</span>
                            </div>
                        </div>`;
                    }

                    const res = document.getElementById('q-audit-result-display');
                    res.style.display = 'block';

                    res.innerHTML = `
                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin-bottom:20px;">
                            <div style="background:#fffbe6; padding:20px; border:2px solid #f39c12; border-radius:8px; text-align:center;">
                                <span style="display:block; font-size:28px; font-weight:900; color:#d35400;">£${Number(financialSaving).toLocaleString()}</span>
                                <span style="font-size:11px; font-weight:bold; text-transform:uppercase; color:#d35400;">${financeLabel}</span>
                            </div>
                            <div style="background:#f0f9f4; padding:20px; border:2px solid #27ae60; border-radius:8px; text-align:center;">
                                <span style="display:block; font-size:28px; font-weight:900; color:#004d26;">${ecoSaving}</span>
                                <span style="font-size:11px; font-weight:bold; text-transform:uppercase; color:#27ae60;">${ecoLabel} ${method.includes('chemical') ? '(kg)' : ''}</span>
                            </div>
                        </div>
                        ${greenBannerHTML}
                        <div style="background:#f4f7f5; padding:15px; border-radius:8px; border-left:5px solid #003366; margin-bottom:20px; color:#333; font-size:14px; line-height:1.5;">
                            ${insightText}
                        </div>
                        <div style="margin-bottom:20px; padding-top:10px; border-top:1px solid #e0e0e0; font-size:11px; color:#777; line-height:1.4;">
                            <strong>Basis of Calculation:</strong> ${assumptionText}<br>
                            <em>Disclaimer: These figures are approximations based on typical industry rates and are for guidance purposes only.</em>
                        </div>
                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                            <a href="/contact-us-pesticide-free-plan?message=ROI%20Audit:%20Saving%20£${financialSaving},%20${activeLoad}kg%20Active%20Substance" style="display:block; background:#004d26; color:#fff; text-align:center; padding:14px; border-radius:6px; text-decoration:none; font-weight:bold; font-size:13px; box-shadow:0 4px 6px rgba(0,77,38,0.2);">✉ Request Full Business Case</a>
                            <button onclick="window.print()" style="background:#fff; color:#333; border:1px solid #ccc; border-radius:6px; font-weight:bold; cursor:pointer; font-size:13px;">🖨️ Print Report</button>
                        </div>`;
                };
            }
        }, 500);

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
