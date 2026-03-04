const cart = [];

function addToCart(product) {
    const found = cart.find(item => item.Product_ID === product.Product_ID);
    if (found) {
        found.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }
    alert(`${product.Product_Name} added to cart!`);
}

function viewCart() {
    if (cart.length === 0) {
        alert('Cart is empty');
        return;
    }

    // Show summary
    let cartSummary = 'Your cart:\n';
    cart.forEach(item => {
        cartSummary += `${item.Product_Name} x${item.quantity}\n`;
    });

    // Confirm submission
    if (!confirm(cartSummary + '\nSubmit order?')) return;

    // Send cart to server
    fetch('http://localhost:3000/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cart: cart,
            customerId: 1 // You can replace with dynamic ID later
        })
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message || 'Order placed successfully!');
            cart.length = 0; // Clear cart
        })
        .catch(error => {
            console.error('Error placing order:', error);
            alert('Failed to place order.');
        });
}


// Load customer info
fetch('http://localhost:3000/customer')
    .then(response => response.json())
    .then(data => {
        document.getElementById('customer-name').textContent = data.Customer_Name;
    })
    .catch(error => {
        console.error('Error fetching customer:', error);
        document.getElementById('customer-name').textContent = 'Guest';
    });

// Load products and render
fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(products => {
        const list = document.getElementById('product-list');
        list.innerHTML = ''; // Clear existing items

        products.forEach(product => {
            const item = document.createElement('div');
            item.className = 'product';

            item.innerHTML = `
                <img class="product-image" src="${product.Product_Picture}" alt="${product.Product_Name}" />
                <h3>${product.Product_Name}</h3>
                <p>Price: R${product.Product_Cost}</p>
                <button>Add to Cart</button>
            `;

            // Add event listener for Add to Cart
            const btn = item.querySelector('button');
            btn.addEventListener('click', () => addToCart(product));

            list.appendChild(item);
        });
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });

// Add event listener to the "View Cart" button
document.getElementById('view-cart-btn').addEventListener('click', viewCart);

// Load customer info and display name
fetch('http://localhost:3000/customer')
    .then(response => response.json())
    .then(data => {
        // Use the actual column returned by your DB query
        document.getElementById('customer-name').textContent = data.Cus_Name || 'Customer';
    })
    .catch(error => {
        console.error('Error fetching customer:', error);
        document.getElementById('customer-name').textContent = 'Guest';
    });

