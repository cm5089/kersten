// Two widgets rolled into one -= seperate

// iwm-science-table:
// Product pages - Hot air, Hot Water, mechanical weeding
// Generate a table and confrim with sean
// place at bottom of content

// Cost and Carbon savings audit widget:
//  Replaced by "https://kerstenuk.com/Kersten-Integrated-Weed-Management-Business-Case"
// Repalce widget with a banner

/* INSERTED INTO FRAPPE READY */


/* --- [Q] CHEMICAL-FREE AUTHORITY INJECTOR (v5.10 - SMART CATEGORY PLACEMENT) --- */
(function() {

    /* --- HARD GLOBAL LOCK: prevents this whole injector starting twice --- */
    if (window.__kerstenChemicalFreeAuthorityInjectorStarted) {
        console.log("Kersten [Q]: Duplicate injector blocked.");
        return;
    }

    window.__kerstenChemicalFreeAuthorityInjectorStarted = true;

    /* --- Existing duplicate cleanup, useful while testing/publishing --- */
    function cleanupDuplicateAuthorityWidgets() {
        const tables = Array.from(document.querySelectorAll('#iwm-science-table'));
        const audits = Array.from(document.querySelectorAll('.pesticide-load-widget'));

        tables.slice(1).forEach(el => el.remove());
        audits.slice(1).forEach(el => el.remove());
    }

    function authorityWidgetAlreadyExists() {
        return !!(
            document.getElementById('iwm-science-table') ||
            document.getElementById('kersten-authority-audit-widget') ||
            document.querySelector('.pesticide-load-widget[data-kersten-authority="audit"]')
        );
    }
    // 1. SAFETY EXCLUSIONS
    if (window.location.pathname === '/' || window.location.pathname === '/index') return;
    if (window.location.href.includes('integrated-weed-management-trial-bracknell')) return;

    // 2. GATEKEEPER
    const targetPages = ["chemical-free", "integrated-weed", "pesticide-free", "thermal", "hot-water", "ewk", "hot-air", "electricity", "ripagreen", "zasso"];
    const isBlog = window.location.href.includes('/blog');

    // CRITICAL FIX: If it is a blog, SKIP the URL keyword check.
    // We let the Traffic Controller decide later.
    if (!isBlog && !targetPages.some(page => window.location.href.toLowerCase().includes(page))) return;

    const injectFullAuthorityStack = () => {
        // 3. TRAFFIC CONTROL (The "Highlander" Check)
        if (isBlog) {
             const ctx = window.kerstenBlogContextCache || (window.getKerstenBlogContext ? window.getKerstenBlogContext() : { tool: 'audit' });
             // If Traffic Controller says "Veto" or "Havs" won, we stop here.
             if (ctx.tool !== 'audit') return;
        }

       /* --- DUPLICATION GUARD: AUTHORITY STACK --- */
/* Prevents repeat injection when either the table OR audit widget already exists */

cleanupDuplicateAuthorityWidgets();

if (authorityWidgetAlreadyExists()) {
    return true;
}

        // 4. TARGETING ENGINE (Expanded Selectors)
        const productTable = document.querySelector('.specification-table, .product-specs, .from-markdown table, .page_content table');
        const contentIntro = document.querySelector('.blog-content, .web-page-content, .product-description, .from-markdown, article, #main-content');

        if (!productTable && !contentIntro && !document.querySelector('.website-list')) return;

        // --- PART B: THE TECHNICAL MATRIX ---
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


        // --- PART C: THE SMART ROI & SUSTAINABILITY ENGINE (v4.1 - DIPLOMATIC MODE) ---
        {
            // 1. Context Detection
            const currentURL = window.location.href.toLowerCase();
            const pageTitle = document.title.toLowerCase();
            const isSweeperContext = currentURL.includes('sweeper') || currentURL.includes('collector') || pageTitle.includes('sweeper');

            // 2. Define Initial UI Text
            let widgetTitle = isSweeperContext ? "💰 Labor & Efficiency Calculator" : "🌍 Cost & Carbon Savings Audit";
            let initialInputLabel = isSweeperContext ? "Weekly Man-Hours (Current)" : "Annual Litres (Concentrate)";
            let distLabel = isSweeperContext ? "Site Size (Acres/Ha)" : "Network Size (KM)";
            let placeholder1 = isSweeperContext ? "e.g. 20" : "e.g. 400";
            let placeholder2 = isSweeperContext ? "e.g. 5" : "e.g. 50";

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

        // --- PART D: SMART PLACEMENT EXECUTION (UPDATED FOR CATEGORY & BLOG PAGES) ---
            const isProductPage = document.querySelector('.product-price, .cart-btn, [itemprop="offers"], .item-price');
            let pTable = (typeof productTable !== 'undefined') ? productTable : document.querySelector('.specification-table, .product-specs');
            let cIntro = (typeof contentIntro !== 'undefined') ? contentIntro : document.querySelector('.blog-content, .web-page-content');

            // 1. CONDITIONAL DISPLAY LOGIC FOR BLOGS
            let showTable = true;
            let showAudit = true;

            if (isBlog) {
                const blogText = (document.title + " " + (cIntro ? cIntro.innerText : document.body.innerText)).toLowerCase();
                // If it mentions hot water or hot air, show the table. Otherwise, show the audit.
                if (blogText.includes('hot water') || blogText.includes('hot air')) {
                    showTable = true;
                    showAudit = false;
                } else {
                    showTable = false;
                    showAudit = true;
                }
            }

            // 2. INJECTION LOGIC
            if (isBlog) {
                // BLOG PLACEMENT: Safely at the bottom of the actual blog content
                if (cIntro) {
                    if (showTable) cIntro.appendChild(tableContainer);
                    if (showAudit) cIntro.appendChild(auditWidget);
                } else {
                    // Fallback if no content wrapper is found
                    let mainTarget = document.querySelector('main, #page-content, article') || document.body;
                    if (showTable) mainTarget.appendChild(tableContainer);
                    if (showAudit) mainTarget.appendChild(auditWidget);
                }

            } else if (isProductPage) {
                // PRODUCT PAGE LOGIC: Keep it high up near specs/paragraphs
                if (pTable && pTable.parentNode) {
                    pTable.parentNode.insertBefore(tableContainer, pTable.nextSibling);
                    tableContainer.parentNode.insertBefore(auditWidget, tableContainer.nextSibling);
                } else if (cIntro) {
                    const paragraphs = cIntro.querySelectorAll('p');
                    if (paragraphs.length > 2 && paragraphs[2].parentNode) {
                         const targetNode = paragraphs[2];
                         targetNode.parentNode.insertBefore(tableContainer, targetNode);
                         tableContainer.parentNode.insertBefore(auditWidget, tableContainer.nextSibling);
                    } else {
                         cIntro.insertBefore(tableContainer, cIntro.firstChild);
                         if (tableContainer.parentNode) {
                             tableContainer.parentNode.insertBefore(auditWidget, tableContainer.nextSibling);
                         }
                    }
                }

            } else {
                // CATEGORY PAGE LOGIC: Put it strictly after the list of item cards
                const gridContainer = document.querySelector('.website-list, .item-list, .products-grid');
                const itemCards = document.querySelectorAll('.item-card, .product-card, .item-row');

                if (gridContainer && gridContainer.parentNode) {
                    gridContainer.parentNode.insertBefore(tableContainer, gridContainer.nextSibling);
                    tableContainer.parentNode.insertBefore(auditWidget, tableContainer.nextSibling);
                } else if (itemCards.length > 0) {
                    const lastCard = itemCards[itemCards.length - 1];
                    const container = lastCard.closest('.row') || lastCard.parentNode;
                    if (container && container.parentNode) {
                        container.parentNode.insertBefore(tableContainer, container.nextSibling);
                    } else {
                        lastCard.parentNode.insertBefore(tableContainer, lastCard.nextSibling);
                    }
                    tableContainer.parentNode.insertBefore(auditWidget, tableContainer.nextSibling);
                } else {
                    let backupTarget = document.querySelector('footer, .web-footer, #footer') || document.querySelector('#page-content, main, .page_content');
                    if (backupTarget && backupTarget.parentNode) {
                        backupTarget.parentNode.insertBefore(tableContainer, backupTarget);
                        tableContainer.parentNode.insertBefore(auditWidget, tableContainer.nextSibling);
                    } else {
                        document.body.appendChild(tableContainer);
                        document.body.appendChild(auditWidget);
                    }
                }
            }

            // --- PART E: THE LOGIC ENGINE ---
            setTimeout(function() {
                const execBtn = document.getElementById('q-audit-btn-exec');
                const methodSelect = document.getElementById('q-audit-method');
                const inputLabel1 = document.getElementById('q-audit-lbl-1');
                const inputField1 = document.getElementById('q-audit-input1');

                // 1. DYNAMIC LABEL SWITCHER
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

                // 2. CALCULATION LOGIC
                if (execBtn) {
                    execBtn.onclick = function() {
                        const val1 = parseFloat(document.getElementById('q-audit-input1').value) || 0;
                        const val2 = parseFloat(document.getElementById('q-audit-input2').value) || 0;
                        const method = document.getElementById('q-audit-method').value;

                        if(val1 === 0) return;

                        let financialSaving = 0;
                        let ecoSaving = 0;
                        let activeLoad = 0;
                        let treeCount = 0;

                        let ecoLabel = "CO2e Saved";
                        let financeLabel = "Operational Savings";
                        let insightText = "";
                        let assumptionText = "";
                        let showGreenBanner = false;

                        // 1. CHEMICAL
                        if (method === 'chemical') {
                            financialSaving = (val1 * 12).toFixed(0);
                            ecoSaving = (val1 * 30.5).toFixed(1);
                            activeLoad = (val1 * 0.360).toFixed(2);
                            treeCount = Math.round(ecoSaving / 25);
                            showGreenBanner = true;
                            insightText = `By eliminating ${val1}L of chemical, you remove ${activeLoad}kg of active substance from the environment and avoid rising procurement costs.`;
                            assumptionText = "Glyphosate cost estimated at £12.00/L. Active substance calc: 360g/L.";
                        }
                        // 2. FOAM (DIPLOMATIC UPDATE)
                        else if (method === 'foam') {
                            financialSaving = (val1 * 6.00).toFixed(0);
                            ecoSaving = (val1 * 12.5).toFixed(1);
                            treeCount = Math.round(ecoSaving / 25);
                            activeLoad = "0.00";
                            showGreenBanner = true;
                            // DILUTED LANGUAGE: Focus on Logistics, not "Burning Budget"
                            insightText = `<strong>Operational Efficiency:</strong> Eliminating the requirement for additives removes a recurring supply chain cost and simplifies logistics. Kersten systems operate using water only, saving an estimated £${Number(financialSaving).toLocaleString()} annually.`;
                            assumptionText = "Additive costs modeled at typical industry consumable rates. Variables may differ by supplier.";
                        }
                        // 3. SWEEPERS
                        else if (method === 'manual' || method === 'contractor') {
                            if(method === 'manual') {
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
                        }
                        // 4. MANUAL WEEDING
                        else if (method === 'manual_weed') {
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
        }


        // --- PART F: SEMANTIC AI SCHEMAS ---
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

cleanupDuplicateAuthorityWidgets();
return true;
    };

 // --- PART G: PERSISTENCE ENFORCER - HARDENED AGAINST DUPLICATION ---

let checkCount = 0;

const runEnforcer = setInterval(() => {

    cleanupDuplicateAuthorityWidgets();

    if (!authorityWidgetAlreadyExists()) {
        injectFullAuthorityStack();
    }

    const wizard = document.querySelector('.kersten-fitment-wizard');
    const content = document.querySelector('.page_content');

    if (wizard && content && content.lastElementChild !== wizard) {
        content.appendChild(wizard);
    }

    checkCount++;

    if (checkCount > 10 || authorityWidgetAlreadyExists()) {
        cleanupDuplicateAuthorityWidgets();
        clearInterval(runEnforcer);
    }

}, 500);

})();