document.addEventListener('DOMContentLoaded', function() {
    // Fetch items from MongoDB and render the cart
    fetch('/api/cart')
        .then(response => response.json())
        .then(data => renderCart(data));

    function renderCart(items) {
        const cartDiv = document.getElementById('cart');
        cartDiv.innerHTML = '';

        let total = 0;

        items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <button class="remove-btn" data-id="${item._id}">Remove</button>
                    <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            `;
            cartDiv.appendChild(itemDiv);

            total += item.price * item.quantity;
        });

        // Display total
        const totalDiv = document.getElementById('total');
        totalDiv.innerHTML = `Total: $${total.toFixed(2)}`;

        // Add event listener to remove buttons
        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const itemId = button.getAttribute('data-id');
                removeFromCart(itemId);
            });
        });

        // Add event listener to checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        checkoutBtn.addEventListener('click', () => {
            // Redirect to payment page or implement payment logic here
            // For now, just log a message
            console.log('Proceeding to payment...');
        });
    }

    function removeFromCart(itemId) {
        fetch(`/api/cart/${itemId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(() => {
            // Refresh the cart after removing item
            fetch('/api/cart')
                .then(response => response.json())
                .then(data => renderCart(data));
        })
        .catch(err => console.error('Error removing item:', err));
    }
});

