const cartItemsContainer = document.getElementById('cartItemsContainer');
const summaryItemCount = document.getElementById('summaryItemCount');
const summaryOrderTotal = document.getElementById('summaryOrderTotal');
const navCartBadge = document.getElementById('navCartBadge');
const checkoutBtn = document.getElementById('checkoutBtn');

function renderCartPageListTree() {
    const cartItemsList = JSON.parse(localStorage.getItem('cartItemsArray')) || [];
    cartItemsContainer.innerHTML = '';

    // If cart is empty, disable checkout and display an empty message
    if (cartItemsList.length === 0) {
        cartItemsContainer.innerHTML = `
            <div style="text-align: center; padding: 40px; background: #fff; border: 1px solid #eee; border-radius: 6px;">
                <h2>Your shopping selection bag is empty!</h2>
                <p>Add some products on the homepage catalog view to see options here.</p>
            </div>
        `;
        summaryItemCount.textContent = "0 items";
        summaryOrderTotal.textContent = "$0.00";
        if (navCartBadge) navCartBadge.textContent = "0";
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }

    if (checkoutBtn) checkoutBtn.disabled = false;
    let dynamicBillSubtotal = 0;
    let totalItemsQuantityCount = 0;

    cartItemsList.forEach((item, index) => {
        const itemRowSum = item.price * item.quantity;
        dynamicBillSubtotal += itemRowSum;
        totalItemsQuantityCount += item.quantity;

        const rowBlock = document.createElement('div');
        rowBlock.style = "display: flex; align-items: center; background: #fff; padding: 20px; border-radius: 6px; border: 1px solid #eee; gap: 20px; margin-bottom: 15px;";
        
        rowBlock.innerHTML = `
            <img src="${item.image}" alt="${item.title}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px;">
            <div style="flex: 1;">
                <h3 style="font-size: 16px; margin-bottom: 5px; color: #333;">${item.title}</h3>
                <p style="font-size: 13px; color: #666; margin-bottom: 5px;">Size: <strong>${item.size}</strong></p>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
                    <span style="font-size: 13px; color: #666;">Qty:</span>
                    <button onclick="changeQtyInCart(${index}, -1)" style="padding: 2px 8px; cursor:pointer; font-weight:bold;">-</button>
                    <strong style="font-size: 14px;">${item.quantity}</strong>
                    <button onclick="changeQtyInCart(${index}, 1)" style="padding: 2px 8px; cursor:pointer; font-weight:bold;">+</button>
                </div>
                <p style="font-weight: 700; color: #ff5722;">$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button onclick="deleteRowRecordEntry(${index})" style="background: none; border: none; color: #e53935; font-size: 18px; cursor: pointer; padding: 10px;" title="Remove Entry Row">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;
        cartItemsContainer.appendChild(rowBlock);
    });

    summaryItemCount.textContent = `${totalItemsQuantityCount} item(s)`;
    summaryOrderTotal.textContent = `$${dynamicBillSubtotal.toFixed(2)}`;
    if (navCartBadge) navCartBadge.textContent = totalItemsQuantityCount;
}

window.changeQtyInCart = function(index, change) {
    let cartItemsList = JSON.parse(localStorage.getItem('cartItemsArray')) || [];
    cartItemsList[index].quantity += change;
    
    if (cartItemsList[index].quantity < 1) {
        cartItemsList.splice(index, 1); // Delete item entirely if quantity drops below 1
    }
    
    localStorage.setItem('cartItemsArray', JSON.stringify(cartItemsList));
    renderCartPageListTree();
};

window.deleteRowRecordEntry = function(index) {
    let cartItemsList = JSON.parse(localStorage.getItem('cartItemsArray')) || [];
    cartItemsList.splice(index, 1);
    localStorage.setItem('cartItemsArray', JSON.stringify(cartItemsList));
    renderCartPageListTree();
};

document.addEventListener('DOMContentLoaded', () => {
    renderCartPageListTree();
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert("Order submitted successfully processing pipeline tracker pipeline checkout gateway integration simulation framework!");
            localStorage.removeItem('cartItemsArray'); // Flush cart array after submit check
            renderCartPageListTree();
        });
    }
});