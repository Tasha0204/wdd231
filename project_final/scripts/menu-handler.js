let allProductsData = [];

// 1. Get data from JSON file
const getProductsData = async () => {
    if (allProductsData.length > 0) {
        return allProductsData;
    }
    try {
        const response = await fetch('data/product.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allProductsData = await response.json();
        return allProductsData;
    } catch (error) {
        console.error("Error loading products JSON file:", error);
        return [];
    }
};

// 2. Render products in the HTML container
const renderProducts = (products, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    
    if (products.length === 0) {
        container.innerHTML = '<p>No products found in this category.</p>';
        return;
    }
    
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'pet-card'; 
        productCard.setAttribute('data-product-id', product.id);
        
        const lazyLoadAttribute = index > 2 ? 'loading="lazy"' : '';

        // CORRECCIÓN: Agregada la línea de Description dentro de la tarjeta principal
        productCard.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name} - ${product.type}" ${lazyLoadAttribute}>
            <div class="pet-card-info">
                <h3>${product.name}</h3>
                <p><strong>Category:</strong> ${product.category}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Note:</strong> ${product.tags}</p>
                <p><strong>Description:</strong> ${product.description}</p>
            </div>
        `;
        container.appendChild(productCard);
    });
    addCardEventListeners();
};

// 3. Main load function (Exported for products.js)
export const loadProducts = async (featuredOnly = false) => {
    const products = await getProductsData();
    if (featuredOnly) {
        const featuredProducts = products.slice(0, 3);
        const container = document.getElementById('featured-pets-grid');
        if (!container) return;
        container.innerHTML = '';
        
        featuredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'pet-card';
            productCard.setAttribute('data-product-id', product.id);
            
            // CORRECCIÓN: También agregada aquí por si usas las tarjetas destacadas en la Home
            productCard.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <div class="pet-card-info">
                    <h3>${product.name}</h3>
                    <p><strong>Category:</strong> ${product.category}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Note:</strong> ${product.tags}</p>
                    <p><strong>Description:</strong> ${product.description}</p>
                </div>
            `;
            container.appendChild(productCard);
        });
        addCardEventListeners();
    } else {
        renderProducts(products, 'all-pets-grid');
    }
};

// 4. Filter function by category (Exported for products.js)
export const filterProducts = (category) => {
    if (category === 'all') {
        renderProducts(allProductsData, 'all-pets-grid');
        return;
    }

    const normalizeText = (str) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const filtered = allProductsData.filter(product => 
        normalizeText(product.category) === normalizeText(category)
    );
    renderProducts(filtered, 'all-pets-grid');
};

// Modal logic / Pop-up window when a product is clicked
const modal = document.getElementById('pet-modal');
const modalContent = document.getElementById('modal-content');
const closeModalButton = document.getElementById('modal-close-button');

const openModal = (productId) => {
    const product = allProductsData.find(p => Number(p.id) === Number(productId));
    
    if (!product || !modal) {
        console.error("Product not found for ID:", productId);
        return;
    }
    
    modalContent.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}">
        <div>
            <h2>${product.name}</h2>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Type:</strong> ${product.type}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Tag:</strong> ${product.tags}</p>
            <p><strong>Description:</strong> ${product.description}</p>
        </div>
    `;
    modal.showModal();
};

if (modal) {
    closeModalButton.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
}

const addCardEventListeners = () => {
    const productCards = document.querySelectorAll('.pet-card');
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const productId = card.getAttribute('data-product-id');
            openModal(productId);
        });
    });
};