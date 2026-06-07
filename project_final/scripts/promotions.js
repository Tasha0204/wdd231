
function fetchPromotions() {

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

    container.innerHTML = '';

    promotions.forEach(promo => {

        const card = document.createElement('div');
        card.classList.add('promotion-card');

 
        card.innerHTML = `
            <img src="${promo.image}" alt="${promo.title}" class="promo-image">
            <h4>${promo.title}</h4>
            <p>${promo.description}</p>
        `;

        container.appendChild(card);
    });
}

fetchPromotions();