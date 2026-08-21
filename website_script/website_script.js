/* --- [0] GLOBAL UTILITIES & COMPACT STYLING (Safe-Wrapped) --- */
(function() {
    // 3. WIDGET RESIZER
    if (window.location.pathname.includes('fitment-tool-embed')) {
        const sendHeight = () => {
            const height = document.body.scrollHeight;
            window.parent.postMessage({ 'kerstenWidgetHeight': height }, "*");
        };
        window.addEventListener('load', sendHeight);
        window.addEventListener('resize', sendHeight);
        document.addEventListener('click', () => setTimeout(sendHeight, 200));
    }
})();

/* --- [X] BLOG TRAFFIC CONTROLLER (The "Highlander" Logic - v2.0 JIT) --- */
// We define a function that runs Just-In-Time when called by the tools
window.getKerstenBlogContext = function() {
    if (!window.location.href.includes('/blog')) return { tool: 'all' }; // Non-blog pages get everything

    const contentEl = document.querySelector('.blog-content, .web-page-content, article') || document.body;
    const text = (document.title + " " + contentEl.innerText).toLowerCase();

    // SCORING SYSTEM
    let scores = {
        'veto': 0,      // Engineering Comparison
        'audit': 2,     // Base score (Default fallback)
        'havs': 0,      // Safety Calculator
        'wizard': 0     // Fitment Finder
    };

    // 1. Veto Triggers
    if (text.includes('petrol') && text.includes('diesel')) scores.veto += 10;
    if (text.includes('kubota') || text.includes('hatz')) scores.veto += 5;
    if (text.includes('vs') || text.includes('comparison')) scores.veto += 3;

    // 2. Audit Triggers
    if (text.includes('cost') || text.includes('saving')) scores.audit += 5;
    if (text.includes('carbon') || text.includes('net zero')) scores.audit += 5;
    if (text.includes('chemical') || text.includes('glyphosate')) scores.audit += 8;

    // 3. HAVS Triggers
    if (text.includes('vibration') || text.includes('havs')) scores.havs += 15; // Strong priority
    if (text.includes('safety') || text.includes('health')) scores.havs += 5;

    // 4. Wizard Triggers
    if (text.includes('attachment') || text.includes('tractor')) scores.wizard += 5;
    if (text.includes('fit') || text.includes('compatible')) scores.wizard += 5;

    // DETERMINE WINNER
    let winner = 'audit'; // Default
    let maxScore = 0;

    for (let [key, score] of Object.entries(scores)) {
        if (score > maxScore) {
            maxScore = score;
            winner = key;
        }
    }
    // Cache the result so we don't recalculate 50 times
    window.kerstenBlogContextCache = { tool: winner };
    console.log(`Kersten Blog Controller: Winner is [${winner.toUpperCase()}]`);
    return { tool: winner };
};

/* --- WIDGET AUTO-RESIZER ENGINE (SENDER) --- */
const sendHeightToParent = () => {
    if (window.location.pathname.includes('fitment-tool-embed')) {
        const height = document.body.scrollHeight;
        window.parent.postMessage({ 'kerstenWidgetHeight': height }, "*");
    }
};
window.addEventListener('load', sendHeightToParent);
window.addEventListener('resize', sendHeightToParent);
document.addEventListener('click', () => setTimeout(sendHeightToParent, 200));


/** 2. HIGH-SPEED VIDEO ENGINE **/
function labnolIframe(div) {
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'https://www.youtube.com/embed/' + div.dataset.id + '?autoplay=1&rel=0&modestbranding=1&controls=1&showinfo=0&mute=1');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '1');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    div.parentNode.replaceChild(iframe, div);
}
function initYouTubeVideos() {
    var playerElements = document.getElementsByClassName('youtube-player');
    for (var n = 0; n < playerElements.length; n++) {
        var videoId = playerElements[n].dataset.id;
        var div = document.createElement('div');
        div.setAttribute('data-id', videoId);
        var thumbNode = document.createElement('img');
        thumbNode.src = 'https://i.ytimg.com/vi/' + videoId + '/hqdefault.jpg';
        thumbNode.setAttribute('loading', 'lazy');
        thumbNode.setAttribute('alt', 'Kersten Specialist Technical Demonstration Video');
        div.appendChild(thumbNode);
        var playButton = document.createElement('div');
        playButton.setAttribute('class', 'play');
        div.appendChild(playButton);
        div.onclick = function () { labnolIframe(this); };

// Auto-play on scroll into view
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            labnolIframe(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
observer.observe(div);
        playerElements[n].appendChild(div);
    }
}
document.addEventListener('DOMContentLoaded', initYouTubeVideos);

/** 3. UI & CONVERSION ANCHORS **/
let backToTopBtn = document.createElement('button');
backToTopBtn.id = 'backToTopBtn';
backToTopBtn.innerHTML = '↑';
backToTopBtn.setAttribute('aria-label', 'Back to top');
if (!window.location.pathname.includes('fitment-tool-embed')) { document.body.appendChild(backToTopBtn); }
let contactUsBtn = document.createElement('button');
contactUsBtn.id = 'contactUsBtn';
contactUsBtn.innerHTML = 'Talk to an Expert';
if (!window.location.pathname.includes('fitment-tool-embed')) { document.body.appendChild(contactUsBtn); }

function applyKerstenStyles(element, styles) { for (let property in styles) { element.style[property] = styles[property]; } }
function adjustForMobile() {
    if (window.innerWidth <= 768) {
        applyKerstenStyles(backToTopBtn, { fontSize: '6.5vw', width: '17vw', height: '17vw', bottom: '12%', right: '6%', position: 'fixed', zIndex: '999999', borderRadius: '50%', border: 'none', backgroundColor: '#E44D2E', color: 'white', cursor: 'pointer', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.4)', display: 'none', alignItems: 'center', justifyContent: 'center', transition: 'all 0.4s ease' });
        applyKerstenStyles(contactUsBtn, { fontSize: '14px', padding: '16px 24px', top: '15px', right: '15px', position: 'fixed', zIndex: '999999', borderRadius: '10px', border: 'none', backgroundColor: '#E44D2E', color: 'white', cursor: 'pointer', display: 'none', textAlign: 'center', fontWeight: '900', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.4)', textTransform: 'uppercase', letterSpacing: '1px' });
    } else {
        applyKerstenStyles(backToTopBtn, { fontSize: '45px', width: '90px', height: '90px', bottom: '130px', right: '45px', position: 'fixed', zIndex: '999999', borderRadius: '50%', border: 'none', backgroundColor: '#E44D2E', color: 'white', cursor: 'pointer', boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.4)', display: 'none', alignItems: 'center', justifyContent: 'center', transition: 'all 0.4s ease' });
        applyKerstenStyles(contactUsBtn, { fontSize: '20px', padding: '18px 40px', top: '45px', right: '45px', position: 'fixed', zIndex: '999999', borderRadius: '10px', border: 'none', backgroundColor: '#E44D2E', color: 'white', cursor: 'pointer', display: 'none', textAlign: 'center', fontWeight: '900', boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.4)', textTransform: 'uppercase', letterSpacing: '1.5px' });
    }
}
function updateCTAByPrice() {
    const priceContainer = document.querySelector('[itemprop="price"], .product-price, .item-price, .price, [data-value]');
    if (priceContainer) {
        const rawPriceText = (priceContainer.getAttribute('content') || priceContainer.getAttribute('data-value') || priceContainer.innerText).replace(/[^\d.]/g, '');
        const numericPriceValue = parseFloat(rawPriceText);
        if (numericPriceValue > 500) { contactUsBtn.innerHTML = 'Book a Professional Site Demo'; contactUsBtn.style.backgroundColor = '#004d26'; } else { contactUsBtn.innerHTML = 'Verify Professional Compatibility'; contactUsBtn.style.backgroundColor = '#E44D2E'; }
    }
}
window.addEventListener('scroll', function() {
    const scrollDepth = document.documentElement.scrollTop || document.body.scrollTop;
    if (backToTopBtn.style.position !== 'fixed') adjustForMobile();
    if (scrollDepth > 300) { backToTopBtn.style.display = 'flex'; contactUsBtn.style.display = 'block'; } else { backToTopBtn.style.display = 'none'; contactUsBtn.style.display = 'none'; }
});
backToTopBtn.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
contactUsBtn.addEventListener('click', function() { window.location.href = 'https://kerstenuk.com/Contact-us-2'; });
window.addEventListener('resize', adjustForMobile);
adjustForMobile();

/* --- CHATBOT KILL SWITCH FOR EMBED PAGE --- */
if (window.location.pathname.includes('fitment-tool-embed')) {
    const chatFailsafe = setInterval(() => {
        const chatWidget = document.querySelector('iframe[src*="enterprise-operation"], #hs-messages-messenger, .privy-embed-widget');
        if (chatWidget) { chatWidget.style.setProperty("display", "none", "important"); chatWidget.remove(); clearInterval(chatFailsafe); }
    }, 200);
    setTimeout(() => clearInterval(chatFailsafe), 10000);
}

/** 4. SEO & AUTHORITY ENGINE **/
frappe.ready(function() {
    const fullBodyText = document.body.innerText;
    const lowerBodyText = fullBodyText.toLowerCase();
    const currentDocumentTitle = document.title;
    const globalExpiryDate = "2026-12-31";
    const CORE_ORG_ID = "https://kerstenuk.com/#organization";

    const performSchemaInjection = function(schemaData) {
        const schemaScript = document.createElement('script');
        schemaScript.type = 'application/ld+json';
        schemaScript.text = JSON.stringify(schemaData);
        document.head.appendChild(schemaScript);
    };


    // --- Kersten Nationwide Dealer Authority Engine ---
    var dealerList = [
        { name: "Vincent Tractors", town: "Fraddon", region: "Cornwall and Devon", specialist: true }, // <--- SPECIALIST
        { name: "Craddock Tractors", town: "Clevedon", region: "South West" },
        { name: "Lister Wilder", town: "Reading", region: "South East" },
        { name: "Ernest Doe & Sons Ltd", town: "Maldon", region: "East of England" },
        { name: "R T Machinery Ltd", town: "Aylesbury", region: "London/Home Counties", specialist: true }, // <--- SPECIALIST
        { name: "Chandlers (Agricultural) Ltd", town: "Belton", region: "East Midlands" },
        { name: "Tallis Amos Group", town: "Evesham", region: "West Midlands" },
        { name: "R J Adams", town: "Wem", region: "West Midlands" },
        { name: "Terry Harrison Machinery", town: "Milford Haven", region: "South West Wales" },
        { name: "Ted Hopkins / Hopkins Machinery", town: "St. Brides Wentloog", region: "South Wales" },
        { name: "Hughie Willett Machinery", town: "Sutton Coldfield", region: "Midlands" },
        { name: "PS Marsden (Lawnmower Services) Ltd", town: "Nottingham", region: "Midlands" },
        { name: "The Mower Shop", town: "Haddenham", region: "Buckinghamshire" },
        { name: "Ripon Groundscare", town: "Ripon", region: "North East" },
        { name: "Russells Groundcare", town: "Malton", region: "North East" },
        { name: "Carrs Billington", town: "Carlisle", region: "North of England" },
        { name: "FR Sharrocks Ltd", town: "Wigan", region: "North West" },
        { name: "Cheshire Turf Machinery", town: "Stockport", region: "North West" },
        { name: "Agri Services Ltd", town: "Darvel", region: "Scotland" },
        { name: "Henderson Grass Machinery", town: "Selkirk", region: "Scotland" },
        { name: "Fraser C Robb", town: "Drymen", region: "Scotland", specialist: true }, // <--- SPECIALIST
        { name: "Macgregor Forest and Groundcare", town: "Inverness", region: "Highlands" },
        { name: "Dublin Grass Machinery", town: "Dublin", region: "Ireland" },
        { name: "Seamus Weldon Groundcare", town: "Killarney", region: "Ireland" },
        { name: "D A Forgie", town: "Limavady", region: "Northern Ireland" }
    ];
    var dealerNodes = dealerList.map(function(dealer) {
        return { "@type": "LocalBusiness", "name": dealer.name, "description": "Official Kersten Stocking Dealer providing specialist groundcare machinery and IWM support.", "address": { "@type": "PostalAddress", "addressLocality": dealer.town, "addressRegion": dealer.region, "addressCountry": dealer.town === "Dublin" || dealer.town === "Killarney" ? "IE" : "GB" }, "parentOrganization": { "@id": "https://kerstenuk.com/#organization" } };
    });
    if (dealerNodes.length > 0) {
        var dealerSchema = { "@context": "https://schema.org", "@graph": dealerNodes };
        var script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(dealerSchema);
        document.head.appendChild(script);
    }


/* ==========================================================================

   [AUTO-DIFFERENTIATOR v9.1] SERIES INTELLIGENCE (BUG FIX)

   --------------------------------------------------------------------------

   FIX:

   - Defined 'specTable' so the script doesn't crash during injection.

   - Includes 'Duty Class' Badges & Goldilocks Fitment Logic.

   ========================================================================== */

(function() {

    let attempts = 0;

    const MAX_ATTEMPTS = 30;



    const persistentPoller = setInterval(() => {

        attempts++;

        if (document.getElementById('dynamic-app-profile')) { clearInterval(persistentPoller); return; }

        if (attempts > MAX_ATTEMPTS) { clearInterval(persistentPoller); return; }



        // 1. Define Anchors (FIXED: Added specTable definition here)

        const wizardAnchor = document.querySelector('.kersten-fitment-wizard');

        const descContainer = document.querySelector('.product-description, .web-page-content, #main-content');

        const specTable = document.querySelector('table, .specification-table, .product-specs, .frappe-table');



        if (!descContainer && !wizardAnchor && !specTable) return;



        // --- DATABASE: EXTENDED TRACTOR WIDTHS (cm) ---

        const tractorWidths = [

            { name: "Solis 20/26", width: 105 },

            { name: "Kubota BX Series", width: 114 },

            { name: "John Deere 1-Series", width: 120 },

            { name: "Iseki TXGS 24", width: 122 },

            { name: "New Holland Boomer 25", width: 125 },

            { name: "Kubota B1 Series", width: 127 },

            { name: "Kubota B2 Series", width: 130 },

            { name: "John Deere 2-Series", width: 135 },

            { name: "Kubota LX Series", width: 135 },

            { name: "Kioti CS Series", width: 118 },

            { name: "Kioti CX Series", width: 125 },

            { name: "Kioti CK Series", width: 138 },

            { name: "Farmtrac 22", width: 105 },

            { name: "Farmtrac 26", width: 110 },

            { name: "Iseki TM Series", width: 110 },

            { name: "Iseki TH Series", width: 130 },

            { name: "Kubota L1/L2 Series", width: 145 },

            { name: "John Deere 3-Series", width: 150 },

            { name: "New Holland Boomer 35/40", width: 150 },

            { name: "John Deere 4-Series", width: 175 },

            { name: "Kubota M-Series", width: 190 },

            { name: "John Deere 5-Series", width: 200 }

        ];



        // 2. Data Harvesting

        let specs = { width: 0, weight: 0, capacity: 0, hp: 0, height: 0, features: [] };

        let widthScore = 0;



        const clean = (str) => (str || '').toLowerCase().replace(/[^a-z0-9\sø]/g, '');

        const pageTitleRaw = document.title;

        const urlContext = window.location.href.toLowerCase();



        // --- SERIES DETECTION ---

        const isHeavyDuty = urlContext.includes('snk') || urlContext.includes('fkm') || urlContext.includes('hkm') || urlContext.includes('heavy');

        const isStandard = urlContext.includes('sch') || urlContext.includes('km') || urlContext.includes('light');



        const isPlough = urlContext.includes('plough') || urlContext.includes('snow') || urlContext.includes('blade');

        const isSpreader = urlContext.includes('spreader') || urlContext.includes('polaro');

        const isPowerUnit = urlContext.includes('machine') || urlContext.includes('hydro') && !isPlough;



        // Scrape Table

        const rows = document.querySelectorAll('tr');

        rows.forEach(row => {

            if (row.cells.length < 2) return;

            const label = clean(row.cells[0].innerText);

            const valRaw = row.cells[1].innerText;

            const valClean = clean(valRaw);

            const valNum = parseFloat(valRaw.match(/(\d+(\.\d+)?)/)?.[0] || 0);



            if (!label.includes('transport') && !label.includes('diameter') && !label.includes('ø') && !label.includes('angle')) {

                let currentScore = 0;

                let potentialWidth = 0;

                if (valClean.includes('mm')) potentialWidth = valNum / 10;

                else if (valClean.includes('cm')) potentialWidth = valNum;

                else if (valClean.includes('m') && valNum < 10) potentialWidth = valNum * 100;

                else if (valNum > 0 && valNum < 350) potentialWidth = valNum;



                if (label.includes('working width') || label.includes('clearing')) currentScore = 10;

                else if (label.includes('blade width')) currentScore = 8;

                else if (label.includes('width')) currentScore = 5;



                if (currentScore > widthScore && potentialWidth > 0) {

                    specs.width = potentialWidth;

                    widthScore = currentScore;

                }

            }

            if (label.includes('weight')) specs.weight = valNum;

            if (label.includes('capacity')) specs.capacity = valNum;

            if (label.includes('engine') && valClean.includes('hp')) specs.hp = valNum;

            if (valClean.includes('spring') || valClean.includes('trip')) specs.features.push("Spring-Loaded Trip");

            if (valClean.includes('rubber') || valClean.includes('ureth')) specs.features.push("Quiet Urethane Edge");

        });



        if (specs.width === 0) { // Fallback to title

            const titleMatch = pageTitleRaw.match(/(\d+)\s*(cm|mm|m)/i);

            if (titleMatch) {

                const num = parseFloat(titleMatch[1]);

                const unit = titleMatch[2].toLowerCase();

                if (unit === 'mm') specs.width = num / 10;

                else if (unit === 'cm') specs.width = num;

                else if (unit === 'm') specs.width = num * 100;

            }

        }



        if (specs.width === 0 && !isSpreader && !isPowerUnit) return;



        // 3. Logic Engine

        let sentA = "", sentB = "", sentC = "";

        let validMatches = [];

        let matchNote = "";

        let badge = "";



        // --- BADGE LOGIC ---

        if (isHeavyDuty || specs.weight > 250) {

            badge = `<span style="background:#2c3e50; color:white; padding:4px 10px; border-radius:4px; font-size:11px; font-weight:800; letter-spacing:1px;">🛡️ MUNICIPAL / HEAVY DUTY</span>`;

            sentC = `<strong>Series Note:</strong> This is a "Heavy Duty" variant, featuring reinforced chassis components and higher-grade steel for continuous municipal or contracting operations.`;

        } else if (isStandard || specs.weight < 250) {

            badge = `<span style="background:#27ae60; color:white; padding:4px 10px; border-radius:4px; font-size:11px; font-weight:800; letter-spacing:1px;">🏡 COMPACT / ESTATE SERIES</span>`;

            sentC = `<strong>Series Note:</strong> This "Compact Series" model is optimized for weight-sensitivity, allowing professional performance on smaller tractors without overloading the rear axle.`;

        }



        // --- WIDTH & FITMENT LOGIC ---

        if (!isSpreader && !isPowerUnit && specs.width > 0) {

            let effectiveWidth = isPlough ? Math.round(specs.width * 0.88) : specs.width;



            // 30cm Goldilocks Rule (Expanded slightly for better matching)

            const minTractorWidth = effectiveWidth - 30;

            const maxTractorWidth = effectiveWidth;



            validMatches = tractorWidths

                .filter(t => t.width >= minTractorWidth && t.width <= maxTractorWidth)

                .map(t => `${t.name} (${t.width}cm)`);



            matchNote = `*Matches based on effective working width of ${effectiveWidth}cm (Ideal Track Width: ${minTractorWidth}-${maxTractorWidth}cm).`;



            if (specs.width <= 140) sentA = `With a working width of <strong>${specs.width}cm</strong>, this model is the definitive "Path-Master," calibrated to clear standard 1.2m UK footpaths.`;

            else if (specs.width <= 175) sentA = `Spanning <strong>${specs.width}cm</strong>, this unit enters the "Utility Class," designed to mask the wheel track of modern compact tractors (25hp+).`;

            else sentA = `At <strong>${specs.width}cm</strong>, this machine is built for "Municipal Productivity," covering estate roads rapidly.`;



            if (isPlough) {

                 sentA = `<strong>❄️ Winter Clearing Physics:</strong> While the total blade width is <strong>${specs.width}cm</strong>, the effective clearing path when angled (30°) is approximately <strong>${effectiveWidth}cm</strong>.`;

            }

        }

        else if (isSpreader && specs.capacity > 0) {

            const bags = Math.floor(specs.capacity / 25);

            sentA = `With a hopper capacity of <strong>${specs.capacity} Litres</strong>, this unit accepts approximately <strong>${bags} x 25kg bags</strong> of salt.`;

            badge = `<span style="background:#2980b9; color:white; padding:4px 10px; border-radius:4px; font-size:11px; font-weight:800; letter-spacing:1px;">❄️ WINTER LOGISTICS</span>`;

        }



        // 4. Construct UI

        if (!sentA) return;



        clearInterval(persistentPoller);



        const profileBox = document.createElement('div');

        profileBox.id = 'dynamic-app-profile';

        profileBox.style.cssText = "background:#fdfdfd; border-left:4px solid #004d26; border:1px solid #e0e0e0; border-left-width:4px; padding:25px; margin-bottom:25px; border-radius:4px; font-family:'Inter', sans-serif; animation: fadeIn 0.5s ease-in-out;";



        let tractorHTML = '';

        if (validMatches.length > 0) {

            tractorHTML = `

                <div style="margin-top:20px; padding-top:15px; border-top:1px dashed #ccc;">

                    <span style="font-size:12px; font-weight:800; color:#555; text-transform:uppercase; display:block; margin-bottom:8px;">

                        ${isPlough ? '✅ Verified Track-Width Matches:' : '🚜 Calculated Ideal Matches:'}

                    </span>

                    <div style="display:flex; flex-wrap:wrap; gap:8px;">

                        ${validMatches.map(t =>

                            `<span style="background:#f0f9f4; border:1px solid #004d26; color:#004d26; font-size:12px; font-weight:700; padding:4px 10px; border-radius:4px;">✓ ${t}</span>`

                        ).join('')}

                    </div>

                    <div style="font-size:11px; color:#888; margin-top:6px;">${matchNote}</div>

                </div>

            `;

        } else if (!isSpreader && !isPowerUnit) {

             tractorHTML = `

                <div style="margin-top:20px; padding-top:15px; border-top:1px dashed #ccc;">

                    <span style="font-size:12px; font-weight:800; color:#888; text-transform:uppercase; display:block; margin-bottom:8px;">

                        🚜 Tractor Fitment Note:

                    </span>

                    <div style="font-size:13px; color:#555;">No standard compact tractors found for this specific width range (${specs.width - 20}-${specs.width}cm). This unit may require a specialist carrier.</div>

                </div>`;

        }



        profileBox.innerHTML = `

            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">

                <h4 style="margin:0; color:#004d26; font-size:16px; font-weight:800; text-transform:uppercase; letter-spacing:0.5px;">

                    📊 Technical Application Profile

                </h4>

                ${badge}

            </div>

            <p style="font-size:15px; line-height:1.7; color:#333; margin-bottom:10px;">

                ${sentA} ${sentB}

            </p>

            <p style="font-size:14px; line-height:1.6; color:#555; margin-bottom:0; background:#f4f4f4; padding:10px; border-radius:4px;">

                ${sentC}

            </p>

            ${tractorHTML}

            <style>@keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }</style>

        `;



        // 5. Injection (Priority: Wizard -> Description -> Table)

        if (wizardAnchor && wizardAnchor.parentNode) {

            wizardAnchor.parentNode.insertBefore(profileBox, wizardAnchor.nextSibling);

        } else if (descContainer) {

            descContainer.insertBefore(profileBox, descContainer.firstChild);

        } else if (specTable && specTable.parentNode) {

             specTable.parentNode.insertBefore(profileBox, specTable.nextSibling);

        }



    }, 200);

})();



/* --- [A-C] TARGETED IWM AUTHORITY ENGINE --- */

(function () {
    "use strict";

    var path = window.location.pathname.toLowerCase();

    try {
        path = decodeURIComponent(path);
    } catch (error) {
        // Keep the original path if decoding fails.
    }

    var contentElement =
        document.querySelector(".blog-content") ||
        document.querySelector(".web-page-content") ||
        document.querySelector(".product-description") ||
        document.querySelector(".page_content") ||
        document.querySelector("article") ||
        document.querySelector("main") ||
        document.querySelector("#main-content");

    var pageContent = (
        document.title +
        " " +
        (contentElement ? contentElement.innerText : "")
    )
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();

    var iwmPathTerms = [
        "integrated-weed",
        "integrated weed",
        "chemical-free",
        "chemical free",
        "pesticide-free",
        "pesticide free",
        "weed-management",
        "weed management",
        "weed-control",
        "weed control",
        "weed-brush",
        "weedbrush",
        "thermal-weed",
        "thermal weed",
        "hot-water",
        "hot water",
        "hot-air",
        "hot air",
        "eco-weedkiller",
        "ripagreen",
        "zasso",
        "national-action-plan",
        "national action plan",
        "nap-2025",
        "bracknell",
        "weeds-are-not-the-problem",
        "iwm-workshop"
    ];

    var iwmContentTerms = [
        "integrated weed management",
        "pesticide reduction",
        "glyphosate reduction",
        "chemical-free weed control",
        "chemical free weed control",
        "pesticide-free weed control",
        "pesticide free weed control",
        "mechanical weed control",
        "thermal weed control"
    ];

    var councilTerms = [
        "council",
        "local authority",
        "borough",
        "municipal",
        "public realm",
        "amenity contractor"
    ];

    var isDirectIwmPage =
        iwmPathTerms.some(function (term) {
            return path.indexOf(term) !== -1;
        });

    var isRelevantIwmArticle =
        (
            path.indexOf("/blog/") !== -1 ||
            path.indexOf("/news/") !== -1
        ) &&
        iwmContentTerms.some(function (term) {
            return pageContent.indexOf(term) !== -1;
        });

    var isIwmPage =
        isDirectIwmPage ||
        isRelevantIwmArticle;

    if (!isIwmPage) {
        return;
    }

    var isCouncilPage =
        councilTerms.some(function (term) {
            return pageContent.indexOf(term) !== -1;
        });

    var authBar =
        document.getElementById("kersten-authority-outer");

    if (authBar && isCouncilPage) {
        authBar.style.borderBottom =
            "4px solid #ffcc00";

        var councilLink =
            authBar.querySelector(
                'a[href*="national-action-plan"]'
            );

        if (councilLink) {
            councilLink.textContent =
                "View the Council IWM Guide";

            councilLink.style.backgroundColor =
                "#ffcc00";

            councilLink.style.color =
                "#004d26";

            councilLink.style.borderColor =
                "#ffcc00";
        }
    }

    var authoritySchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id":
            window.location.origin +
            window.location.pathname +
            "#iwm-webpage",
        "url":
            window.location.origin +
            window.location.pathname,
        "name":
            document.querySelector("h1")
                ? document.querySelector("h1").innerText.trim()
                : document.title,
        "author": {
            "@id": "https://kerstenuk.com/#person"
        },
        "publisher": {
            "@id": "https://kerstenuk.com/#organization"
        },
        "about": [
            {
                "@type": "Thing",
                "name": "Integrated Weed Management"
            },
            {
                "@type": "Thing",
                "name": "Professional Amenity Weed Management"
            }
        ],
        "mentions": [
            {
                "@type": "CreativeWork",
                "name": "UK Pesticides National Action Plan 2025",
                "url": "https://www.gov.uk/government/publications/uk-pesticides-national-action-plan-2025"
            },
            {
                "@type": "CreativeWork",
                "name": "Parks for London Integrated Weed Management Reference Guide 2025",
                "url": "https://parksforlondon.org.uk/resource/integrated-weed-management/"
            },
            {
                "@type": "CreativeWork",
                "name": "Lantra Integrated Weed Management Training",
                "url": "https://www.lantra.co.uk/product/35943"
            }
        ]
    };

    if (isCouncilPage) {
        authoritySchema.audience = {
            "@type": "Audience",
            "audienceType":
                "UK local authorities, councils, grounds teams and amenity contractors"
        };
    }

    performSchemaInjection(authoritySchema);
})();




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







    /* --- [E] NUCLEAR BREADCRUMB REPAIR --- */

    const executeNuclearBreadcrumbRepair = function() {

        const breadcrumbRoot = document.querySelector('.breadcrumb, .breadcrumb-list, #breadcrumbs, .yoast-breadcrumbs, .frappe-breadcrumbs');

        if (!breadcrumbRoot) return;

        const breadcrumbListItems = breadcrumbRoot.querySelectorAll('li');



        breadcrumbListItems.forEach(function(listItem) {

            if (!listItem.querySelector('a')) {

                const secureGhostLink = document.createElement('a');

                secureGhostLink.setAttribute('href', window.location.href);

                secureGhostLink.setAttribute('itemprop', 'item');

                secureGhostLink.style.display = 'none';

                listItem.appendChild(secureGhostLink);

            }

        });



        const unifiedBreadcrumbSchema = {

            "@context": "https://schema.org",

            "@type": "BreadcrumbList",

            "itemListElement": Array.from(breadcrumbListItems).map(function(li, i) {

                const activeLink = li.querySelector('a');

                return {

                    "@type": "ListItem",

                    "position": i + 1,

                    "name": li.innerText.trim() || "Kersten UK Authority Node",

                    "item": activeLink ? activeLink.href : window.location.href

                };

            })

        };

        performSchemaInjection(unifiedBreadcrumbSchema);

    };

    setTimeout(executeNuclearBreadcrumbRepair, 3000);



  /* --- [E.2] INTELLIGENT AUTO-BREADCRUMB GENERATOR (v2.0) --- */

/* Detects empty breadcrumbs and builds them based on page title keywords */

(function() {

    const buildBreadcrumbs = () => {

        // 1. Target the container and check if we are on the homepage

        const container = document.querySelector('.page-breadcrumbs');

        const currentUrl = window.location.pathname;



        // NEW: Stop the script if this is the homepage (path is "/")

        if (currentUrl === "/" || currentUrl === "/index") return;



        // Only run if container exists BUT is empty/too short

        if (!container || container.innerText.trim().length > 5) return;



        // 2. Get Page Data

        const pageTitle = document.title.split('|')[0].trim();

        const lowerTitle = pageTitle.toLowerCase();



        // 3. Define Logic: Keyword -> Parent Category Name -> Parent URL

        const logicMap = [

            { keys: ["kubota", "john deere", "iseki", "solis", "kioti", "new holland", "tym"], parent: "Compact Tractor Attachments", url: "/Compact-Tractor-Attachments-Page" },

            { keys: ["sweeper", "collector", "scavenger"], parent: "Sweepers & Collectors", url: "/sweepers" },

            { keys: ["weed", "moss", "brush", "wkb", "ubs"], parent: "Weed Control", url: "/weed-brush" },

            { keys: ["snow", "plough", "winter", "ice", "spreader"], parent: "Winter Equipment", url: "/winter-equipment" },

            { keys: ["mower", "grass", "flail"], parent: "Grass Cutting", url: "/grass-cutting-equipment" }

        ];



        // 4. Find a match

        let parentName = "All Products";

        let parentUrl = "/all-products";



        for (let rule of logicMap) {

            if (rule.keys.some(k => lowerTitle.includes(k))) {

                parentName = rule.parent;

                parentUrl = rule.url;

                break; // Stop at first match

            }

        }



        // 5. Build HTML (Standard Bootstrap/Frappe Structure)

        const html = `

            <nav aria-label="breadcrumb" style="padding: 10px 0;">

                <ol class="breadcrumb" style="background:transparent; padding:0; margin:0; font-size: 14px;">

                    <li class="breadcrumb-item"><a href="/" style="color:#666;">Home</a></li>

                    <li class="breadcrumb-item"><a href="${parentUrl}" style="color:#666;">${parentName}</a></li>

                    <li class="breadcrumb-item active" aria-current="page" style="color:#004d26; font-weight:600;">${pageTitle}</li>

                </ol>

            </nav>

        `;



        // 6. Inject with Schema

        container.innerHTML = html;



        // 7. Inject JSON-LD Schema for Google (Invisible but vital)

        const schema = {

            "@context": "https://schema.org",

            "@type": "BreadcrumbList",

            "itemListElement": [{

                "@type": "ListItem",

                "position": 1,

                "name": "Home",

                "item": "https://kerstenuk.com/"

            },{

                "@type": "ListItem",

                "position": 2,

                "name": parentName,

                "item": "https://kerstenuk.com" + parentUrl

            },{

                "@type": "ListItem",

                "position": 3,

                "name": pageTitle,

                "item": "https://kerstenuk.com" + currentUrl

            }]

        };

        const script = document.createElement('script');

        script.type = "application/ld+json";

        script.text = JSON.stringify(schema);

        document.head.appendChild(script);



        console.log(`Auto-Breadcrumb: Generated path for "${pageTitle}" under "${parentName}"`);

    };



    // Run immediately and check again after short delay (for dynamic loading)

    buildBreadcrumbs();

    setTimeout(buildBreadcrumbs, 1000);

})();



/* --- [F] BLOG AUTHORITY OVERWRITE (v121.0 - Safety Context Patch) --- */

    // 1. SAFETY TRIGGER: Check if URL is blog/news AND ensure it is NOT a product page

    const isBlogUrl = window.location.href.includes('/blog') || window.location.href.includes('/news');

    const isProductPage = document.querySelector('.product-price') || document.querySelector('.cart-btn') || document.querySelector('[itemprop="price"]');



    if (isBlogUrl && !isProductPage) {

        setTimeout(() => {

            // 2. CLEANUP: Remove conflicting/duplicate ERPNext schemas to avoid "Double Classification"

            const systemScripts = document.querySelectorAll('script[type="application/ld+json"]');

            systemScripts.forEach(s => {

                if ((s.text.includes('"Article"') || s.text.includes('"BlogPosting"')) && !s.text.includes('#person')) {

                    s.remove();

                }

            });



            // 3. INJECT: Authority-Grade Schema

            const blogSchema = {

                "@context": "https://schema.org",

                "@type": "BlogPosting",

                "@id": window.location.href + "#article",

                "mainEntityOfPage": { "@type": "WebPage", "@id": window.location.href },

                "headline": document.querySelector('.blog-title, h1')?.innerText.trim() || document.title,

                "description": (document.querySelector('meta[name="description"]') ? document.querySelector('meta[name="description"]').content : "") || "Specialist guidance on the UK Pesticide National Action Plan 2025 (NAP).",

                "image": { "@type": "ImageObject", "url": document.querySelector('meta[property="og:image"]')?.content || "https://kerstenuk.com/files/kersten-logo.png" },

                "author": { "@id": "https://kerstenuk.com/#person" },

                "publisher": {

                    "@id": "https://kerstenuk.com/#organization",

                    "@type": "Organization",

                    "name": "Kersten UK Limited",

                    "logo": { "@type": "ImageObject", "url": "https://kerstenuk.com/files/kersten-logo.png" }

                },

                "datePublished": document.querySelector('meta[property="article:published_time"]')?.content || "2025-01-01T08:00:00+00:00",

                "dateModified": new Date().toISOString()

            };

            performSchemaInjection(blogSchema);

        }, 600);

    }

    /* --- [G] CASE STUDY AUTHORITY ENGINE --- */

    if (window.location.href.includes('case-study')) {

        const tractors = ["Kubota", "John Deere", "Iseki", "Kioti", "New Holland"];

        const machines = ["Sweeper", "WeedBrush", "Hoaf", "Ripagreen", "Zasso"];



        const usedTractor = tractors.find(t => fullBodyText.includes(t)) || "Compact Tractor";

        const usedMachine = machines.find(m => fullBodyText.includes(m)) || "Kersten Attachment";



        const caseStudySchema = {

            "@context": "https://schema.org",

            "@type": "Article",

            "@id": window.location.href + "#casestudy",

            "headline": document.querySelector('h1')?.innerText || document.title,

            "description": `Technical case study demonstrating the integration of ${usedMachine} with ${usedTractor} for professional grounds maintenance.`,

            "author": { "@id": "https://kerstenuk.com/#person" },

            "publisher": { "@id": "https://kerstenuk.com/#organization" },

            "mainEntityOfPage": { "@type": "WebPage", "@id": window.location.href },

            "about": [

                { "@type": "Thing", "name": usedTractor },

                { "@type": "Thing", "name": usedMachine }

            ]

        };

        performSchemaInjection(caseStudySchema);

    }



    /* --- [H] SERIES CAROUSEL ENGINE --- */

    const isSeriesPage = window.location.href.includes('series') || window.location.href.includes('range') || window.location.href.includes('attachments') || window.location.href.includes('sweepers') || window.location.href.includes('weedbrush');

    if (isSeriesPage) {

        const carouselItems = [];

        const productCards = document.querySelectorAll('.product-item, .product-card, .item-card, .shop-card');



        productCards.forEach((card, index) => {

            const linkElement = card.querySelector('a');

            const imgElement = card.querySelector('img');

            const titleElement = card.querySelector('.product-title, .item-title, h3, h4');



            if (linkElement && titleElement) {

                carouselItems.push({

                    "@type": "ListItem",

                    "position": index + 1,

                    "url": linkElement.href,

                    "name": titleElement.innerText.trim(),

                    "image": imgElement ? imgElement.src : "https://kerstenuk.com/files/kersten-logo.png"

                });

            }

        });



        if (carouselItems.length > 0) {

            const seriesName = document.querySelector('h1')?.innerText || "Kersten Machine Series";

            performSchemaInjection({

                "@context": "https://schema.org",

                "@type": "ItemList",

                "name": seriesName,

                "itemListOrder": "https://schema.org/ItemListOrderAscending",

                "numberOfItems": carouselItems.length,

                "itemListElement": carouselItems

            });

        }

    }



    /* --- [I] SERVICE & EVENTS ENGINE --- */

    if (window.location.href.includes('event') || window.location.href.includes('demo') || window.location.href.includes('show')) {

        const eventName = document.querySelector('h1') ? document.querySelector('h1').innerText : "";

        const eventDate = document.querySelector('.date, .event-date, time')?.innerText;

        const eventLoc = document.querySelector('.location, .venue, .address')?.innerText;



        if (eventName && eventDate) {

            performSchemaInjection({

                "@context": "https://schema.org",

                "@type": "Event",

                "name": eventName,

                "startDate": new Date().toISOString(),

                "eventStatus": "https://schema.org/EventScheduled",

                "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",

                "location": { "@type": "Place", "name": eventLoc || "Kersten UK Demo Site", "address": { "@type": "PostalAddress", "addressCountry": "GB" } },

                "organizer": { "@id": "https://kerstenuk.com/#organization" }

            });

        }

    }



    if (window.location.href.includes('training') || window.location.href.includes('lantra') || window.location.href.includes('course')) {

        performSchemaInjection({

            "@context": "https://schema.org",

            "@type": "Course",

            "name": document.querySelector('h1')?.innerText || "Integrated Weed Management Training",

            "description": (document.querySelector('meta[name="description"]') ? document.querySelector('meta[name="description"]').content : "") || "Lantra certified training for professional IWM.",

            "provider": { "@id": "https://kerstenuk.com/#organization" },

            "educationalCredentialAwarded": "Lantra Certificate of Competence"

        });

    }



  /* --- [N] INSTANT AUDIT PRINTER FUNCTION (Global Helper) --- */

    function addPrintButton(widgetID, type) {

        const resultBox = document.getElementById(widgetID + '-result');

        if (!resultBox) return;



        // Prevent Duplicate Buttons

        if (resultBox.querySelector('.kersten-print-btn')) return;



        const printBtn = document.createElement('button');

        printBtn.innerHTML = '🖨️ Print Official Compliance Card';

        printBtn.className = 'kersten-print-btn';

        printBtn.style.cssText = 'margin-top:10px; background:#fff; color:#004d26; border:1px solid #004d26; padding:8px 12px; border-radius:4px; cursor:pointer; font-size:12px; width:100%; font-weight:bold;';



        printBtn.onclick = function() {

            const dataToPrint = resultBox.innerHTML;

            const printWindow = window.open('', '', 'height=600,width=800');

            printWindow.document.write('<html><head><title>Kersten UK Compliance Audit</title>');

            printWindow.document.write('<style>body{font-family:sans-serif; color:#333; padding:40px;} .audit-box{border:2px solid #004d26; padding:30px; border-radius:10px;} h1{color:#004d26;} .footer{margin-top:50px; font-size:12px; color:#666; border-top:1px solid #ccc; padding-top:10px;}</style>');

            printWindow.document.write('</head><body>');

            printWindow.document.write('<div class="audit-box">');

            printWindow.document.write('<img src="https://kerstenuk.com/files/kersten-logo.png" style="width:150px; margin-bottom:20px;">');

            printWindow.document.write('<h1>' + (type === 'havs' ? 'HAVS Safety Audit' : 'NAP 2026 Reduction Audit') + '</h1>');

            printWindow.document.write('<p><strong>Date:</strong> ' + new Date().toLocaleDateString() + '</p>');

            printWindow.document.write('<hr style="border:0; border-top:1px solid #eee; margin:20px 0;">');

            printWindow.document.write(dataToPrint);

            printWindow.document.write('<div style="margin-top:30px; background:#f9f9f9; padding:15px; border-left:4px solid #ffcc00;"><strong>Next Step:</strong> This is a preliminary calculation. For a full certified strategy review, please contact Kersten UK.</div>');

            printWindow.document.write('</div>');

            printWindow.document.write('<div class="footer">Generated by Kersten Authority Engine | kerstenuk.com | 0118 986 9253</div>');

            printWindow.document.write('</body></html>');

            printWindow.document.close();

            printWindow.print();

        };

        resultBox.appendChild(printBtn);

    }



    /* --- DELAYED INTELLIGENCE BLOCK (Data Scrapers & Master Entity Weld) --- */

    /* This waits 4.0s for ERPNext to stabilize, then scrapes and injects */

    setTimeout(function() {

        updateCTAByPrice();

        adjustForMobile();



        // 6. QUANTITATIVE MACHINE SPECIFICATION & LOGISTICS ENGINE (v123.0)

        let machineQuantitativeSpecs = [];

        let specificMachineWeightKg = 0;

        let machineWidthCm = 0;

        let machineNoiseLevelDb = 0;

        let generatedFaqs = [];



        const technicalTableRows = document.querySelectorAll('table tr, .specification-row, .product-spec-item, .tech-data-row');

        technicalTableRows.forEach(function(row) {

            if (row.cells && row.cells.length >= 2) {

                let technicalKeyName = row.cells[0].innerText.replace(':', '').trim();

                let technicalValueData = row.cells[1].innerText.trim();

                let lowerKey = technicalKeyName.toLowerCase();

                let lowerVal = technicalValueData.toLowerCase();

                let cleanPageName = currentDocumentTitle.split('|')[0].trim();



                // --- DATA EXTRACTION & NORMALIZATION ---

                let numMatch = technicalValueData.match(/(\d+(\.\d+)?)/);

                let rawNum = numMatch ? parseFloat(numMatch[0]) : 0;



                if (lowerKey.includes('vibration')) {

                    generatedFaqs.push({ "@type": "Question", "name": `What is the HAVS vibration level for the ${cleanPageName}?`, "acceptedAnswer": { "@type": "Answer", "text": `The ${cleanPageName} features a recorded HAVS vibration level of ${technicalValueData}, designed for safe, long-duration commercial operation.` } });

                }



                if (lowerKey.includes('weight') || lowerKey.includes('operating mass')) {

                    specificMachineWeightKg = rawNum;

                    // Handle tonnes if applicable, though rare for compacts

                    if (lowerVal.includes('tonne') || lowerVal.includes('ton')) specificMachineWeightKg = rawNum * 1000;



                    generatedFaqs.push({ "@type": "Question", "name": `What is the operating weight of the ${cleanPageName}?`, "acceptedAnswer": { "@type": "Answer", "text": `The ${cleanPageName} has an operating weight of ${technicalValueData}.` } });

                }



                if (lowerKey.includes('noise') || lowerKey.includes('sound')) {

                    machineNoiseLevelDb = rawNum;

                    generatedFaqs.push({ "@type": "Question", "name": `What is the noise output of the ${cleanPageName}?`, "acceptedAnswer": { "@type": "Answer", "text": `The ${cleanPageName} operates at a noise level of ${technicalValueData}.` } });

                }



                if (lowerKey.includes('width') || lowerKey.includes('working')) {

                    // Normalize to CM for Logic Checks

                    if (lowerVal.includes('mm')) machineWidthCm = rawNum / 10;

                    else if (lowerVal.includes('cm')) machineWidthCm = rawNum;

                    else if (lowerVal.includes('m') && !lowerVal.includes('mm') && !lowerVal.includes('cm')) machineWidthCm = rawNum * 100;



                    generatedFaqs.push({ "@type": "Question", "name": `What is the working width of the ${cleanPageName}?`, "acceptedAnswer": { "@type": "Answer", "text": `The ${cleanPageName} offers a working width of ${technicalValueData}.` } });

                }



                // --- SCHEMA PROPERTY CREATION ---

                let technicalPropertyObj = { "@type": "PropertyValue", "name": technicalKeyName, "value": technicalValueData };

                if (numMatch && (lowerVal.includes('cm') || lowerVal.includes('mm') || lowerVal.includes('kg') || lowerVal.includes('db'))) {

                    let technicalUnitType = lowerVal.includes('cm') ? "CMT" : lowerVal.includes('mm') ? "MMT" : lowerVal.includes('kg') ? "KGM" : "DB";

                    technicalPropertyObj.valueReference = { "@type": "QuantitativeValue", "value": rawNum, "unitCode": technicalUnitType };

                }

                machineQuantitativeSpecs.push(technicalPropertyObj);

            }

        });







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




     /* --- [K] DYNAMIC HAVS SAFETY CHALLENGER (v124.1 - FIXED SCOPE) --- */

    let vibrationLevel = 0;



    // 1. Scan for Vibration Data in Tables

    document.querySelectorAll('table tr, .specification-row').forEach(row => {

        if (row.cells && row.cells.length >= 2) {

            const key = row.cells[0].innerText.toLowerCase();

            const val = row.cells[1].innerText.trim();

            if (key.includes('vibration') || key.includes('havs')) {

                const match = val.match(/(\d+(\.\d+)?)/);

                if (match) vibrationLevel = parseFloat(match[0]);

            }

        }

    });



    // 2. Build The "Challenger" Widget

    const specTable = document.querySelector('table, .product-specs, .specification-table');



   if (vibrationLevel > 0 && specTable) {
        // CHECK: If on blog, ask the controller
        if (window.location.href.includes('/blog')) {
            const ctx = window.kerstenBlogContextCache || window.getKerstenBlogContext();
            if (ctx.tool !== 'havs') return;
        }
        const kPoints = Math.round(Math.pow(vibrationLevel, 2) * 2);

        const kSafeHours = (100 / kPoints).toFixed(1);



        // FIXED: Use document.title directly to avoid "undefined variable" errors

        const machineName = document.title.split('|')[0].trim();



        // Determine Kersten Safety Badge

        let kColor = "#004d26"; let kBadge = "EXCELLENT";

        if (vibrationLevel > 2.5) { kColor = "#e67e22"; kBadge = "STANDARD"; }

        if (vibrationLevel > 5.0) { kColor = "#c0392b"; kBadge = "HIGH"; }



        // Create Unique ID to prevent conflicts

        const widgetID = 'havs-calc-' + Math.floor(Math.random() * 10000);



        const havsWidget = document.createElement('div');

        havsWidget.className = 'havs-compliance-widget';

        havsWidget.innerHTML = `

            <div style="background:#f9fbf9; border:1px solid #ddd; border-radius:12px; margin:30px 0; font-family:sans-serif; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.05); clear:both;">

                

                <div style="background:#f9f9f9; padding:15px 20px; border-bottom:1px solid #eee; display:flex; justify-content:space-between; align-items:center;">

                    <h4 style="margin:0; color:#004d26; font-weight:800; font-size:16px;">🖐 HAVS Safety Comparator</h4>

                    <span style="background:${kColor}; color:white; padding:4px 10px; border-radius:4px; font-size:11px; font-weight:bold;">${kBadge} RATING</span>

                </div>



                <div style="padding:20px;">

                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">

                        <div>

                            <strong style="font-size:18px; color:#333;">This Machine</strong>

                            <div style="font-size:12px; color:#666;">Vibration: <strong>${vibrationLevel} m/s²</strong></div>

                        </div>

                        <div style="text-align:right;">

                            <div style="font-size:24px; font-weight:900; color:${kColor};">${kSafeHours} <span style="font-size:14px; font-weight:normal;">Safe Hours</span></div>

                            <div style="font-size:11px; color:#888;">Time to EAV (100 pts)</div>

                        </div>

                    </div>



                    <div style="background:#f0f7f4; padding:15px; border-radius:8px; border:1px dashed #004d26;">

                        <label for="${widgetID}-input" style="display:block; font-size:13px; font-weight:bold; color:#004d26; margin-bottom:8px;">Compare vs. Your Current Machine:</label>

                        

                        <div style="display:block;">

                            <input type="number" id="${widgetID}-input" placeholder="Enter Vibration (e.g. 5.0)" aria-label="Enter your machine's vibration level" style="width:100%; box-sizing:border-box; padding:10px; border:1px solid #ccc; border-radius:4px; margin-bottom:10px;">

                            

                            <button id="${widgetID}-btn" style="width:100%; background:#004d26; color:white; border:none; padding:12px; border-radius:4px; font-weight:bold; cursor:pointer;">

                                Calculate Safety Gap

                            </button>

                        </div>



                        <div id="${widgetID}-result" role="status" aria-live="polite" style="margin-top:15px; display:none; border-top:1px solid #ddd; padding-top:10px;"></div>

                    </div>

                </div>

                

                <div style="background:#f9f9f9; padding:10px 20px; text-align:right; font-size:11px; color:#999;">

                    Calculated using HSE Points System (p = v² * t * 2)

                </div>

            </div>

        `;



        // Insert Widget

        specTable.parentNode.insertBefore(havsWidget, specTable.nextSibling);

        posthog.capture('havs_widget_shown', {
    machine_name: machineName,
    vibration_level: vibrationLevel,
    kersten_safe_hours: parseFloat(kSafeHours),
    rating: kBadge
});



        // Add Logic Listener

        setTimeout(() => {

            const btn = document.getElementById(widgetID + '-btn');

            if(btn) {

                btn.onclick = function(e) {

                    e.preventDefault(); // Stop any form submit



                    const inputVal = document.getElementById(widgetID + '-input').value;

                    const userVib = parseFloat(inputVal);



                    if (!userVib || userVib <= 0) {

                        alert("Please enter a valid vibration number (e.g. 5.0)");

                        return;

                    }



                    const userPoints = Math.round(Math.pow(userVib, 2) * 2);

                    const userHours = (100 / userPoints).toFixed(1);



                    // Logic check to handle low vibration numbers (avoiding infinity)

                    const validUserHours = userPoints === 0 ? "8.0+" : userHours;



                    let resultHTML = '';

                    let hoursDiff = 0;



                    if (parseFloat(kSafeHours) > parseFloat(userHours)) {

                        hoursDiff = (kSafeHours - userHours).toFixed(1);

                        resultHTML = `

                            <div style="color:#004d26; margin-bottom:15px;">

                                <strong style="display:block; font-size:16px;">✅ Safety Upgrade</strong>

                                Your current machine is safe for only <strong>${validUserHours} hours</strong>.

                                <br>Switching to Kersten gives you <strong style="background:#d4edda; padding:0 4px;">+${hoursDiff} extra hours</strong> of safe trigger time every day.

                            </div>

                        `;

                    } else {

                        resultHTML = `

                            <div style="color:#555; margin-bottom:15px;">

                                <strong>Comparison Result:</strong><br>

                                Your machine: ${validUserHours} hours vs. Kersten: ${kSafeHours} hours.<br>

                            </div>

                        `;

                    }



                    // Build Inquiry Message

                    const inquiryMessage = `HAVS SAFETY INQUIRY:\n\nMachine: ${machineName}\n\nCOMPARISON DATA:\n- My Current Machine: ${userVib} m/s² (${validUserHours} safe hours)\n- Kersten Machine: ${vibrationLevel} m/s² (${kSafeHours} safe hours)\n- Potential Gain: +${hoursDiff} Safe Hours/Day\n\nPlease provide a quote for this compliant solution.`;



                    // Append Quote Button

                    resultHTML += `

                        <a href="/Contact-us-2?message=${encodeURIComponent(inquiryMessage)}" style="display:block; background:#E44D2E; color:white; text-align:center; padding:12px; border-radius:6px; text-decoration:none; font-weight:bold; font-size:14px; box-shadow:0 4px 6px rgba(0,0,0,0.1);">

                            ✉ Request Verified Quote

                        </a>

                    `;



                    const resultBox = document.getElementById(widgetID + '-result');

                    if(resultBox) {

                        posthog.capture('havs_widget_calculated', {
    machine_name: machineName,
    kersten_vibration: vibrationLevel,
    kersten_safe_hours: parseFloat(kSafeHours),
    user_vibration: userVib,
    user_safe_hours: parseFloat(validUserHours),
    hours_gained: parseFloat(hoursDiff),
    outcome: parseFloat(kSafeHours) > parseFloat(userHours) ? 'safety_upgrade' : 'neutral'
});

                        resultBox.innerHTML = resultHTML;

                        resultBox.style.display = 'block';

                        const quoteLink = resultBox.querySelector('a[href*="Contact-us-2"]');
if (quoteLink) {
    quoteLink.addEventListener('click', function() {
        posthog.capture('havs_quote_requested', {
            machine_name: machineName,
            kersten_vibration: vibrationLevel,
            user_vibration: userVib,
            hours_gained: parseFloat(hoursDiff)
        });
    });
}

                    }



                    // Trigger Print Button (if function exists)

                    if (typeof addPrintButton === "function") {

                        addPrintButton(widgetID, 'havs');

                    }

                };

            }

        }, 500); // Small delay to ensure DOM insertion

    }









        // 7. ADVANCED PRICE ENGINE

        let masterCleanPriceValue = "0.00";

        const technicalPriceElem = document.querySelector('[itemprop="price"], .product-price, .item-price, .price, [data-value]');

        if (technicalPriceElem) {

            masterCleanPriceValue = (technicalPriceElem.getAttribute('content') || technicalPriceElem.innerText).split('/')[0].replace(/,/g, '').replace(/[^\d.]/g, '');

        }



        // SHIPPING & RETURN LOGIC

        let commercialShippingType = (specificMachineWeightKg > 35 || lowerBodyText.includes("tractor") || lowerBodyText.includes("hydraulic") || lowerBodyText.includes("3-point")) ? "Specialist Freight" : "Professional Parcel";

        let technicalDeliveryTime = commercialShippingType === "Specialist Freight" ? { min: 3, max: 7 } : { min: 2, max: 5 };



        // 8. MASTER UNIFIED PRODUCT SCHEMA (Including v100 Brand Shield)

        const masterUnifiedProductSchema = {

            "@context": "https://schema.org",

            "@type": "Product",

            "@id": "https://kerstenuk.com/#product",

            "name": currentDocumentTitle.split('|')[0].trim(),

            "url": window.location.href,

            // UPDATED (v100 Feature): GREY MARKET BRAND SHIELD

            "brand": {

                "@type": "Brand",

                "name": "Kersten / Zasso",

                "description": "Factory-Authorized UK Distribution & Warranty Centre"

            },

            "sku": window.location.pathname.split('/').pop(),

            "image": document.querySelector('img[itemprop="image"]')?.src || document.querySelector('meta[property="og:image"]')?.content || document.querySelector('.main-image img')?.src || document.querySelector('.product-image img')?.src,

            "description": (document.querySelector('meta[name="description"]') ? document.querySelector('meta[name="description"]').content : "") || `Professional-grade technical specifications, authority documentation, and compliance data for the ${currentDocumentTitle.split('|')[0].trim()} groundcare machine series.`,

            "offers": {

                "@type": "Offer",

                "price": parseFloat(masterCleanPriceValue).toFixed(2),

                "priceCurrency": "GBP",

                "priceValidUntil": globalExpiryDate,

                "availability": "https://schema.org/InStock",

                "itemCondition": "https://schema.org/NewCondition",

                "url": window.location.href,

                "seller": { "@id": CORE_ORG_ID },

                "shippingDetails": {

                    "@type": "OfferShippingDetails",

                    "shippingRate": { "@type": "MonetaryAmount", "value": "0.00", "currency": "GBP" },

                    "deliveryTime": {

                        "@type": "ShippingDeliveryTime",

                        "handlingTime": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 3, "unitCode": "d" },

                        "transitTime": { "@type": "QuantitativeValue", "minValue": technicalDeliveryTime.min, "maxValue": technicalDeliveryTime.max, "unitCode": "d" }

                    },

                    "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "GB" }

                },

                "hasMerchantReturnPolicy": {

                    "@type": "MerchantReturnPolicy",

                    "applicableCountry": "GB",

                    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnPeriod",

                    "merchantReturnDays": 14,

                    "returnMethod": "https://schema.org/ReturnByMail",

                    "returnFees": "https://schema.org/ReturnFeesCustomerPaying"

                }

            },

            "additionalProperty": machineQuantitativeSpecs

        };



// FINAL VIDEO INJECTION (v144.0 - CHANNEL SAFEGUARD)



        // 1. VIDEO KILLER: Destroy bad video schema coming from Channel Links (@KerstenUK)

        // This is critical: It finds elements marked as "VideoObject" that are just channel links and strips the tags.

        document.querySelectorAll('[itemprop="video"], [itemtype*="VideoObject"]').forEach(el => {

             if (el.innerHTML.includes('@KerstenUK') || (el.getAttribute('href') && el.getAttribute('href').includes('@KerstenUK'))) {

                 el.removeAttribute('itemprop');

                 el.removeAttribute('itemtype');

                 el.removeAttribute('itemscope');

             }

        });



        // 2. VIDEO FINDER: Look for real videos (Custom Player OR Standard Iframe)

        let ytElement = document.querySelector('.youtube-player div[data-id]');
let technicalYoutubeId = ytElement ? ytElement.dataset.id : null;



        if (!technicalYoutubeId) {

            // Fallback: Check for standard YouTube embeds

            const standardIframe = document.querySelector('iframe[src*="youtube.com/embed/"]');

            if (standardIframe) {

                // Robust extraction of ID

                technicalYoutubeId = standardIframe.src.split('embed/')[1].split('?')[0];

            }

        }



        // 3. INJECT VALID VIDEO SCHEMA (Only if a real ID was found)

        if (technicalYoutubeId) {

            masterUnifiedProductSchema.subjectOf = {

                "@type": "VideoObject",

                "name": `Technical Demo: ${currentDocumentTitle.split('|')[0].trim()}`,

                "description": `Operational demonstration and technical overview of the ${currentDocumentTitle.split('|')[0].trim()}.`,

                "uploadDate": new Date().toISOString(), // Required field fallback

                "thumbnailUrl": [

                    `https://i.ytimg.com/vi/${technicalYoutubeId}/maxresdefault.jpg`,

                    `https://i.ytimg.com/vi/${technicalYoutubeId}/hqdefault.jpg`

                ],

                "embedUrl": `https://www.youtube.com/embed/${technicalYoutubeId}`,

                "contentUrl": `https://www.youtube.com/watch?v=${technicalYoutubeId}`

            };

        }

}, 2500); // Main Shell Delay



/* ================================================================= */
/* [P-FINAL] INDESTRUCTIBLE REVIEW ENGINE (Footer-Locked Version)    */
/* ================================================================= */
(function() {
    console.log("Kersten Reviews: Module Initialized...");

    const runReviews = function() {
        // 1. Safety Check: Don't run on the Fitment Tool Embed page
        if (window.location.href.includes('fitment-tool-embed')) return;

        // 2. Prevent Duplicates
        if (document.querySelector('.kersten-review-board')) return;

        // 3. Define Library Locally (Scope Safe)
        const reviews = [
            { tag: "weed", stars: 5, user: "Matthew Powers", role: "Veolia UK", text: "The machine would pay for itself in just 81 miles. Operators reported the effort needed was much less using the Kersten UBS 16 than by hand." },
            { tag: "weed", stars: 5, user: "Scott Coughlan", role: "Newport City Council", text: "We are really happy with our K820. It has reduced our reliance on chemical control. We purchased two more machines to stay ahead of restrictions." },
            { tag: "sweeper", stars: 5, user: "Cormac Operations", role: "Civil Engineering", text: "The Kersten sweeper proved highly effective in removing moss and debris from pavement edges. Critical for maintaining safe walkways." },
            { tag: "sweeper", stars: 5, user: "John", role: "Tyne Valley Garden Centre", text: "We were spending up to 20 hours a week removing moss. I was so impressed with the demonstration, I needed the machine there and then." },
            { tag: "winter", stars: 5, user: "Pocklington Council", role: "Highways Team", text: "The best insurance policy we have ever subscribed to. The machine handled the snow clearance very well, keeping footpaths safe." },
            { tag: "winter", stars: 5, user: "Wayne Dawkins", role: "New Forest District Council", text: "Probably the best machine investment we have made in the last 5 years. The reliability of the Lehner spreaders is unmatched." },
            { tag: "all", stars: 5, user: "Ian Low", role: "Mitie Landscapes", text: "Fantastic bit of machinery. It maintained the artificial pitches in summer, cleared moss with the hard brush, and is now ready for snow." }
        ];

        // 4. Context Matching Logic
        const context = (document.title + " " + window.location.pathname).toLowerCase();
        let filterTag = "all";
        if (context.includes("weed") || context.includes("moss") || context.includes("ubs")) filterTag = "weed";
        else if (context.includes("sweeper") || context.includes("clean") || context.includes("fkm")) filterTag = "sweeper";
        else if (context.includes("snow") || context.includes("ice") || context.includes("winter")) filterTag = "winter";

        // 5. Select & Shuffle Reviews
        const selectedReviews = reviews
            .filter(r => r.tag === "all" || r.tag === filterTag)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        if (selectedReviews.length === 0) return;

        // 6. Build the UI
        const container = document.createElement('div');
        container.className = 'kersten-review-board';
        // Style adjusted to remove top margin so it sits flush if needed
        container.style.cssText = "margin: 0; padding: 60px 0; border-top: 1px solid #eee; background: #fff; width: 100%; display:block; clear:both; position: relative; z-index: 5;";

        container.innerHTML = `
            <div style="max-width: 1200px; margin: 0 auto; padding: 0 15px;">
                <div style="background:#f9f9f9; padding:30px; border-radius:10px; border:1px solid #e0e0e0;">
                    <h3 style="margin:0 0 25px 0; color:#004d26; font-size:22px; font-weight:800;">⭐ Verified Professional Feedback</h3>
                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:20px;">
                        ${selectedReviews.map(r => `
                            <div style="background:white; padding:20px; border-radius:8px; border:1px solid #eee; box-shadow:0 2px 5px rgba(0,0,0,0.02);">
                                <div style="color:#f39c12; margin-bottom:10px;">★★★★★</div>
                                <p style="font-size:14px; color:#555; font-style:italic; line-height:1.5; margin-bottom:15px;">"${r.text}"</p>
                                <div style="font-size:12px; font-weight:bold; color:#004d26;">${r.user}</div>
                                <div style="font-size:11px; color:#888; text-transform:uppercase;">${r.role}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        // 7. FOOTER-LOCKED PLACEMENT STRATEGY
        // We ignore the content and go straight for the footer tags.
        const footerTarget = document.querySelector('footer, .layout-footer, #footer, .footer-section');

        if (footerTarget) {
            // Insert BEFORE the footer starts
            footerTarget.parentNode.insertBefore(container, footerTarget);
            console.log("Kersten Reviews: Locked to Footer");
        } else {
            // Emergency Fallback: Append to body end
            document.body.appendChild(container);
            console.log("Kersten Reviews: Appended to Body");
        }
    };

    // Run immediately, then check again at 2s and 4s to ensure loading
    if (document.readyState === "complete" || document.readyState === "interactive") {
        runReviews();
    } else {
        document.addEventListener("DOMContentLoaded", runReviews);
    }
    setTimeout(runReviews, 2000);
    setTimeout(runReviews, 4000);

})();

  /* ================================================================= */

    /* [O] ORPHAN BRIDGE: PARENT MACHINE LINKER (v131.0 - BREAKOUT)      */

    /* ================================================================= */

    const injectParentMachineBridge = function() {

        const machineHubs = [

            { id: "k1500", keys: ["k1500", "k 1500", "1500 series"], url: "/kersten-k-series" },

            { id: "k2100", keys: ["k2100", "k 2100", "2100 series"], url: "/kersten-k-series" },

            { id: "ubs", keys: ["ubs", "hydro 9", "hydro 13", "hydro 16", "alpin"], url: "/Kersten-UBS-Series" },

            { id: "weedbrush", keys: ["weedbrush", "weed brush", "wkb", "weedo"], url: "/weed-brush" },

            { id: "sweeper", keys: ["sweeper", "km 45", "km 52", "fkm", "hkm", "collector"], url: "/sweepers" },

            { id: "snow", keys: ["snow", "plough", "spreader", "winter"], url: "/winter-equipment" },

            { id: "hycut", keys: ["hycut", "remote", "mower"], url: "/grass-cutting-equipment" },

            { id: "hoaf", keys: ["hoaf", "thermal", "burner"], url: "/hoaf-thermal-weed-control" },

            { id: "zasso", keys: ["zasso", "electric", "zap"], url: "/Zasso-weed-electrocution-equipment" },

            { id: "rippa", keys: ["ripagreen", "ripa", "lance"], url: "/Ripagreen-Thermal-Weed-Management-Kits" },

            { id: "matev", keys: ["matev", "trailer", "box"], url: "/search-by-manufacturer/matev-products" }

        ];



        const currentText = (document.title + " " + (document.querySelector('h1')?.innerText || "")).toLowerCase();

        const currentPath = window.location.pathname;



        const parentMatch = machineHubs.find(hub =>

            hub.keys.some(k => currentText.includes(k)) &&

            !currentPath.includes(hub.url) &&

            currentPath !== hub.url

        );



        if (parentMatch) {

            const isDeepPage = currentPath.split('/').length > 2 ||

                               currentText.includes('manual') ||

                               currentText.includes('parts') ||

                               currentText.includes('consumable') ||

                               currentText.includes('instruction');



            if (isDeepPage && !document.querySelector('.orphan-bridge-link')) {

                const bridgeDiv = document.createElement('div');

                bridgeDiv.className = 'orphan-bridge-link';



                // STYLE UPDATE: Force Full Width using "Breakout" technique

                bridgeDiv.style.cssText = "width: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; margin-top: 40px; margin-bottom: 20px; padding: 30px 0; background: #f0f7f4; border-top: 1px dashed #004d26; border-bottom: 1px dashed #004d26; font-family: sans-serif; text-align: center; clear: both; box-sizing: border-box;";



                bridgeDiv.innerHTML = `

                    <div style="max-width: 800px; margin: 0 auto; padding: 0 15px;">

                        <div style="font-weight:800; color:#004d26; margin-bottom:8px; font-size:14px; text-transform:uppercase; letter-spacing:1px;">

                            🚜 Machine Series Identified

                        </div>

                        <div style="font-size:14px; color:#555; margin-bottom:20px; line-height:1.5;">

                            This technical document belongs to the <strong>${parentMatch.keys[0].toUpperCase().replace('UBS', 'Kersten UBS').replace('K1500', 'Kersten K-Series')}</strong> range.

                        </div>

                        <a href="${parentMatch.url}" style="display:inline-block; background:#004d26; color:white; padding:10px 25px; border-radius:30px; text-decoration:none; font-weight:bold; font-size:13px; transition: all 0.2s;">

                            View Main Machine Series &rarr;

                        </a>

                    </div>

                `;



                // TARGETING FIX: Hunt for the FOOTER

                const footerTarget = document.querySelector('footer, .layout-footer, #footer, .footer-section');



                if (footerTarget) {

                    footerTarget.parentNode.insertBefore(bridgeDiv, footerTarget);

                } else {

                    document.body.appendChild(bridgeDiv);

                }



                console.log("Orphan Bridge: Linked " + currentPath + " to " + parentMatch.url);

            }

        }

    };



    // Trigger slightly later to ensure DOM is ready

    setTimeout(injectParentMachineBridge, 1500);




 /* --- [M] DYNAMIC FOOTER LINK INJECTOR (Site-Wide Authority Boost - 2 Rows) --- */
(function() {
    setTimeout(function() {
        // 1. Find the Main Container (Parent of the link rows)
        const footerContainer = document.querySelector('footer .footer-grouped-links');
        if (!footerContainer) return;

       // Remove previously injected footer rows so the latest link list is used
document
    .querySelectorAll(
        '.kersten-footer-seo-row, .kersten-footer-seo-row-hubs'
    )
    .forEach(function (row) {
        row.remove();
    });

        // SECTION 1: Fitment Guides (Cleanly distributed across categories)
        const priorityLinks = [
            // Kubota
            { text: "Kubota B1 / B2 Attachments", url: "/Attachments-for-Kubota-B-Series" },
            { text: "Kubota F-Series Attachments", url: "/Attachments-for-Kubota-F-Series" },
            { text: "Kubota BX Series Attachments", url: "/Attachments-for-Kubota-BX-Series" },
            // John Deere
            { text: "John Deere 1-Series Attachments", url: "/Attachments-for-John-Deere-1-Series" },
            { text: "John Deere X-Series Attachments", url: "/Attachments-for-John-Deere-X300-X500" },
            { text: "John Deere Gator Attachments", url: "/Attachments-for-John-Deere-Gator" },
            // Iseki
            { text: "Iseki SXG Attachments", url: "/Attachments-for-Iseki-SXG-323-326-Series" },
            { text: "Iseki TXGS Attachments", url: "/Attachments-for-Iseki-TXG-Series" },
            { text: "Iseki SF Series Attachments", url: "/Attachments-for-Iseki-SF-Series" },
            // Kioti & Solis
            { text: "Kioti CS Series Attachments", url: "/Attachments-for-Kioti-CS-Series" },
            { text: "Kioti CK Series Attachments", url: "/Attachments-for-Kioti-CK-Series" },
            { text: "Solis 20/26 Attachments", url: "/Compact-Tractor-Attachments-Page" }
        ];

        // SECTION 2: Highly Selective Technical Knowledge & Authority Hubs
        const authorityHubLinks = [
            // Compliance & Directives
            { text: "Weed Management 2026 Council Compliance", url: "/national-action-plan-2025-council-guide" },
            { text: "Integrated Weed Management for Amenity", url: "/integrated-weed-management-for-amenity" },
            { text: "Machine Supply Continuity", url: "/non-chemical-weed-control-supply-continuity" },
            { text: "Book: The Weeds Are Not the Problem", url: "/the-weeds-are-not-the-problem-book" },


            // Core Equipment Hubs
            { text: "Chemical-Free Weed Control Overview", url: "/search-by-applications/chemical-free-weed-control" },
            { text: "Hard Surface Weed Management", url: "/search-by-applications/detritus-types/weed-management" },
            { text: "Thermal Weed Management Hub", url: "/search-by-applications/Thermal-weed-management" },
            { text: "Mechanical Weed Removal Systems", url: "/Weed-Brushes-and-Mechanical-Weed-Removal" },

            // Machinery Classes
            { text: "Hot Water Weeding Machines", url: "/hot-water-weeders" },
            { text: "Hot Air Weeding Machines", url: "/hoaf-thermal-weed-control" },
            { text: "Electric Weeding Machines", url: "/electric-weeders" },
            { text: "Weed Brushes & Sweepers", url: "/weed-brush" },
            { text: "Gravel Path Renovators", url: "/gravel-path-renovator-series" },
            { text: "Kersten Machinery Hire", url: "/kersten-machinery-hire" },

            // Top-Tier High Authority Insights (Curated Selection)
            { text: "The Bracknell Trial Research Data", url: "/blog/Sweeping,%20moss%20and%20weed%20control/bracknell-weed-management-research-update" },
            { text: "The Case for Integrated Weed Management", url: "/blog/Chemical%20Free%20Weed%20Control/why-we-you-need-to-consider-integrated-weed-management" },
            { text: "Learning from Europe's IWM Success", url: "/blog/Chemical%20Free%20Weed%20Control/the-uk-is-about-ten-years-behind-europe-in-weed-management" },
            { text: "Site Maintenance Equipment For All Seasons", url: "/Site-Maintenance-Equipment-for-All-Seasons" }
        ];

        // Shared link styling helper to guarantee high contrast and smooth hovering
        const buildLinkHtml = (links) => links.map(link => `
            <a href="${link.url}" style="color: #ddd; font-size: 13px; line-height: 1.4; text-decoration: none; display: flex; align-items: flex-start; transition: color 0.2s; padding: 2px 0;" onmouseover="this.style.color='#ffcc00'" onmouseout="this.style.color='#ddd'">
                <span style="color: #004d26; margin-right: 8px; font-size: 11px; transform: translateY(1px);">&#10148;</span>
                <span style="flex: 1;">${link.text}</span>
            </a>
        `).join('');

        // 3. Create Row 1: Fitment Guides (Responsive Grid Layout)
        const newRow1 = document.createElement('div');
        newRow1.className = "row kersten-footer-seo-row";
        newRow1.style.cssText = "margin-top: 35px; padding-top: 25px; border-top: 1px solid rgba(255,255,255,0.1); width: 100%;";
        newRow1.innerHTML = `
            <div class="col-12" style="width: 100%;">
                <h5 class="footer-group-label" style="color: #ffcc00 !important; font-size: 15px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 18px;">🚜 Popular Tractor Fitment Guides</h5>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px 20px; width: 100%;">
                    ${buildLinkHtml(priorityLinks)}
                </div>
            </div>
        `;

        // 4. Create Row 2: Authority Hubs & Insights (Responsive Grid Layout)
        const newRow2 = document.createElement('div');
        newRow2.className = "row kersten-footer-seo-row-hubs";
        newRow2.style.cssText = "margin-top: 25px; padding-top: 25px; border-top: 1px dashed rgba(255,255,255,0.1); width: 100%; margin-bottom: 15px;";
        newRow2.innerHTML = `
            <div class="col-12" style="width: 100%;">
                <h5 class="footer-group-label" style="color: #ffcc00 !important; font-size: 15px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 18px;">📚 Technical Knowledge & Authority Hubs</h5>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px 20px; width: 100%;">
                    ${buildLinkHtml(authorityHubLinks)}
                </div>
            </div>
        `;

        // 5. Safely inject into the footer DOM tree
        footerContainer.appendChild(newRow1);
        footerContainer.appendChild(newRow2);

        console.log("Kersten SEO: Multi-row fully responsive layout successfully injected.");
    }, 2000);
})();




}); // <--- FINAL CLOSING BRACKET OF THE FILE

