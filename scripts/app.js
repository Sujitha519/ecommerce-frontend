// Sample baseline data collection arrays for product showcase cards
const sampleProductsList = [
    { id: "101", title: "Premium Cotton Hoodie", price: 49.99, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400" },
    { id: "102", title: "Classic Denim Jacket", price: 65.00, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=400" },
    { id: "103", title: "Minimalist Leather Watch", price: 120.00, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400" },
    { id: "104", title: "Athletic Running Sneakers", price: 85.50, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400" }
];

// 1. Safe update routine to keep counter badge synced with storage array memory
function syncHomepageBadgeText() {
    const navCartBadge = document.getElementById('navCartBadge');
    if (!navCartBadge) return;

    try {
        const cartItemsList = JSON.parse(localStorage.getItem('cartItemsArray')) || [];
        const totalQuantityCount = cartItemsList.reduce((acc, item) => acc + item.quantity, 0);
        navCartBadge.textContent = totalQuantityCount;
    } catch (err) {
        console.error("Failed parsing cart tracking array updates:", err);
    }
}

// 2. Loop through product listings arrays and construct clickable visual interface cards
function displayStorefrontProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    productsGrid.innerHTML = ''; // Reset container frame

    sampleProductsList.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style = "background: #fff; border: 1px solid #eee; padding: 15px; border-radius: 6px; text-align: center; box-shadow: 0 2px 5px rgba(0,0,0,0.02);";

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 15px;">
            <h3 style="font-size: 16px; color: #333; margin-bottom: 10px; height: 40px; overflow: hidden;">${product.title}</h3>
            <p style="color: #ff5722; font-weight: bold; font-size: 18px; margin-bottom: 15px;">$${product.price.toFixed(2)}</p>
            <a href="./product.html?id=${product.id}" style="display: block; background: #333; color: white; text-decoration: none; padding: 10px; border-radius: 4px; font-weight: 600; font-size: 14px;">View Details</a>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Bind initialization rules directly onto browser context structures load event
document.addEventListener('DOMContentLoaded', () => {
    syncHomepageBadgeText();
    displayStorefrontProducts();
});
// Copy this script initialization to your global application workflow or main page loaders
// Make sure the same 2 Firebase CDN scripts from Step 1 are also loaded in your index.html/cart.html headers!

const authStateTracker = firebase.auth();

authStateTracker.onAuthStateChanged((user) => {
    // Locate our navigation action holding wrapper
    const navActions = document.querySelector('.nav-actions-container');
    
    if (navActions) {
        if (user) {
            // User is signed in -> Change the "Sign In" link to a functional "Logout" button dynamically!
            navActions.innerHTML = `
                <span style="font-size: 14px; color: #555; font-weight: 600;">Hi, ${user.email.split('@')[0]}</span>
                <button id="logoutBtn" style="font-size: 15px; font-weight: 600; color: #e53935; background: none; border: 1px solid #e53935; padding: 8px 16px; border-radius: 4px; cursor: pointer; transition: all 0.2s;">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout
                </button>
                <a href="./cart.html" style="font-size: 15px; font-weight: 600; color: #ff5722; text-decoration: none; border: 1px solid #ff5722; padding: 8px 16px; border-radius: 4px; display: inline-flex; align-items: center; gap: 8px;">
                    <i class="fa-solid fa-basket-shopping"></i> My Cart (<span id="navCartBadge">0</span>)
                </a>
            `;
            
            // Attach real signOut click trigger action 
            document.getElementById('logoutBtn').addEventListener('click', () => {
                firebase.auth().signOut().then(() => {
                    alert("Logged out successfully.");
                    window.location.reload();
                });
            });
        }
    }
});