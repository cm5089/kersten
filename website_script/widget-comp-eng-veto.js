/* FRAPPE READY */

/* =================================================================
   [R] THE COMPETITIVE ENGINEERING VETO (v2026.36 - STICKY BOTTOM DEPLOYMENT)
   -----------------------------------------------------------------
   Changes:
   1. STRICT WHITELIST: Only runs on specific product/hot water paths.
   2. BOTTOM PLACEMENT: Injected at the end of the content.
   3. ORIGINAL STYLING: 100% match to the original design and data.
   ================================================================= */

(function() {
    console.log("KERSTEN VETO: Script Loaded v2026.36 (Strict Bottom Placement, Original Style)");

    // 1. DATA MATRIX (Unchanged)
    const comparisonLogic = {
        "kubota": { // PRO 10 (Twin Cyl)
            title: "🚜 HEAD-TO-HEAD: INDUSTRIAL VS. AMENITY",
            headers: ["Comparison Metric", "Kersten (Twin-Cyl Kubota)", "Standard Amenity Unit"],
            rows: [
                ["Cooling Physics", "<strong>WATER COOLED (Continuous)</strong>", "Air Cooled (Overheat Risk)"],
                ["Asset Lifespan", "<strong>20 Years (Industrial)</strong>", "5-10 Years (Commercial)"],
                ["Engine Class", "<strong>Kubota Diesel (2-Cyl)</strong>", "Stressed Petrol Engine"],
                ["Duty Cycle", "<strong>8hr+ Continuous Shift</strong>", "Intermittent / Heat Fade"],
                ["Thermal Stability", "<strong>High (Heavy Block Mass)</strong>", "Low (Lightweight Alloy)"],
                ["Torque Profile", "<strong>High Torque @ Low RPM</strong>", "Low Torque (High Revs)"],
                ["Fuel Logistics", "<strong>Red Diesel / HVO Ready</strong>", "Petrol (Storage Risk)"],
                ["OPEX / Cost", "<strong>£ (Water Only)</strong>", "<strong>£££ (Consumables and Additives)</strong>"]
            ]
        },
        "hatz": { // PRO 20 (Single Cyl) & GENERIC THERMAL
            title: "⚙️ TORQUE BATTLE: DIESEL VS. PETROL",
            headers: ["Performance Metric", "Kersten (Hatz Diesel)", "Standard Petrol / Additive Unit"],
            rows: [
                ["Cooling System", "<strong>WATER COOLED / Heavy Block</strong>", "Air Cooled (Heat Fade Risk)"],
                ["Asset Lifespan", "<strong>20 Years (Industrial)</strong>", "5-10 Years (Commercial)"],
                ["Engine Class", "<strong>Hatz Industrial Diesel</strong>", "Single Cyl. Petrol Engine"],
                ["Torque Profile", "<strong>High Torque @ Low RPM</strong>", "Low Torque (Needs High RPM)"],
                ["Workforce", "<strong>Dual Operator (2x Output)</strong>", "Single Operator (1x Output)"],
                ["Workflow", "<strong>Tow & Spray (Continuous)</strong>", "Stop-Start Repositioning"],
                ["Duty Cycle", "<strong>All-Day Operation</strong>", "Requires Cool-Downs"],
                ["Fuel Logistics", "<strong>Red Diesel / HVO Ready</strong>", "Petrol (Storage Risk)"],
                ["OPEX / Cost", "<strong>£ (Water Only)</strong>", "<strong>£££ (Consumables and Additives)</strong>"]
            ]
        },
        "electric": { // SP SERIES
            title: "⚡ EMISSIONS: TRUE EV VS. HYBRID",
            headers: ["Eco Metric", "Kersten Electric (Pure)", "Hybrid / Generator Unit"],
            rows: [
                ["Power Source", "<strong>High-Capacity Battery</strong>", "Petrol Generator / Hybrid"],
                ["Point Emissions", "<strong>Zero (True EV)</strong>", "High (Combustion Exhaust)"],
                ["Noise Profile", "<strong>Silent Operation</strong>", "Loud (Generator Noise)"],
                ["Indoor Safety", "<strong>Safe (Hospitals/Atriums)</strong>", "Unsafe (Fumes)"],
                ["Asset Life", "<strong>10+ Years (Modular)</strong>", "5-10 Years (Integrated)"],
                ["Vibration", "<strong>Zero (Electric Driven)</strong>", "High (Engine Driven)"],
                ["Maintenance", "<strong>Low (Built in Battery Maintenance)</strong>", "High (Engine Service)"],
                ["Compliance", "<strong>ULEZ / CAZ Exempt</strong>", "Restricted Access"]
            ]
        }
    };

    // 2. CONTEXT ENGINE (Strict Whitelist Approach)
    const determineContext = () => {
        const pageText = (document.title + " " + document.body.innerText).toLowerCase();
        const path = window.location.pathname.toLowerCase();

        // HARD BLOCK: Prevent appearing on generic pages
        const forbiddenPaths = ['/', '/index', '/contact', '/about', '/news', '/gallery'];
        if (forbiddenPaths.includes(path) || path === '') return null;

        // STRICT WHITELIST: Only trigger if relevant keywords are in the URL path
        // Adjust these keywords if your product page URLs use different terms!
        const isTargetPage = path.includes('product') || path.includes('weed') || path.includes('hot-water');
        if (!isTargetPage) return null;

        // LOGIC ASSIGNMENT
        if (pageText.includes("pro 10") || (pageText.includes("kubota") && pageText.includes("diesel"))) return "kubota";
        if (pageText.includes("pro 20") || pageText.includes("hatz") || pageText.includes("dual operator")) return "hatz";
        if (pageText.includes("sp 3") || pageText.includes("sp 6") || pageText.includes("battery powered")) return "electric";

        // GENERIC THERMAL (Fallback)
        const isThermalProduct = (pageText.includes("eco weedkiller") || pageText.includes("hot water") || pageText.includes("steam")) && (pageText.includes("specification") || pageText.includes("technical"));
        if (isThermalProduct) return "hatz";

        return null;
    };

    // 3. INJECTION ENGINE
    const injectVeto = () => {
        // CHECK: If on blog, ask the controller (kept from your original script)
        if (window.location.href.includes('/blog')) {
            const ctx = window.kerstenBlogContextCache || (typeof window.getKerstenBlogContext === 'function' ? window.getKerstenBlogContext() : {});
            if (ctx.tool !== 'veto') return false;
        }

        if (document.getElementById('kersten-veto-table')) return true;

        const context = determineContext();
        if (!context) return false;

        const data = comparisonLogic[context];

        const vetoDiv = document.createElement('div');
        vetoDiv.id = 'kersten-veto-table';

        // Exact original CSS styling restored
        vetoDiv.style.cssText = "margin: 60px auto 40px auto; max-width: 1200px; border: 2px solid #004d26; border-radius: 8px; overflow: hidden; background: white; font-family: sans-serif; clear: both; box-shadow: 0 5px 15px rgba(0,0,0,0.08); display: block;";

        // Exact original HTML structure restored
        vetoDiv.innerHTML = `
            <div style="background: #004d26; color: white; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: 800; font-size: 16px; letter-spacing: 0.5px; text-transform: uppercase;">${data.title}</span>
                <span style="background: #c0392b; color: white; padding: 4px 8px; border-radius: 4px; font-weight: 900; font-size: 12px;">VS</span>
            </div>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <thead>
                        <tr style="background: #f4f4f4; border-bottom: 2px solid #ddd;">
                            <th style="padding: 12px 15px; text-align: left; width: 30%; color: #555; font-weight: 700;">${data.headers[0]}</th>
                            <th style="padding: 12px 15px; text-align: left; width: 35%; color: #004d26; background: #e8f5e9; border-top: 3px solid #27ae60; font-weight: 800;">
                                ${data.headers[1]}
                                <div style="font-size: 10px; font-weight: normal; margin-top: 2px; color: #27ae60;">(RECOMMENDED)</div>
                            </th>
                            <th style="padding: 12px 15px; text-align: left; width: 35%; color: #777; font-weight: 600;">${data.headers[2]}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.rows.map(row => `
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 12px 15px; font-weight: bold; color: #333;">${row[0]}</td>
                                <td style="padding: 12px 15px; background: #f0fdf4; color: #004d26; border-left: 1px solid #ccebd6; border-right: 1px solid #ccebd6;">${row[1]}</td>
                                <td style="padding: 12px 15px; color: #666;">${row[2]}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        // PLACEMENT: Pushed directly to the bottom (just above the footer)
        const footer = document.querySelector('footer') || document.querySelector('.footer');
        if (footer && footer.parentNode) {
            footer.parentNode.insertBefore(vetoDiv, footer);
            console.log("KERSTEN VETO: Placed above footer.");
            return true;
        } else {
            document.body.appendChild(vetoDiv);
            console.log("KERSTEN VETO: Appended to body end.");
            return true;
        }
    };

    // PERSISTENCE
    let retryCount = 0;
    const runner = setInterval(() => {
        retryCount++;
        if (injectVeto() || retryCount > 30) {
            clearInterval(runner);
        }
    }, 500);

})();