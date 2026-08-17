
// REMOVE: deprectaed and removed from Chrome - won't do anything and increases server load unnecessarily when we aim to improve page speed anyway
/** 1. PERFORMANCE & SPECULATIVE LOADING **/
const kerstenPreloads = ['https://kerstenuk.com/contact-us-pesticide-free-plan', 'https://kerstenuk.com/sean-faulkner---surface-maintenance-and-integrated-weed-management-specialist', 'https://kerstenuk.com/weedbrush', 'https://kerstenuk.com/Thermal-weed-control', 'https://kerstenuk.com/sweepers', 'https://kerstenuk.com/winter-equipment', '/products', '/blog'];
kerstenPreloads.forEach(function(url) {
    const link = document.createElement('link');
    link.rel = 'prerender';
    link.href = url;
    document.head.appendChild(link);
});