// Food items data
const foodItems = [
    { id: 1, name: "Margherita Pizza", price: 12.99, category: "pizza", description: "Fresh tomatoes, mozzarella, basil", emoji: "🍕" },
    { id: 2, name: "Classic Cheeseburger", price: 9.99, category: "burger", description: "Beef patty, cheese, lettuce, tomato", emoji: "🍔" },
    { id: 3, name: "Salmon Sushi Roll", price: 15.99, category: "sushi", description: "Fresh salmon, rice, nori", emoji: "🍣" },
    { id: 4, name: "Spaghetti Carbonara", price: 13.99, category: "pasta", description: "Creamy pasta with bacon and eggs", emoji: "🍝" },
    { id: 5, name: "Chocolate Cake", price: 6.99, category: "dessert", description: "Rich chocolate layer cake", emoji: "🍰" },
    { id: 6, name: "Fresh Orange Juice", price: 4.99, category: "drinks", description: "Freshly squeezed orange juice", emoji: "🥤" },
    { id: 7, name: "BBQ Pizza", price: 14.99, category: "pizza", description: "BBQ sauce, chicken, onions", emoji: "🍕" },
    { id: 8, name: "Bacon Burger", price: 11.99, category: "burger", description: "Double beef, bacon, cheese", emoji: "🍔" },
    { id: 9, name: "Tuna Sashimi", price: 18.99, category: "sushi", description: "Fresh tuna, wasabi, ginger", emoji: "🍣" },
    { id: 10, name: "Penne Arrabbiata", price: 11.99, category: "pasta", description: "Spicy tomato sauce with penne", emoji: "🍝" },
    { id: 11, name: "Tiramisu", price: 7.99, category: "dessert", description: "Italian coffee-flavored dessert", emoji: "🍰" },
    { id: 12, name: "Iced Coffee", price: 5.99, category: "drinks", description: "Cold brew with ice and cream", emoji: "☕" }
];

let cart = [];
let currentFilter = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    displayFoodItems(foodItems);
    updateCartUI();
});

// Display food items
function displayFoodItems(items) {
    const foodGrid = document.getElementById('foodGrid');
    foodGrid.innerHTML = '';

    items.forEach(item => {
        const foodCard = createFoodCard(item);
        foodGrid.appendChild(foodCard);
    });
}

// Create food card element
function createFoodCard(item) {
    const card = document.createElement('div');
    card.className = 'food-card';
    card.innerHTML = `
                <div class="food-image">
                    <span>${item.emoji}</span>
                </div>
                <div class="food-info">
                    <h3 class="food-title">${item.name}</h3>
                    <p class="food-description">${item.description}</p>
                    <div class="food-footer">
                        <span class="food-price">$${item.price}</span>
                        <button class="add-to-cart" onclick="addToCart(${item.id})">Add to Cart</button>
                    </div>
                </div>
            `;
    return card;
}

// Filter by category
function filterCategory(category) {
    currentFilter = category;
    const filteredItems = foodItems.filter(item => item.category === category);
    displayFoodItems(filteredItems);
}

// Add item to cart
function addToCart(itemId) {
    const item = foodItems.find(food => food.id === itemId);
    const existingItem = cart.find(cartItem => cartItem.id === itemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    updateCartUI();
    showNotification(`${item.name} added to cart!`);
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    updateCartModal();
}

// Update cart modal
function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
                    <div>
                        <h4>${item.name}</h4>
                        <p>$${item.price} x ${item.quantity}</p>
                    </div>
                    <div>
                        <button onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
}

// Open cart modal
function openCart() {
    document.getElementById('cartModal').style.display = 'block';
}

// Close cart modal
function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    showNotification('Order placed successfully! Thank you for choosing Foodie!');
    cart = [];
    updateCartUI();
    closeCart();
}

// Show notification
function showNotification(message) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: linear-gradient(45deg, #ff6b6b, #ffa726);
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                z-index: 3000;
                animation: slideIn 0.3s ease;
            `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Search functionality
document.querySelector('.search-input').addEventListener('input', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredItems = foodItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
    );
    displayFoodItems(filteredItems);
});

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

// Header scroll effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Close cart modal when clicking outside
window.addEventListener('click', function (e) {
    const modal = document.getElementById('cartModal');
    if (e.target === modal) {
        closeCart();
    }
});

// Add CSS for slide-in animation
const style = document.createElement('style');
style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
document.head.appendChild(style);