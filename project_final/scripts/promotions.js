// promotions.js

function fetchPromotions() {
    // 1. Aquí definimos los datos, incluyendo la ruta de tus imágenes.
    // Asegúrate de tener las imágenes en la carpeta de tu proyecto.
    const promotions = [
        {
            title: "2x1 en Cappuccino",
            description: "Todos los martes de 3 PM a 6 PM.",
            image: "images/capuchino.jpg" 
        },
        {
            title: "Combo Desayuno",
            description: "Latte + Sánguche por S/ 20.",
            image: "images/latte+sanguche.webp"
        },
        {
            title: "Happy Coffee Hour",
            description: "20% de descuento en todos los cafés.",
            image:"images/cafe.jpg"
        }
    ];

    displayPromotions(promotions);
}

function displayPromotions(promotions) {
    const container = document.getElementById('promotions-container');

    if (!container) return;

    // Limpiamos el contenedor antes de inyectar las tarjetas
    container.innerHTML = '';

    promotions.forEach(promo => {
        // Creamos el elemento div para la tarjeta
        const card = document.createElement('div');
        card.classList.add('promotion-card');

        // Insertamos la imagen, el título y la descripción
        card.innerHTML = `
            <img src="${promo.image}" alt="${promo.title}" class="promo-image">
            <h4>${promo.title}</h4>
            <p>${promo.description}</p>
        `;

        // Agregamos la tarjeta al contenedor principal
        container.appendChild(card);
    });
}

// Llamamos a la función para que se ejecute al cargar el archivo
fetchPromotions();