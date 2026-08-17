/* --- [0] GLOBAL UTILITIES & COMPACT STYLING (Safe-Wrapped) --- */
(function() {
    if (!document.getElementById('kersten-master-styles')) {
        const stylePatch = document.createElement('style');
        stylePatch.id = 'kersten-master-styles';
        stylePatch.innerHTML = `
            html {
                overflow-x: hidden;
            }

            /* WIDEN ERPNEXT NAVBAR */
            header.navbar .container, 
            .navbar .container, 
            .web-header .container {
                max-width: 95% !important; 
                width: 100% !important;
            }

            @media (max-width: 768px) {
                .web-footer {
                    overflow-x: hidden;
                }
                .web-footer .row {
                    margin-left: 0 !important;
                    margin-right: 0 !important;
                }
            }

            img { height: auto; max-width: 100%; aspect-ratio: attr(width) / attr(height); }
            
            /* WIDGET COMPACT STYLING (Fixes Vertical Stretch) */
            .havs-compliance-widget, .pesticide-load-widget, .logistics-bar, #kersten-veto-table, #iwm-science-table { 
                color: #222 !important; 
                font-family: sans-serif; 
                height: auto !important; 
                min-height: 0 !important; 
                max-width: 850px !important;
                margin: 30px auto !important;
                display: block !important;
                clear: both !important;
            }
            
            /* TIGHTER TABLE CELLS */
            #kersten-veto-table td, #kersten-veto-table th, #iwm-science-table td, #iwm-science-table th {
                padding: 10px 12px !important;
                border-left: 1px solid #eee;
            }

            /* PLAYER & UTILS */
            .youtube-player { position: relative; cursor: pointer; display: block; overflow: hidden; background: #000; }
            .youtube-player img { opacity: 0.8; transition: opacity 0.2s; width: 100%; display: block; }
            .youtube-player:hover img { opacity: 1; }
            .play { position: absolute; top: 50%; left: 50%; width: 68px; height: 48px; background-color: #FF0000; border-radius: 12px; transform: translate(-50%, -50%); z-index: 10; opacity: 0.9; transition: all 0.2s; }
            .play:hover { opacity: 1; background-color: #CC0000; }
            .play:before { content: ""; position: absolute; top: 50%; left: 55%; transform: translate(-50%, -50%); border-style: solid; border-width: 10px 0 10px 18px; border-color: transparent transparent transparent #FFFFFF; }
            .kersten-dealer-locator { min-height: 165px; display: block; clear: both; margin: 30px 0; }
        `;

        document.head.appendChild(stylePatch);
    }



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

/** 0. UI STABILIZER & WIDGET STYLING **/
const stylePatch = document.createElement('style');
stylePatch.innerHTML = `
    img { height: auto; max-width: 100%; aspect-ratio: attr(width) / attr(height); }
    .havs-compliance-widget, .pesticide-load-widget, .logistics-bar { color: #222 !important; font-family: sans-serif; }
    .youtube-player { position: relative; cursor: pointer; display: block; overflow: hidden; background: #000; }
    .youtube-player img { opacity: 0.8; transition: opacity 0.2s; width: 100%; display: block; }
    .youtube-player:hover img { opacity: 1; }
    .play { position: absolute; top: 50%; left: 50%; width: 68px; height: 48px; background-color: #FF0000; border-radius: 12px; transform: translate(-50%, -50%); z-index: 10; opacity: 0.9; transition: all 0.2s; }
    .play:hover { opacity: 1; background-color: #CC0000; }
    .play:before { content: ""; position: absolute; top: 50%; left: 55%; transform: translate(-50%, -50%); border-style: solid; border-width: 10px 0 10px 18px; border-color: transparent transparent transparent #FFFFFF; }
    .kersten-dealer-locator { min-height: 165px; display: block; clear: both; margin: 30px 0; }
    .logistics-bar { min-height: 90px; display: block; clear: both; margin: 40px 0 15px 0; }
    .havs-compliance-widget { min-height: 280px; display: block; clear: both; margin: 30px 0; }
    .pesticide-load-widget { min-height: 250px; display: block; clear: both; margin: 30px 0; }
    .kersten-fitment-wizard { min-height: 200px; display: block; clear: both; margin: 30px 0; }
`;
document.head.appendChild(stylePatch);