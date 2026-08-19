// Move remainder to SEO script


/* FRAPPE READY */

/* --- DELAYED INTELLIGENCE BLOCK (Data Scrapers & Master Entity Weld) --- */
/* This waits 4.0s for ERPNext to stabilize, then scrapes and injects */
setTimeout(function () {
    updateCTAByPrice();
    adjustForMobile();

    // 6. QUANTITATIVE MACHINE SPECIFICATION & LOGISTICS ENGINE (v123.0)
    let machineQuantitativeSpecs = [];
    let specificMachineWeightKg = 0;
    let machineWidthCm = 0;
    let machineNoiseLevelDb = 0;
    let generatedFaqs = [];

    const technicalTableRows = document.querySelectorAll('table tr, .specification-row, .product-spec-item, .tech-data-row');
    technicalTableRows.forEach(function (row) {
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




}, 2500); // Main Shell Delay