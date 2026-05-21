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