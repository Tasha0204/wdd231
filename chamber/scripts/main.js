// 1. Gestión de Fechas del Footer y Menú Responsive
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = `Última modificación: ${document.lastModified}`;

const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// ==========================================
// 2. Integración de API Clima (OpenWeatherMap)
// ==========================================
const apiKey = 'TU_API_KEY'; // Cambia esto por tu API Key real
const lat = '-12.0464';      // Ejemplo: Latitud de Lima
const lon = '-77.0428';      // Ejemplo: Longitud de Lima
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`;

async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error('Error al obtener datos meteorológicos');
        const data = await response.json();
        
        displayCurrentWeather(data);
        displayForecast(data);
    } catch (error) {
        console.error(error);
        document.getElementById('weather-current').innerHTML = `<p>No se pudo cargar el clima.</p>`;
    }
}

function displayCurrentWeather(data) {
    const currentContainer = document.getElementById('weather-current');
    const current = data.list[0];
    const temp = Math.round(current.main.temp);
    const desc = current.weather[0].description;
    
    currentContainer.innerHTML = `
        <p><strong>Actual:</strong> ${temp}°C - ${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
        <p>Humedad: ${current.main.humidity}%</p>
    `;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('weather-forecast');
    forecastContainer.innerHTML = ''; // Limpiar contenedor
    
    // Filtramos un registro por día (OpenWeather entrega datos cada 3 horas, tomamos saltos de 8)
    const dailyData = [data.list[8], data.list[16], data.list[24]];
    
    dailyData.forEach(day => {
        const date = new Date(day.dt_txt);
        const options = { weekday: 'long' };
        const dayName = date.toLocaleDateString('es-ES', options);
        const temp = Math.round(day.main.temp);
        
        const dayElement = document.createElement('div');
        dayElement.classList.add('forecast-day');
        dayElement.innerHTML = `
            <p><strong>${dayName.charAt(0).toUpperCase() + dayName.slice(1)}</strong></p>
            <p>${temp}°C</p>
        `;
        forecastContainer.appendChild(dayElement);
    });
}

// ==========================================
// 3. Lógica de Miembros Destacados (JSON & Random)
// ==========================================
const membersUrl = 'data/members.json'; // Ajusta la ruta si está en la raíz

async function fetchSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error('Error al leer el archivo JSON de miembros');
        const members = await response.json();
        
        // Regla: Filtrar solo miembros Gold o Silver
        const eligibleMembers = members.filter(m => m.membershipLevel === 'Gold' || m.membershipLevel === 'Silver');
        
        // Selección Aleatoria: Elegir entre 2 o 3 miembros sin repetir
        const selectedMembers = getRandomMembers(eligibleMembers, 3);
        
        displaySpotlights(selectedMembers);
    } catch (error) {
        console.error(error);
        document.getElementById('spotlight-container').innerHTML = `<p>Error al cargar destaques.</p>`;
    }
}

function getRandomMembers(arr, n) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

function displaySpotlights(membersList) {
    const container = document.getElementById('spotlight-container');
    container.innerHTML = ''; // Limpiar marcador de carga
    
    membersList.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card', member.membershipLevel);
        
        card.innerHTML = `
            <img src="${member.image}" alt="Logo de ${member.name}" loading="lazy">
            <h4>${member.name}</h4>
            <p><strong>Nivel:</strong> ${member.membershipLevel}</p>
            <p>📞 ${member.phone}</p>
            <p>📍 ${member.address}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener">Visitar Sitio Web</a></p>
        `;
        container.appendChild(card);
    });
}

// Ejecución inicial al cargar la página
fetchWeather();
fetchSpotlights();