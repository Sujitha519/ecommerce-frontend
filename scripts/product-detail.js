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
// Keep the top parts of your script (syncCartBadge, getProductIdFromURL, loadSingleProductDetails) exactly the same!

// Global memory states for active calculation monitoring
let singleItemPrice = 0;
let productQuantity = 1;

// 4. Construct detailed layouts structures dynamically inside DOM trees safely
function renderProductTemplate(item) {
    // Save base decimal cost value into active memory trackers
    singleItemPrice = item.price;
    productQuantity = 1; 

    detailView.innerHTML = `
        <div class="detail-wrapper">
            <div class="detail-img-box">
                <img src="${item.image}" alt="${item.title}" id="productZoomImg">
            </div>
            
            <div class="detail-info-box">
                <span class="detail-category">${item.category}</span>
                <h1>${item.title}</h1>
                
                <p class="detail-price" id="totalPriceDisplay">$${singleItemPrice.toFixed(2)}</p>
                <p class="detail-desc">${item.description}</p>
                
                <div class="selector-item">
                    <label for="productSize">Select Variation Size:</label>
                    <select id="productSize" class="size-dropdown">
                        <option value="S">Small (S)</option>
                        <option value="M" selected>Medium (M)</option>
                        <option value="L">Large (L)</option>
                        <option value="XL">Extra Large (XL)</option>
                    </select>
                </div>

                <div class="selector-item">
                    <label>Quantity:</label>
                    <div class="quantity-wrapper">
                        <button class="qty-btn" id="minusBtn" type="button">−</button>
                        <div class="qty-number" id="qtyCountDisplay">1</div>
                        <button class="qty-btn" id="plusBtn" type="button">+</button>
                    </div>
                </div>
                
                <div class="action-btn-group">
                    <button class="add-bag-btn" id="addBtn">Add to Cart Bag</button>
                    <a href="index.html" class="back-store-btn"><i class="fa-solid fa-arrow-left"></i> Back to Shop</a>
                </div>
            </div>
        </div>
    `;

    // Initialize interactive structural event handlers hooks
    setupInteractiveControlListeners();
}

// 5. Connect interaction calculations pipeline flows
function setupInteractiveControlListeners() {
    const plusBtn = document.getElementById('plusBtn');
    const minusBtn = document.getElementById('minusBtn');
    const qtyCountDisplay = document.getElementById('qtyCountDisplay');
    const totalPriceDisplay = document.getElementById('totalPriceDisplay');
    const addBtn = document.getElementById('addBtn');

    // PLUS BUTTON CLICK LOGIC
    plusBtn.addEventListener('click', () => {
        productQuantity += 1;
        qtyCountDisplay.textContent = productQuantity;
        updateDynamicPriceView(totalPriceDisplay);
    });

    // MINUS BUTTON CLICK LOGIC (Prevents falling below 1 unit item)
    minusBtn.addEventListener('click', () => {
        if (productQuantity > 1) {
            productQuantity -= 1;
            qtyCountDisplay.textContent = productQuantity;
            updateDynamicPriceView(totalPriceDisplay);
        }
    });

    // SUBMIT ADD TO CART OPERATIONS CLICK
    addBtn.addEventListener('click', () => {
        const selectedSize = document.getElementById('productSize').value;
        addToCartCountTracker(selectedSize);
    });
}

// 6. Dynamic calculator to multiply configuration costs instantly
function updateDynamicPriceView(displayElement) {
    const runningTotalSum = singleItemPrice * productQuantity;
    displayElement.textContent = `$${runningTotalSum.toFixed(2)}`;
}

// 7. Store data persistently inside browser LocalStorage memory across sessions
function addToCartCountTracker(sizeSelection) {
    // Fetch previous values or instantiate zero index parameters
    let currentCount = parseInt(localStorage.getItem('cartCount')) || 0;
    
    // Add the total calculated quantity number chosen by user selection loop
    currentCount += productQuantity;
    
    localStorage.setItem('cartCount', currentCount);
    syncCartBadge(); // Update navigation header bubble count circle element
    
    alert(`Success! Added (${productQuantity}) items in Size [${sizeSelection}] smoothly into your shopping container tracking logs.`);
}

// Fire initialization event parameters execution workflows
document.addEventListener('DOMContentLoaded', () => {
    syncCartBadge();
    loadSingleProductDetails();
});