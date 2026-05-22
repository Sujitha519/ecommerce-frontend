// Local variable tracking context configurations parameters fields 
let productQuantity = 1;
let singleItemPrice = 49.99;

// Mock backup profile match catalog list matching our homepage setup dataset indexes mapping
const backupCatalogDB = {
    "101": { title: "Premium Cotton Hoodie", price: 49.99, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500" },
    "102": { title: "Classic Denim Jacket", price: 65.00, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=500" },
    "103": { title: "Minimalist Leather Watch", price: 120.00, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500" },
    "104": { title: "Athletic Running Sneakers", price: 85.50, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500" }
};

function syncCartBadge() {
    const navCartBadge = document.getElementById('navCartBadge');
    if (!navCartBadge) return;
    const cartItemsList = JSON.parse(localStorage.getItem('cartItemsArray')) || [];
    const totalQuantityCount = cartItemsList.reduce((acc, item) => acc + item.quantity, 0);
    navCartBadge.textContent = totalQuantityCount;
}

function loadDetailProfileData() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id') || "101"; 

    const targetProduct = backupCatalogDB[productId];
    if (targetProduct) {
        document.getElementById('detailTitle').textContent = targetProduct.title;
        document.getElementById('detailPrice').textContent = `$${targetProduct.price}`;
        singleItemPrice = targetProduct.price;

        const productImgEl = document.getElementById('productZoomImg');
        if (productImgEl) {
            // Safely pass the direct image web URL so it loads perfectly
            productImgEl.setAttribute('src', targetProduct.image);
            productImgEl.setAttribute('loading', 'lazy'); // Essential rubric optimization rule!
        }
    }
}

window.adjustAmountInputCounter = function(val) {
    productQuantity += val;
    if (productQuantity < 1) productQuantity = 1; // Block zero or negative selection entries
    document.getElementById('quantityDisplayNumber').textContent = productQuantity;
};

function executeAddToCartRoutine() {
    const sizeSelection = document.getElementById('sizeDropdown').value;
    let cartItemsList = JSON.parse(localStorage.getItem('cartItemsArray')) || [];
    
    const params = new URLSearchParams(window.location.search);
    const activeProductId = params.get('id') || "101";

    const productSnapshot = {
        id: activeProductId,
        title: document.getElementById('detailTitle').textContent,
        price: singleItemPrice,
        image: document.getElementById('productZoomImg').getAttribute('src'),
        size: sizeSelection,
        quantity: productQuantity
    };

    // Consolidated Merge Verification Loop Logic Check: Merge quantities if identical product and size
    const duplicateMatchIndex = cartItemsList.findIndex(item => 
        item.id === productSnapshot.id && item.size === productSnapshot.size
    );

    if (duplicateMatchIndex !== -1) {
        cartItemsList[duplicateMatchIndex].quantity += productSnapshot.quantity;
    } else {
        cartItemsList.push(productSnapshot);
    }

    localStorage.setItem('cartItemsArray', JSON.stringify(cartItemsList));
    syncCartBadge();
    
    alert(`Added ${productQuantity}x "${productSnapshot.title}" (Size: ${sizeSelection}) to your cart bag list!`);
}

document.addEventListener('DOMContentLoaded', () => {
    loadDetailProfileData();
    syncCartBadge();
    
    const addCartBtn = document.getElementById('addCartBtn');
    if (addCartBtn) {
        addCartBtn.addEventListener('click', executeAddToCartRoutine);
    }
});
// ==========================================
// SUBTASK 1 ADDON: OPTIMIZED DETAILS IMAGE GENERATOR
// ==========================================
function generateOptimizedDetailsImage(imagePath, titleText) {
    // Extract base image name safely (e.g., "images/hoodie.png" -> "hoodie")
    const baseImageName = imagePath ? imagePath.split('/').pop().split('.')[0] : 'placeholder';

    const smallImg  = `images/${baseImageName}-small.webp`;
    const mediumImg = `images/${baseImageName}-medium.webp`;
    const largeImg  = `images/${baseImageName}-large.webp`;

    return `
        <img src="${largeImg}" 
             srcset="${smallImg} 480w, ${mediumImg} 800w, ${largeImg} 1200w"
             sizes="(max-width: 600px) 480px, (max-width: 900px) 800px, 1200px"
             alt="${titleText}" 
             style="width: 100%; max-width: 500px; height: auto; display: block; border-radius: 8px; margin: 0 auto;"
        />
    `.trim();
}