// ====================================================
// MODULE 3 SUBTASK 1: PRODUCT DETAIL LOGIC CONTROLLER
// ====================================================

const detailView = document.getElementById('detailView');
const navCartBadge = document.getElementById('navCartBadge');

// 1. Sync counter badge from storage immediately on page initialization
function syncCartBadge() {
    const savedCount = localStorage.getItem('cartCount') || 0;
    if (navCartBadge) {
        navCartBadge.textContent = savedCount;
    }
}

// 2. Extract specific query param unique 'id' straight from window address string bar
function getProductIdFromURL() {
    const urlParameters = new URLSearchParams(window.location.search);
    return urlParameters.get('id'); // returns e.g., "5"
}

// 3. Fetch single target entity data model straight from FakeStore endpoint mapping
async function loadSingleProductDetails() {
    const productId = getProductIdFromURL();
    
    if (!productId) {
        detailView.innerHTML = `<p class="error-message">Error: No valid product ID detected in your URL parameters.</p>`;
        return;
    }

    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!response.ok) throw new Error('Failed to retrieve matching query entity metadata');
        
        const targetProduct = await response.json();
        
        // Construct detailed split interface architecture block patterns injection mapping
        renderProductTemplate(targetProduct);

    } catch (err) {
        console.error(err);
        detailView.innerHTML = `<p class="error-message">Oops! Could not find the selected product details. Please return home and try again.</p>`;
    }
}

// 4. Construct detailed layouts structures dynamically inside DOM trees safely
function renderProductTemplate(item) {
    detailView.innerHTML = `
        <div class="detail-wrapper">
            <div class="detail-img-box">
                <img src="${item.image}" alt="${item.title}">
            </div>
            
            <div class="detail-info-box">
                <span class="detail-category">${item.category}</span>
                <h1>${item.title}</h1>
                <p class="detail-price">$${item.price.toFixed(2)}</p>
                <p class="detail-desc">${item.description}</p>
                
                <div class="action-btn-group">
                    <button class="add-bag-btn" id="addBtn">Add to Cart Bag</button>
                    <a href="index.html" class="back-store-btn"><i class="fa-solid fa-arrow-left"></i> Back to Shop</a>
                </div>
            </div>
        </div>
    `;

    // Bind item click listeners straight to localStorage operations pipeline tracker
    document.getElementById('addBtn').addEventListener('click', () => {
        addToCartCountTracker();
    });
}

// 5. Store data persistently inside browser LocalStorage memory across sessions
function addToCartCountTracker() {
    let currentCount = parseInt(localStorage.getItem('cartCount')) || 0;
    currentCount += 1; // Increment total quantity elements count item
    
    localStorage.setItem('cartCount', currentCount);
    syncCartBadge(); // Update counter icon immediately
    
    alert('Excellent! This item has been successfully added to your shopping cart bag counter.');
}

// Fire data connection bindings upon DOM loading parameters triggers
document.addEventListener('DOMContentLoaded', () => {
    syncCartBadge();
    loadSingleProductDetails();
});