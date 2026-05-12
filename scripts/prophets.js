
const todaysDate = new Date();
const dateFormat = { year: 'numeric', month: 'short', day: 'numeric' };
const timeFormat = todaysDate.toLocaleTimeString();
const formattedDate = todaysDate.toLocaleDateString('en-US', dateFormat);
const formattedDateTime = formattedDate + " " + timeFormat;

const year = document.querySelector('#currentyear');
year.innerHTML = `<span class="highlight">${todaysDate.getFullYear()}</span>`;

const lastModified = document.querySelector('#lastModified');
lastModified.innerHTML = `<span class="highlight">${formattedDateTime}</span>`;


const cards = document.querySelector("#cards");


const url = "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";


async function getProphetData() {
    try {
        const respuesta = await fetch(url); //
        if (respuesta.ok) {
            const data = await respuesta.json(); //
         
            displayProphets(data.prophets);
        } else {
            console.log("The resource cannot be found.");
        }
    } catch (error) {
        console.error("The error was: ", error);
    }
}


const displayProphets = (prophets) => {
    cards.innerHTML = ''; // Limpiar contenedor

    // 12. Bucle foreach
    prophets.forEach((propheta) => {
        const tarjeta = document.createElement('section');

        const nombreCompleto = document.createElement('h2');

        const retrato = document.createElement('img');

       
        nombreCompleto.textContent = `${propheta.name} ${propheta.lastname}`;

     
        retrato.setAttribute('src', propheta.imageurl);
        retrato.setAttribute('alt', `Portrait of ${propheta.name} ${propheta.lastname}`);
        retrato.setAttribute('loading', 'lazy');
        retrato.setAttribute('width', '340');
        retrato.setAttribute('height', '440');

        
        const nacimiento = document.createElement('p');
        nacimiento.textContent = `Date of Birth: ${propheta.birthdate}`;
        const lugar = document.createElement('p');
        lugar.textContent = `Place of Birth: ${propheta.birthplace}`;

       
        tarjeta.appendChild(nombreCompleto);
        tarjeta.appendChild(nacimiento);
        tarjeta.appendChild(lugar);
        tarjeta.appendChild(retrato);

       
        cards.appendChild(tarjeta);
    });
}


getProphetData();