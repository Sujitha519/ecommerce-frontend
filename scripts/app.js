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

const productGrid = document.getElementById('productGrid');

// 1. Function to talk to the live internet API
async function fetchProducts() {
    try {
        // Fetching 8 items from a public e-commerce test API
        const response = await fetch('https://fakestoreapi.com/products?limit=8');
        
        if (!response.ok) {
            throw new Error('Network response failure');
        }
        
        const products = await response.json();
        
        // Send data off to get drawn on the screen
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching data:', error);
        productGrid.innerHTML = `<p style="text-align:center; color:red;">Failed to load products. Please try again later.</p>`;
    }
}

// 2. Function to turn JavaScript arrays into visible HTML structures
function displayProducts(productsArray) {
    // Clear out any old placeholder code
    productGrid.innerHTML = '';

    // Loop through each individual product object
    productsArray.forEach(product => {
        // Create an empty div container for a card
        const card = document.createElement('div');
        card.classList.add('product-card');

        // Populate card content dynamically with variables using backticks (``)
        card.innerHTML = `
            <div class="product-img-wrapper">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
            </div>
            <div class="product-info">
                <h3>${product.title}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn">Add to Cart</button>
            </div>
        `;

        // Slide the fresh card box right into our layout grid
        productGrid.appendChild(card);
    });
}

// 3. Trigger the data stream immediately when the window finishes loading
window.addEventListener('DOMContentLoaded', fetchProducts);