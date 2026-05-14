import { getDateTimeInfo, showHideHamburger, windowScroll } from "./base.js";

document.addEventListener('DOMContentLoaded', () => {
    showHideHamburger();
    getDateTimeInfo();
    windowScroll();
    
    // Cargamos los datos apenas abre la página
    fetchMembersData();
});

const businessesContainer = document.querySelector('#businesses');
const dynamicSelector = document.querySelector('#dynamic-businesses');

async function fetchMembersData() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        
        // 1. Llenamos el select para que no esté vacío
        populateSelect(members);
        
        // 2. Mostramos todos los miembros al inicio
        displayMembers(members);
        
    } catch (error) {
        console.error("Error cargando el JSON:", error);
    }
}

// Función para llenar el select con categorías únicas
function populateSelect(members) {
    // Obtenemos categorías únicas (asegúrate que tu JSON tenga el campo "membershipLevel")
    const categories = [...new Set(members.map(m => m.membershipLevel))];
    
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        dynamicSelector.appendChild(option);
    });
}

// Función para dibujar las tarjetas
function displayMembers(members) {
    businessesContainer.innerHTML = ''; // Limpiamos

    members.forEach(member => {
        const card = document.createElement('section');
        card.className = 'card'; // Esta clase es la que tus "cuadrados" necesitan

        // Usamos los nombres exactos de tu JSON (nombre, dirección, etc.)
        card.innerHTML = `
            <img src="${member.image}" alt="Logo de ${member.name}" loading="lazy">
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.contact || member.phone}</p>
            <p><a href="${member.url}" target="_blank">Visit Website</a></p>
            <p class="membership-badge">${member.membershipLevel}</p>
        `;
        businessesContainer.appendChild(card);
    });
}

// --- BOTONES GRID Y LIST ---
document.querySelector('#grid').addEventListener('click', () => {
    businessesContainer.classList.add('grid');
    businessesContainer.classList.remove('list');
});

document.querySelector('#list').addEventListener('click', () => {
    businessesContainer.classList.add('list');
    businessesContainer.classList.remove('grid');
});

// --- FILTRO DEL SELECT ---
dynamicSelector.addEventListener('change', async (e) => {
    const response = await fetch('data/members.json');
    const members = await response.json();
    const selection = e.target.value;

    if (selection === "Select" || selection === "") {
        displayMembers(members);
    } else {
        const filtered = members.filter(m => m.membershipLevel === selection);
        displayMembers(filtered);
    }
});