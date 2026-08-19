// Product pages - only at bottom

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