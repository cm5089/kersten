 // Replace with button to page in template



 /* --- [M] DYNAMIC LOCAL DEALER WIDGET (Compact Button Version) --- */
const injectDealerWidget = function() {
    // EXCLUSION: Never run on cart, checkout, or desk pages
    const _path = window.location.pathname;
    if (_path.includes('/cart') || _path.includes('/checkout') || window.location.href.includes('/desk')) return false;

    // 1. Identify Target
    const productAnchor = document.querySelector('.product-price, .cart-btn, [itemprop="offers"], .item-price');

    // Safety: If not found, return false so we can retry
    if (!productAnchor) return false;

    // Check if widget already exists to prevent duplicates
    if (document.querySelector('.kersten-dealer-locator')) return true;

    // 2. Create Compact Button Container
    const dealerWidget = document.createElement('div');
    dealerWidget.className = 'kersten-dealer-locator';

    // Adjusted styling to take up less vertical space (removed the min-height requirement)
    dealerWidget.style.cssText = "margin: 20px 0; clear: both; display: block;";

    dealerWidget.innerHTML = `
        <a href="https://kerstenuk.com/Kersten-Stocking-Dealers-Hire-Partners-and-Contractors" 
           style="display: block; background: #004d26; color: #fff; text-align: center; padding: 16px 20px; border-radius: 8px; text-decoration: none; font-weight: 800; font-size: 15px; font-family: sans-serif; box-shadow: 0 4px 10px rgba(0, 77, 38, 0.2); transition: transform 0.2s ease, box-shadow 0.2s ease;"
           onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 15px rgba(0, 77, 38, 0.3)';"
           onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 10px rgba(0, 77, 38, 0.2)';">
            📍 Find a Local Stocking Dealer or Hire Partner &rarr;
        </a>
    `;

    // 3. Insert Button
    productAnchor.parentNode.insertBefore(dealerWidget, productAnchor.nextSibling);
    return true; // Success
};

// RETRY LOGIC: Try at 1s, 2s, 3s, and 5s to catch slow ERPNext page loads
[1000, 2000, 3000, 5000].forEach(delay => setTimeout(injectDealerWidget, delay));