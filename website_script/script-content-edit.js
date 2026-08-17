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



/** FRAPPE READY:  everything after this was put in frappe ready */

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