console.log("E-Commerce Website Loaded");
// Grab the elements from our HTML
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

// Listen for a click on the hamburger button
menuToggle.addEventListener('click', () => {
    // Toggle the "active" CSS class on the nav menu
    navMenu.classList.toggle('active');
    
    // Optional: Switch icon from Bars to an 'X' close symbol when open
    const icon = menuToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
    } else {
        icon.className = 'fa-solid fa-bars';
    }
});
// ====================================================
// PRODUCT GRID DOM FETCH LOGIC
// ====================================================

// ====================================================
// SUBTASK 2: FETCH PRODUCT DATA FROM API WITH ROBUST HANDLING
// ====================================================

const productGrid = document.getElementById('productGrid');

async function fetchProducts() {
    // 1. Show Loading State while the API request is in progress
    productGrid.innerHTML = `
        <div class="loading-container">
            <div class="spinner"></div>
            <p>Loading premium collection, please wait...</p>
        </div>
    `;

    try {
        // Fetch data from the public FakeStore API endpoint
        const response = await fetch('https://fakestoreapi.com/products?limit=8');
        
        // Check if server response is healthy
        if (!response.ok) {
            throw new Error(`Server returned status: ${response.status}`);
        }
        
        const products = await response.json();
        
        // 2. Clear loader and inject cards dynamically if successful
        displayProducts(products);

    } catch (error) {
        // 3. Handle Errors safely without breaking the user layout
        console.error('API Fetch Error Log:', error);
        productGrid.innerHTML = `
            <div class="error-message">
                <h3><i class="fa-solid fa-triangle-exclamation"></i> Something went wrong</h3>
                <p>We're having trouble retrieving items right now. Please check your internet connection and try refreshing.</p>
            </div>
        `;
    }
}

function displayProducts(productsArray) {
    productGrid.innerHTML = ''; // Wipe out loader component

    // 4. Loop through the API response array
    productsArray.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        // Extract relevant details: title, price, image, etc.
        // Added 'loading="lazy"' to optimize rendering speeds for mobile images
       // Update ONLY the card.innerHTML inside displayProducts function in scripts/app.js
        card.innerHTML = `
            <div class="product-img-wrapper">
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.title}" loading="lazy">
                </a>
            </div>
            <div class="product-info">
                <h3><a href="product.html?id=${product.id}" style="color: inherit; text-decoration: none;">${product.title}</a></h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" onclick="globalAddToCart(${product.id})">Add to Cart</button>
            </div>
        `;

        // Append structure cleanly to current grid layout block
        productGrid.appendChild(card);
    });
}

// Trigger streaming pipeline once DOM tree parses completely
window.addEventListener('DOMContentLoaded', fetchProducts);
// Simple helper to manage cart sync on the main grid screen
function globalAddToCart(id) {
    let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    cartCount += 1;
    localStorage.setItem('cartCount', cartCount);
    
    // Update navbar count immediately if the element exists
    const badge = document.querySelector('.cart-badge'); // Adjust class name to match your original navbar counter badge
    if (badge) badge.textContent = cartCount;
    alert('Item successfully added to your shopping cart!');
}