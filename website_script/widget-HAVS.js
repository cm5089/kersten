// Product Page - certain ones - under specification table

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

        if (btn) {

            btn.onclick = function (e) {

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

                if (resultBox) {

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
                        quoteLink.addEventListener('click', function () {
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