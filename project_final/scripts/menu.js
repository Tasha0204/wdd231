document.addEventListener('DOMContentLoaded', () => {
    // Menú Hamburguesa universal
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => navMenu.classList.toggle('show'));
    }

    // Fechas automáticas del pie de página
    if (document.getElementById('currentyear')) document.getElementById('currentyear').textContent = new Date().getFullYear();
    if (document.getElementById('lastModified')) document.getElementById('lastModified').textContent = document.lastModified;

    // Ejecutar la carga asíncrona de los datos
    fetchAndRenderMenu();
});

let allProducts = [];

async function fetchAndRenderMenu() {
    const container = document.getElementById('menu-container');
    if (!container) return;

    try {
        // Carga asíncrona local mediante fetch y try/catch (Requisito Item 12)
        const response = await fetch('data/product.json');
        if (!response.ok) throw new Error('No se pudo leer el archivo JSON.');
        
        allProducts = await response.json();
        
        // Mostrar todos al iniciar
        displayItems(allProducts);
        
        // Activar los botones de filtro
        setupFilterButtons();

    } catch (error) {
        console.error('Error detectado:', error);
        container.innerHTML = `<p class="loading-message" style="color: red;">Error al cargar el menú. Asegúrate de que tu JSON real esté guardado en data/product.json</p>`;
    }
}

function displayItems(productsList) {
    const container = document.getElementById('menu-container');
    container.innerHTML = ""; 

    if (!productsList || productsList.length === 0) {
        container.innerHTML = `<p class="loading-message">No hay productos disponibles en esta sección.</p>`;
        return;
    }

    // Renderizado dinámico usando Template Literals (Item 11) y tus propiedades reales (.category, .tags, etc.)
    productsList.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        productCard.innerHTML = `
            <div class="product-image-wrapper">
                <img src="${product.imageUrl}" alt="Fotografía de ${product.name}" class="product-img" loading="lazy" width="300" height="200">
                <span class="product-tag">${product.tags}</span>
            </div>
            <div class="product-details">
                <h2 class="product-name">${product.name}</h2>
                <p style="font-size: 0.85rem; color: var(--secondary-hover); font-weight: bold; margin-bottom: 0.5rem;">${product.category} - ${product.type}</p>
                <p class="product-desc">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price}</span>
                    <button class="order-btn" data-id="${product.id}">Detalles</button>
                </div>
            </div>
        `;
        container.appendChild(productCard);
    });

    // Control de clics para abrir la ventana modal real (Item 10)
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
                // Compara directo con tus campos en minúsculas evitando fallos
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
    modalText.textContent = `¡Excelente elección! Este delicioso plato de nuestra categoría ${product.category} (${product.type}) está preparado con los más selectos ingredientes locales. Puedes solicitarlo de manera prioritaria al confirmar tu asistencia en nuestra pestaña de Booking.`;
    modalPrice.textContent = `Precio: ${product.price}`;

    modal.classList.add('modal-show');

    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) {
        closeBtn.onclick = () => modal.classList.remove('modal-show');
    }

    modal.onclick = (e) => {
        if (e.target === modal) modal.classList.remove('modal-show');
    };
}