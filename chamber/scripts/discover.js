const menuButton = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");

menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

document.querySelector("#currentyear").textContent =
new Date().getFullYear();

document.querySelector("#lastModified").textContent =
document.lastModified;

const visitMessage = document.querySelector("#visit-message");

const lastVisit = localStorage.getItem("lastVisit");

const now = Date.now();

if (!lastVisit) {

    visitMessage.textContent =
    "Welcome! Let us know if you have any questions.";

} else {

    const daysBetween =
    Math.floor((now - Number(lastVisit)) / 86400000);

    if (daysBetween < 1) {

        visitMessage.textContent =
        "Back so soon! Awesome!";

    } else if (daysBetween === 1) {

        visitMessage.textContent =
        "You last visited 1 day ago.";

    } else {

        visitMessage.textContent =
        `You last visited ${daysBetween} days ago.`;
    }
}

localStorage.setItem("lastVisit", now);

// Discover Cards
const container = document.querySelector("#discover-grid");

async function getPlaces() {

    try {

        const response =
        await fetch("data/discover.json");

        const places =
        await response.json();

        displayPlaces(places);

    } catch (error) {

        console.error("Error loading JSON:", error);

        container.innerHTML =
        "<p>Unable to load locations.</p>";
    }
}

function displayPlaces(places) {

    places.forEach((place, index) => {

        const card =
        document.createElement("article");

        card.classList.add("card");

        card.style.gridArea =
        `card${index + 1}`;

        card.innerHTML = `
            <h2>${place.name}</h2>

            <figure>
                <img
                    src="${place.image}"
                    alt="${place.name}"
                    loading="lazy">
            </figure>

            <address>${place.address}</address>

            <p>${place.description}</p>

            <a
                href="${place.url}"
                target="_blank"
                class="learn-btn">
                Learn More
            </a>
        `;

        container.appendChild(card);
    });
}

getPlaces();