document.addEventListener('DOMContentLoaded', () => {
    // Universal Hamburger Menu
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => navMenu.classList.toggle('show'));
    }

    // Automatic footer dates
    if (document.getElementById('currentyear')) document.getElementById('currentyear').textContent = new Date().getFullYear();
    if (document.getElementById('lastModified')) document.getElementById('lastModified').textContent = document.lastModified;

    // Execute asynchronous data loading
    fetchAndRenderMenu();
});

let allProducts = [];

async function fetchAndRenderMenu() {
    const container = document.getElementById('menu-container');
    if (!container) return;

    try {
        // Asynchronous local loading via fetch and try/catch
        const response = await fetch('data/product.json');
        if (!response.ok) throw new Error('Could not read the JSON file.');
        
        allProducts = await response.json();
        
        // Show all at start
        displayItems(allProducts);
        
        // Activate filter buttons
        setupFilterButtons();

    } catch (error) {
        console.error('Error detected:', error);
        container.innerHTML = `<p class="loading-message" style="color: red;">Error loading the menu. Make sure your actual JSON is saved in data/product.json</p>`;
    }
}

function displayItems(productsList) {
    const container = document.getElementById('menu-container');
    container.innerHTML = ""; 

    if (!productsList || productsList.length === 0) {
        container.innerHTML = `<p class="loading-message">No products available in this section.</p>`;
        return;
    }

    // Dynamic rendering using Template Literals
    productsList.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        productCard.innerHTML = `
            <div class="product-image-wrapper">
                <img src="${product.imageUrl}" alt="Photograph of ${product.name}" class="product-img" loading="lazy" width="300" height="200">
                <span class="product-tag">${product.tags}</span>
            </div>
            <div class="product-details">
                <h2 class="product-name">${product.name}</h2>
                <p style="font-size: 0.85rem; color: var(--secondary-hover); font-weight: bold; margin-bottom: 0.5rem;">${product.category} - ${product.type}</p>
                <p class="product-desc">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price}</span>
                    <button class="order-btn" data-id="${product.id}">Details</button>
                </div>
            </div>
        `;
        container.appendChild(productCard);
    });

    // Click control to open the actual modal window
    const orderButtons = container.querySelectorAll('.order-btn');
    orderButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const selectedProduct = productsList.find(p => p.id === productId);
            if (selectedProduct) {
                openProductModal(selectedProduct);
            }
        });
    });
}

function setupFilterButtons() {
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            buttons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            const filterValue = e.target.getAttribute('data-filter');
            
            if (filterValue === 'all') {
                displayItems(allProducts);
            } else {
                // Direct comparison with your fields in lowercase to avoid errors
                const filtered = allProducts.filter(item => 
                    item.category.toLowerCase() === filterValue.toLowerCase()
                );
                displayItems(filtered);
            }
        });
    });
}

function openProductModal(product) {
    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const modalPrice = document.getElementById('modal-price');

    if (!modal || !modalTitle || !modalText || !modalPrice) return;

    modalTitle.textContent = product.name;
    modalText.textContent = `Excellent choice! This delicious dish from our ${product.category} (${product.type}) category is prepared with the finest local ingredients. You can request it as a priority by confirming your attendance in our Booking tab.`;
    modalPrice.textContent = `Price: ${product.price}`;

    modal.classList.add('modal-show');

    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) {
        closeBtn.onclick = () => modal.classList.remove('modal-show');
    }

    modal.onclick = (e) => {
        if (e.target === modal) modal.classList.remove('modal-show');
    };
}