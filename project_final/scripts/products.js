
    const products = [
        {
            name: "Cappuccino",
            description: "Café espresso con leche vaporizada y espuma.",
            price: 12.00,
            image: "images/cappuccino.jpg"
        },
        {
            name: "Latte",
            description: "Suave mezcla de espresso y leche.",
            price: 13.00,
            image: "images/latte.jpg"
        },
        {
            name: "Mocha",
            description: "Café con chocolate y crema.",
            price: 15.00,
            image: "images/mocha.jpg"
        },
        {
            name: "Sánguche de Pollo",
            description: "Pollo deshilachado, lechuga y mayonesa.",
            price: 14.00,
            image: "images/pollo.jpg"
        },
        {
            name: "Sánguche de Jamón y Queso",
            description: "Jamón artesanal y queso fundido.",
            price: 13.00,
            image: "images/jamonqueso.jpg"
        },
        {
            name: "Cheesecake",
            description: "Pastel cremoso con base de galleta.",
            price: 10.00,
            image: "images/cheesecake.jpg"
        },
        {
            name: "Torta de Chocolate",
            description: "Bizcocho húmedo con cobertura de chocolate.",
            price: 11.00,
            image: "images/chocolatecake.jpg"
        }
    ];

    displayProducts(products);
}

function displayProducts(products) {
    const container = document.getElementById('coffee-container');

    if (!container) return;

    container.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');

        card.classList.add('product-card');

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <p><strong>S/ ${product.price.toFixed(2)}</strong></p>
        `;

        container.appendChild(card);
    });
}
