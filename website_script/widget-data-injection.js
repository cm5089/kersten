    /* FRAPPE READY */


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



/* --- [D] TOPIC SILO BRIDGES (v126.9 - SINGLE BOX / NO BIO FIX) --- */

if (!document.querySelector('.silo-bridge')) {

    if (window.location.href.includes('fitment-tool-embed')) return; // STOP if embed



    // We only keep the Pesticide Strategy link here

    const mappingAuthoritySilos = [

        { key: "weed", link: "https://kerstenuk.com/contact-us-pesticide-free-plan", text: "Download the 2026 Municipal Pesticide-Free Transition Strategy" }

    ];



    const productCol = document.querySelector('.product-details, .web-page-content');

    const reviewsArea = document.querySelector('#product-reviews, .product-reviews');



    // Only run if we aren't already on the Pesticide Plan page

    if (productCol && !window.location.href.includes('contact-us-pesticide-free-plan')) {

        mappingAuthoritySilos.forEach(function(mapping) {

            if (lowerBodyText.includes(mapping.key)) {

                const expertBridgeDiv = document.createElement('div');

                expertBridgeDiv.className = 'silo-bridge';

                expertBridgeDiv.innerHTML = `

                    <div style="background:#f9fbf9; padding:35px; border:1px solid #eee; border-left:12px solid #004d26; margin:60px 0; font-style:italic; border-radius: 0 15px 15px 0; box-shadow: 0 15px 35px rgba(0,0,0,0.05); clear: both; width: 100%; box-sizing: border-box;">

                        <p style="margin:0; font-size:18px; line-height:1.7; color:#333; font-family:sans-serif;">

                            <strong style="color:#004d26; text-transform:uppercase; display:block; margin-bottom:10px; font-size:14px; letter-spacing:1px; font-weight:900;">Technical Authority Guidance</strong> 

                            ${mapping.text} 

                            <a href="${mapping.link}" style="color:#004d26; text-decoration:underline; font-weight:900; margin-left:10px; white-space:nowrap;">Access Authority Document &rarr;</a>

                        </p>

                    </div>`;



                if (reviewsArea) {

                    reviewsArea.parentNode.insertBefore(expertBridgeDiv, reviewsArea);

                } else {

                    productCol.appendChild(expertBridgeDiv);

                }

            }

        });

    }

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







      /* --- [D] UNIFIED FAQ ENGINE (v101.0 - Safety Patched) --- */

        const onPageFaqs = [];

        // SAFETY 1: Ignore common non-FAQ headers (like footer links)

        const ignoredQuestions = ["contact", "newsletter", "subscribe", "follow us", "need help", "search"];



        document.querySelectorAll('h3, h4, h5').forEach(header => {

            const question = header.innerText.trim();

            const lowerQ = question.toLowerCase();



            // SAFETY 2: Only grab headers that are actual questions AND not in our ignore list

            if (question.includes('?') && !ignoredQuestions.some(k => lowerQ.includes(k))) {

                const answerElement = header.nextElementSibling;



                // SAFETY 3: Verify the answer actually has text (prevents "Invalid" error)

                if (answerElement && answerElement.innerText) {

                    const answerText = answerElement.innerText.trim();

                    if (answerText.length > 15) { // Must be at least 15 chars to be a valid answer

                        onPageFaqs.push({

                            "@type": "Question",

                            "name": question,

                            "acceptedAnswer": { "@type": "Answer", "text": answerText }

                        });

                    }

                }

            }

        });



        // 2. Merge Generated Spec FAQs with On-Page FAQs

        // SAFETY 4: Filter out any machine-generated FAQs that might have failed to capture data

        const validGeneratedFaqs = (typeof generatedFaqs !== 'undefined' ? generatedFaqs : []).filter(f =>

            f.acceptedAnswer &&

            f.acceptedAnswer.text &&

            f.acceptedAnswer.text.length > 5 &&

            !f.acceptedAnswer.text.includes("undefined")

        );



        const finalFaqList = [...validGeneratedFaqs, ...onPageFaqs];



        // 3. Inject ONE Unified FAQ Schema

        if (finalFaqList.length > 0) {

            // Check if an FAQ schema already exists to avoid the "2 Items" duplicate error

            const existingFaq = document.querySelector('script[type="application/ld+json"]');

            if (!existingFaq || !existingFaq.innerText.includes("FAQPage")) {

                performSchemaInjection({

                    "@context": "https://schema.org",

                    "@type": "FAQPage",

                    "mainEntity": finalFaqList

                });

                console.log(`Authority Engine: Injected ${finalFaqList.length} Total FAQs (Validated).`);

            }

        }

 /** --- [SPEC ICON MAPPER & DATA HARVESTER] (v126.0) --- **/
function executeProfessionalIconMapping() {

    const technicalIconMap = {
        // Weight & Mass
        "weight": "fitness_center", "kg": "fitness_center", "mass": "fitness_center",

        // Safety & Sound
        "vibration": "vibration", "havs": "vibration", "noise": "volume_up", "db": "volume_up", "sound": "volume_up",

       // Physical Measurements
        "width": "straighten", "clearing": "straighten", "diameter": "swap_horizontal_circle", "ø": "swap_horizontal_circle",
        "height": "height", "length": "square_foot", "dimension": "aspect_ratio", "footprint": "layers",

        // Performance & Engine
        "engine": "settings", "motor": "settings", "speed": "speed", "rpm": "speed", "hp": "bolt", "power": "bolt",

        // Hydraulics, Pressure & Fuel
        "pressure": "compress", "bar": "compress", "flow": "water_drop", "oil": "opacity", "fuel": "local_gas_station",

        // Capacities & Volume
        "capacity": "layers", "volume": "layers", "hopper": "layers", "litre": "layers",

        // Mechanical Components
        "attachment": "extension", "drive": "sync_alt", "transmission": "sync_alt", "hitch": "link", "bracket": "build",
        "slope": "terrain", "gradient": "terrain"
    };

    // Variables to store data for Google and Logistics Bar
    let machineQuantitativeSpecs = [];
    let weightKg = 0;
    let widthCm = 0;
    let noiseDb = 0;

    const specificationTableRows = document.querySelectorAll('table tr, .specification-row, .frappe-table tr');

    specificationTableRows.forEach(function(row) {

        if (row.cells && row.cells.length >= 2) {

            let key = row.cells[0].innerText.trim();

            let val = row.cells[1].innerText.trim();

            let lowerKey = key.toLowerCase();

            let lowerVal = val.toLowerCase();



            // 1. ADD ICONS (Your existing capability)

            if (!row.querySelector('.material-icons')) {

                for (let keyword in technicalIconMap) {

                    if (lowerKey.includes(keyword)) {

                        row.cells[0].style.display = "flex";

                        row.cells[0].style.alignItems = "center";

                        row.cells[0].innerHTML = `<span class="material-icons" style="font-size:26px; color:#004d26; vertical-align:middle; margin-right:15px; min-width:32px;">${technicalIconMap[keyword]}</span>` + row.cells[0].innerHTML;

                        break;

                    }

                }

            }



            // 2. HARVEST DATA (For Google and Logistics Bar)

            let numMatch = val.match(/(\d+(\.\d+)?)/);

            let rawNum = numMatch ? parseFloat(numMatch[0]) : 0;



            if (lowerKey.includes('weight')) weightKg = lowerVal.includes('ton') ? rawNum * 1000 : rawNum;

            if (lowerKey.includes('width')) widthCm = lowerVal.includes('mm') ? rawNum/10 : (lowerVal.includes('m') && !lowerVal.includes('cm') ? rawNum*100 : rawNum);

            if (lowerKey.includes('noise') || lowerKey.includes('db')) noiseDb = rawNum;



            // Prepare for Google Schema

            machineQuantitativeSpecs.push({ "@type": "PropertyValue", "name": key, "value": val });

        }

    });



    // 3. INJECT LOGISTICS BAR (Lower Page)

    if ((weightKg > 0 || widthCm > 0) && !document.querySelector('.logistics-bar')) {

        let logTarget = document.querySelector('table, .specification-table, .havs-compliance-widget');

        if (logTarget) {

            let badges = [];

            if (weightKg > 0 && weightKg < 750) badges.push(`🚗 Easy Tow (<750kg)`);

            else if (weightKg > 0) badges.push(`🚛 Trailer Required`);

            if (widthCm > 0 && widthCm < 100) badges.push(`🚪 Fits Single Gates`);

            if (noiseDb > 0 && noiseDb < 85) badges.push(`🔇 Urban Quiet`);



            const logBar = document.createElement('div');

            logBar.className = 'logistics-bar';

            logBar.style.cssText = "margin: 30px 0; clear: both; border-top: 1px solid #eee; padding-top: 20px;";

            logBar.innerHTML = `<p style="margin: 0 0 12px 0; font-size: 13px; font-weight: 800; color: #004d26; text-transform: uppercase;">Logistics Summary:</p>

                <div style="display:flex; flex-wrap:wrap; gap:12px;">

                ${badges.map(b => `<div style="background:#fff; border:2px solid #004d26; color:#004d26; padding:10px 18px; border-radius:30px; font-size:14px; font-weight:700; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">${b}</div>`).join('')}

                </div>`;

            logTarget.parentNode.insertBefore(logBar, logTarget);

        }

    }





}



   // Trigger the Logistics Bar and Icons multiple times to ensure they catch the data

    setTimeout(injectLogisticsBar, 2000);

    setTimeout(injectLogisticsBar, 4000);



    setTimeout(executeProfessionalIconMapping, 2500);

    setTimeout(executeProfessionalIconMapping, 4500);



}, 2500); // Main Shell Delay