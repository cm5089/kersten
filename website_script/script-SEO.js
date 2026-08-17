/* --- DYNAMIC SITEMAP INJECTOR --- */
if (window.location.pathname.replace(/\/$/, "") === '/sitemap') {
    const runDeepDiscoverySitemap = async function() {
        console.log("Kersten Authority Engine: Initiating Multi-Archive Deep Scan...");
        let foundLinks = Array.from(document.querySelectorAll('a')).map(function(a) { return a.href; }).filter(function(href) { return href.includes('kerstenuk.com') && !href.includes('#') && !href.includes('sitemap'); }).map(function(href) { return href.split('kerstenuk.com')[1]; });
        const archives = ['/blog', '/products', '/sweepers', '/weedbrush', '/Thermal-weed-control', '/winter-equipment', '/attachments', '/spare-parts', '/professional-weed-removal-equipment', '/pesticide-free-weed-control', '/surface-maintenance-machinery', '/path-and-pavement-cleaning-equipment', '/kersten-k-series-attachments', '/kersten-hy-series-attachments', '/pesticide-free-solutions'];
        try {
            await Promise.all(archives.map(async function(url) {
                const resp = await fetch(url).then(function(res) { return res.text(); });
                const doc = new DOMParser().parseFromString(resp, 'text/html');
                const deepLinks = Array.from(doc.querySelectorAll('a')).map(function(a) { return a.getAttribute('href'); }).filter(function(p) { return p && p.startsWith('/') && !p.includes('#') && p.length > 2; });
                foundLinks = foundLinks.concat(deepLinks);
                console.log("Discovery: Scanned archive node [" + url + "]");
            }));
        } catch(e) { console.log("Discovery Alert: Some secure archive nodes were skipped."); }
        const finalAuthorityPaths = [...new Set(foundLinks)].filter(function(p) { return p && p !== '/' && p.length > 1; }).sort();
        let sitemapHTML = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 80px; max-width: 1200px; margin: auto; background: #fff; line-height: 1.8; color: #333;">
                <h1 style="color: #004d26; border-bottom: 6px solid #ffcc00; padding-bottom: 25px; margin-bottom: 40px; font-size: 38px; font-weight: 900; letter-spacing: -1px;">Kersten UK - Global Authority Index (2025/26)</h1>
                <div style="background: #f9f9f9; padding: 35px; border-radius: 15px; margin-bottom: 55px; border-left: 12px solid #004d26; box-shadow: 0 15px 35px rgba(0,0,0,0.06);">
                    <p style="margin: 0; font-weight: 800; font-size: 22px; color: #004d26; text-transform: uppercase; letter-spacing: 1px;">Discovery Status: <span style="color: #333;">Multi-Archive Scan Complete</span></p>
                    <p style="margin: 15px 0 0 0; font-size: 18px; color: #555;">Technical Authority Records Located: <strong>${finalAuthorityPaths.length}</strong> Unique Endpoints<br>Index Scope: Commercial Inventory, UK Government Compliance Bridges, HAVS Documentation, and IWM Standards.</p>
                </div>
                <ul style="list-style: none; padding: 0; display: grid; grid-template-columns: 1fr; gap: 15px;">
                    ${finalAuthorityPaths.map(function(path) { return `<li style="padding: 20px; background: #fff; border-radius: 10px; border: 1px solid #eee; box-shadow: 0 4px 6px rgba(0,0,0,0.02); transition: all 0.3s ease;"><span style="color: #ffcc00; margin-right: 18px; font-weight: 900; font-size: 24px;">➔</span><a href="https://kerstenuk.com${path}" style="text-decoration: none; color: #004d26; font-weight: 700; font-size: 17px;">https://kerstenuk.com${path}</a></li>`; }).join('')}
                </ul>
            </div>`;
        document.body.innerHTML = sitemapHTML;
    };
    runDeepDiscoverySitemap();
    setTimeout(runDeepDiscoverySitemap, 5000);
}

// FRAPPE READY - everything after this was in a Frappe ready function

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