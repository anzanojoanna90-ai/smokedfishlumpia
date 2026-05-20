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

// Add to Cart functionality
document.querySelectorAll('.btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const menuCard = this.closest('.menu-card');
        const productName = menuCard.querySelector('h3').textContent;
        const productPrice = menuCard.querySelector('.price').textContent;
        
        // Show confirmation message
        alert(`${productName} (${productPrice}) added to cart!\n\nPlease contact us via email or GCash to complete your order.`);
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
