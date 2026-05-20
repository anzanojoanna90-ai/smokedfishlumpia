// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Shopping Cart
let cart = [];

// Add to Cart functionality
function addToCart(productName, price, pieces) {
    cart.push({
        name: productName,
        price: price,
        pieces: pieces
    });
    alert(`${productName} added to cart!`);
}

// Open Checkout Modal
function openCheckout() {
    const modal = document.getElementById('checkoutModal');
    modal.classList.add('show');
    updateOrderSummary();
}

// Close Checkout Modal
function closeCheckout() {
    const modal = document.getElementById('checkoutModal');
    modal.classList.remove('show');
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('checkoutModal');
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});

// Update Order Summary
function updateOrderSummary() {
    const orderItemsDiv = document.getElementById('orderItems');
    const totalPriceSpan = document.getElementById('totalPrice');
    
    if (cart.length === 0) {
        orderItemsDiv.innerHTML = '<p style="text-align: center; color: #999;">No items in cart</p>';
        totalPriceSpan.textContent = '₱0';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach(item => {
        const priceValue = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
        const itemTotal = priceValue;
        total += itemTotal;
        
        html += `
            <div class="order-item">
                <span>${item.name}</span>
                <span>${item.price}</span>
            </div>
        `;
    });
    
    orderItemsDiv.innerHTML = html;
    totalPriceSpan.textContent = `₱${total}`;
}

// Update Payment Information
function updatePaymentInfo() {
    const paymentMethod = document.getElementById('paymentMethod').value;
    const paymentInfoDiv = document.getElementById('paymentInfo');
    let html = '';
    
    switch(paymentMethod) {
        case 'cod':
            html = `
                <h4>💵 Cash on Delivery (COD)</h4>
                <p>✓ Pay when your order arrives</p>
                <p>✓ Available in Panabo City and nearby areas</p>
                <p>✓ No advance payment required</p>
            `;
            break;
        case 'gcash':
            html = `
                <h4>📱 GCash Payment</h4>
                <p><strong>GCash Number:</strong> 09853307344</p>
                <p>✓ Please send payment first</p>
                <p>✓ Reply with screenshot as proof of payment</p>
                <p>✓ Your order will be processed after confirmation</p>
            `;
            break;
        case 'maya':
            html = `
                <h4>💳 Maya Payment</h4>
                <p><strong>Maya Account:</strong> Contact us for details</p>
                <p>✓ Secure payment method</p>
                <p>✓ Email anzanojoanna90@gmail.com for Maya details</p>
                <p>✓ Your order will be processed after payment</p>
            `;
            break;
        case 'card':
            html = `
                <h4>💳 Debit/Credit Card</h4>
                <p><strong>Accepted Cards:</strong> Visa, Mastercard, UnionBank</p>
                <p>✓ Secure online payment</p>
                <p>✓ Email anzanojoanna90@gmail.com for card payment details</p>
                <p>✓ Your order will be processed immediately after payment</p>
            `;
            break;
    }
    
    if (html) {
        paymentInfoDiv.innerHTML = html;
        paymentInfoDiv.classList.add('show');
    } else {
        paymentInfoDiv.classList.remove('show');
    }
}

// Submit Order
function submitOrder(event) {
    event.preventDefault();
    
    const customerName = document.getElementById('customerName').value;
    const customerEmail = document.getElementById('customerEmail').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const deliveryAddress = document.getElementById('deliveryAddress').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    
    if (!paymentMethod) {
        alert('Please select a payment method');
        return;
    }
    
    // Create order details
    let orderDetails = `
ORDER DETAILS:
====================
Customer Name: ${customerName}
Email: ${customerEmail}
Phone: ${customerPhone}
Delivery Address: ${deliveryAddress}

ORDER ITEMS:
====================
`;
    
    let total = 0;
    cart.forEach(item => {
        const priceValue = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
        total += priceValue;
        orderDetails += `${item.name} - ${item.price}\n`;
    });
    
    orderDetails += `
TOTAL: ₱${total}

PAYMENT METHOD: ${paymentMethod.toUpperCase()}
====================
    `;
    
    // Get payment details
    let paymentDetails = '';
    switch(paymentMethod) {
        case 'cod':
            paymentDetails = '\nPayment will be collected upon delivery.';
            break;
        case 'gcash':
            paymentDetails = '\nPlease send payment to GCash: 09853307344';
            break;
        case 'maya':
            paymentDetails = '\nPlease contact us for Maya payment details.';
            break;
        case 'card':
            paymentDetails = '\nPlease contact us for Debit/Credit Card payment details.';
            break;
    }
    
    orderDetails += paymentDetails;
    
    // Send email with order details
    const mailtoLink = `mailto:anzanojoanna90@gmail.com?subject=New Order from ${customerName}&body=${encodeURIComponent(orderDetails)}`;
    
    // Show success message
    alert(`Order Confirmation!\n\nThank you for your order, ${customerName}!\n\nWe will send you an email confirmation shortly.\n\nYour order will be delivered to:\n${deliveryAddress}\n\nThank you!`);
    
    // Redirect to email
    window.location.href = mailtoLink;
    
    // Clear form and close modal
    document.getElementById('checkoutForm').reset();
    closeCheckout();
    cart = [];
}

// Menu category filtering
const tabButtons = document.querySelectorAll('.tab-btn');
const menuCards = document.querySelectorAll('.menu-card');

tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        
        // Update active tab
        tabButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Filter menu items
        menuCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeIn 0.3s ease-in';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe menu cards and goal items
document.querySelectorAll('.menu-card, .goal-item, .card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add scroll animation to hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
    }
});
