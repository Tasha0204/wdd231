document.addEventListener('DOMContentLoaded', () => {

    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

    const lastModifiedSpan = document.getElementById('lastModified');
    if (lastModifiedSpan) lastModifiedSpan.textContent = document.lastModified;

    loadWeatherData();

    loadFeaturedProducts();
});

function loadWeatherData() {
    const currentContainer = document.getElementById('weather-current');
    const forecastContainer = document.getElementById('weather-forecast');

    if (currentContainer) {
        currentContainer.innerHTML = `
            <p style="font-size: 1.6rem; font-weight: bold; margin: 0.5rem 0; color: var(--primary-color);">19°C</p>
            <p><strong>Condition:</strong> Mild coastal fog</p>
            <p>Humidity: 85% | Wind: 12 km/h</p>
        `;
    }

    if (forecastContainer) {
        forecastContainer.innerHTML = `
            <div class="forecast-day" style="background: var(--light-bg); padding: 0.8rem; border-radius: 6px; text-align: center; flex: 1;">
                <p><strong>Mon</strong></p>
                <div class="weather-icon" style="font-size: 1.5rem; margin: 0.3rem 0;">☁️</div>
                <p>19°C</p>
            </div>
            <div class="forecast-day" style="background: var(--light-bg); padding: 0.8rem; border-radius: 6px; text-align: center; flex: 1;">
                <p><strong>Tue</strong></p>
                <div class="weather-icon" style="font-size: 1.5rem; margin: 0.3rem 0;">⛅</div>
                <p>20°C</p>
            </div>
            <div class="forecast-day" style="background: var(--light-bg); padding: 0.8rem; border-radius: 6px; text-align: center; flex: 1;">
                <p><strong>Wed</strong></p>
                <div class="weather-icon" style="font-size: 1.5rem; margin: 0.3rem 0;">🌫️</div>
                <p>18°C</p>
            </div>
        `;
    }
}


async function loadFeaturedProducts() {
    const promoContainer = document.getElementById('promotions-container');
    if (!promoContainer) return;

    try {
        const response = await fetch('data/product.json');
        if (!response.ok) throw new Error('Could not load products.');
        
        const products = await response.json();

        const shuffled = products.sort(() => 0.5 - Math.random());
        const featured = shuffled.slice(0, 3);

        promoContainer.innerHTML = ''; 

        featured.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('spotlight-card');
            card.style.border = '1px solid var(--border-color)';
            card.style.borderRadius = '8px';
            card.style.padding = '1rem';
            card.style.backgroundColor = 'var(--white)';
            card.style.textAlign = 'center';
            card.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.05)'; 
            
            card.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 6px;" loading="lazy">
                <h3 style="margin: 0.5rem 0; color: var(--primary-color);">${item.name}</h3>
                <p style="font-size: 0.85rem; color: #666; font-style: italic;">${item.type}</p>
                <p style="font-size: 0.9rem; margin: 0.5rem 0; height: 40px; overflow: hidden;">${item.description}</p>
                <p style="font-weight: bold; color: var(--secondary-color); font-size: 1.1rem; margin-top: 10px;">${item.price}</p>
            `;
            promoContainer.appendChild(card);
        });

    } catch (error) {
        console.error('Error:', error);
        promoContainer.innerHTML = `<p class="loading-message">Enjoy our finest coffee blends by visiting our Products tab.</p>`;
    }
}