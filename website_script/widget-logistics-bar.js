// All Products - Most products - next to specification table if there is one
// Link to specification table - if that appear, this should be displayed below it


/* --- [NEW] STANDALONE LOGISTICS INTELLIGENCE (v126.3 - FIXED POSITION) --- */
    function injectLogisticsBar() {
        if (window.location.href.includes('fitment-tool-embed')) return; // STOP if embed
        // 1. Prevent Duplicates
        if (document.querySelector('.logistics-bar')) return;

        // 2. Scrape Data with Enhanced Accuracy
        let weight = 0, width = 0, noise = 0;

        document.querySelectorAll('table tr, .specification-row, .frappe-table tr').forEach(row => {
            if (row.cells && row.cells.length >= 2) {
                const key = row.cells[0].innerText.toLowerCase();
                const val = row.cells[1].innerText.toLowerCase();

                const numbers = val.match(/(\d+(\.\d+)?)/g);
                const firstNum = numbers ? parseFloat(numbers[0]) : 0;

                if (key.includes('weight') || key.includes('mass')) {
                    weight = val.includes('ton') ? firstNum * 1000 : firstNum;
                }
                if (key.includes('width')) {
                    let calculatedWidth = val.includes('mm') ? firstNum / 10 : (val.includes('m') && !val.includes('cm') ? firstNum * 100 : firstNum);
                    if (width === 0 || key.includes('working')) width = calculatedWidth;
                }
                if (key.includes('noise') || key.includes('sound') || key.includes('db')) {
                    noise = firstNum;
                }
            }
        });

        // 3. TARGETING: Specifically find the Table to sit directly above it
        const tableTarget = document.querySelector('table, .specification-table, .product-specs');

        // If no table exists on this specific page, we don't show the logistics summary
        if (!tableTarget || (weight === 0 && width === 0)) return;

        // 4. Build Badges
        let badges = [];
        if (weight > 0 && weight < 750) badges.push(`🚗 Easy Tow (<750kg)`);
        else if (weight >= 750) badges.push(`🚛 Trailer Required`);

        if (width > 0 && width < 100) badges.push(`🚪 Fits Single Gates`);
        else if (width > 0 && width < 155) badges.push(`🚪 Fits Double Gates`);

        if (noise > 0 && noise < 85) badges.push(`<span>🔇 Urban Quiet (${noise}dB)</span>`);

        if (badges.length === 0) return;

        // 5. Create and Inject Bar directly ABOVE the table
        const logBar = document.createElement('div');
        logBar.className = 'logistics-bar';
        logBar.style.cssText = "margin: 40px 0 15px 0; clear: both; padding-top: 10px; width: 100%;";
        logBar.innerHTML = `
        <p style="margin: 0 0 12px 0; font-size: 13px; font-weight: 800; color: #004d26; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #eee; padding-bottom: 8px;">
            ⚙️ Site Logistics Summary
        </p>
        <div style="display:flex; flex-wrap:wrap; gap:12px;">
            ${badges.map(b => `
                <div style="background:#fff; border:2px solid #004d26; color:#004d26; padding:12px 20px; border-radius:30px; font-size:15px; font-weight:800; box-shadow: 0 4px 10px rgba(0,0,0,0.08); display:flex; align-items:center; transition: all 0.2s ease;">
                    ${b}
                </div>
            `).join('')}
        </div>`;

        // This line ensures it sits precisely above the table
        tableTarget.parentNode.insertBefore(logBar, tableTarget);
    }