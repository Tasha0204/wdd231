import { fetchMembers } from "./fetch-members.js";
import { getDateTimeInfo, showHideHamburger, windowScroll } from "./base.js";
// import { updateText } from "./windowsize.js";


document.addEventListener('DOMContentLoaded', () => {


    showHideHamburger();
    getDateTimeInfo();
    windowScroll();
    // updateText();
    fetchMembers();


});

const grid = document.querySelector('#grid');
grid.addEventListener('click', () => {
    if (grid) {

        fetchMembersGrid();


    }


});

const list = document.querySelector('#list');
list.addEventListener('click', () => {
    if (list) {
        fetchMembersList();
    }


});



const dynamicBusinesses = document.querySelector('#dynamic-businesses');
dynamicBusinesses.addEventListener('change', () => {
    if (dynamicBusinesses) {

        // Check user selection

        const choice = document.querySelector('#dynamic-businesses').value;
        const id = choice.split(' ');
        // get the id or order of prophet
        const filter = parseInt(id[0]);


        main(filter)


    }
});

// This main function is the middleman for fetchMembers and filterMembers
// It passes the filter number to locate the chamber member...

async function main(filter) {
    try {
        const members = await fetchMembers();
        filterMembers(members, filter);
    } catch (error) {
        console.error(error);
    }


}






// ============== FILTER A MEMBER ====================

const filterMembers = (members, filter) => {

    // Target card-wrapper class or element
    const businesses = document.querySelector('#businesses');

    // Clear the previous result
    businesses.innerHTML = '';

    businesses.style.display = 'grid';
    businesses.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
    businesses.style.gap = '5px';
    businesses.style.alignItems = 'center';
    businesses.style.alignContent = 'center';
    businesses.style.justifyContent = 'center';
    // businesses.style.fontFamily = 'Montserrat';
    businesses.style.maxWidth = '100vw';
    businesses.style.padding = '5px 0';
    businesses.style.margin = '0 auto';
    // Create a section element and define its class name
    const card = document.createElement('section');
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.alignContent = 'center';
    card.style.justifyContent = 'center';
    card.style.alignItems = 'center';
    card.style.maxWidth = '100%';
    card.style.border = '1px solid #ccc';
    card.style.borderRadius = '5px';
    card.style.margin = '0 auto';
    card.style.padding = '10px';
    card.style.boxShadow = '0px 0px 4px #888';
    card.style.width = '100%';
    card.style.height = 'auto';



    const id = document.createElement('p');

    const name = document.createElement('h4');
    name.style.color = '#000';
    name.style.fontFamily = 'var(--default-font)';
    name.style.textAlign = 'center';

    const address = document.createElement('p');
    const contact = document.createElement('p');
    const imageAlt = document.createElement('p');

    // Create an anchor tag element
    const url = document.createElement('a');


    id.innerHTML = `<span class="label">ID:</span> ${members[filter - 1].id}`;
    name.innerHTML = `<span class="label"></span> ${members[filter - 1].name}`;
    address.innerHTML = `<span class="label">Address:</span> ${members[filter - 1].address}`;
    contact.innerHTML = `<span class="label">Contact:</span> ${members[filter - 1].contact}`;
    imageAlt.innerHTML = `<span class="label">About:</span> ${members[filter - 1].imageAlt}`;


    url.setAttribute('href', members[filter - 1].url);
    url.innerHTML = `<span class="label">Visit:</span>link`;
    // alert(`${members[filter - 1].url}`);

    // Create a span element
    const stats = document.createElement('div');
    stats.className = 'label';
    stats.style.fontSize = '0.8rem';
    stats.style.margin = '0 auto';
    stats.style.maxWidth = '100%';


    // Create an img element and define its class name
    const logo = document.createElement('img');
    logo.className = 'grid';
    logo.style.margin = '20px auto';

    // Set properties for your image element here...
    logo.setAttribute('src', `${members[filter - 1].image}`);
    logo.setAttribute('alt', `Logo of ${members[filter - 1].imageAlt}`);
    logo.setAttribute('loading', 'lazy');
    logo.setAttribute('width', '100');
    logo.setAttribute('height', '100');
    logo.style.border = '1px solid #ccc';
    logo.style.boxShadow = '0px 0px 4px #888';

    // Create a logo link
    const logolink = document.createElement('a');
    logolink.setAttribute('href', members[filter - 1].url);
    logolink.append(logo);


    // Build the card here one element at a time. Finally, append to the businesses class element.

    // stats.append(id);
    stats.append(name);
    stats.append(address);
    stats.append(contact);

    // stats.append(url);

    card.append(stats);
    card.append(logolink);

    businesses.append(card);


}

// ============== GRID VIEW ====================

async function fetchMembersGrid() {

    const leftSideBar = document.querySelector('.left-sidebar');

    // leftSideBar.style.display = 'none';

    // Clear the dropdown values to avoid duplicating the list again.
    document.querySelector('#dynamic-businesses').value = '';

    try {

        const response = await fetch('data/members.json'); // fetch the json file from a relative path


        if (!response.ok) { // Check if no response 
            throw new Error('Could not fetch resource');
        }

        const data = await response.json();  // await for Promise to resolve or be rejected and parse the result as json object

        const members = data;
        // log result to console
        // console.table(members);

        const businesses = document.getElementById('businesses'); // target the businesses div by id

        console.log('Length is: ', members.length); // get the length of the data

        console.log('name: ', members[0].name);

        businesses.innerHTML = ''; // reset display; avoid duplicating the card display.

        // Iterate through each business item from your parsed json data...
        members.forEach(member => {

            dynamicBusinesses.style.display = 'grid';

            businesses.style.display = 'grid';
            businesses.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
            businesses.style.gap = '0.5rem';
            businesses.style.alignItems = 'center';
            businesses.style.alignContent = 'center';
            businesses.style.justifyContent = 'center';
            // businesses.style.fontFamily = 'Montserrat';
            // businesses.style.maxWidth = '80vw';
            businesses.style.padding = '5px 0';
            businesses.style.margin = '0 auto';

            // dynamicBusinesses.style.gridColumn = '2/3';

            const container = document.createElement('div'); // create a div 
            container.className = 'container';
            container.style.display = 'flex';
            container.style.flexDirection = 'column';
            container.style.alignContent = 'center';
            container.style.alignItems = 'center';
            container.style.maxWidth = '100vw';
            container.style.listStyleType = 'none';
            container.style.backgroundColor = '#fff';
            container.style.border = '1px solid #ccc';
            container.style.color = '#000';
            container.style.borderRadius = '5px';
            container.style.boxShadow = '0px 0px 3px #888';
            container.style.height = '23rem';
            container.style.width = '100%';
            // container.style.margin = '0 2rem';
            // container.style.maxWidth = '100vw';

            const subcontainer = document.createElement('div');

            subcontainer.className = 'subcontainer';


            const p = document.createElement('p');
            p.className = 'business-labels';

            const img = document.createElement('img');
            img.id = 'business-img';

            const ul = document.createElement('ul');
            ul.id = 'business-ul';
            ul.style.display = 'flex';
            ul.style.alignItems = 'center';
            ul.style.justifyItems = 'center';
            ul.style.alignContent = 'center';
            ul.style.margin = '0 auto';

            const li = document.createElement('li');
            li.id = 'business-li';

            const a = document.createElement('a');
            a.id = 'business-links';


            container.innerHTML = ` <a href='${member.url}'><img id='business-img' src=${member.image} width='150px' height='auto'></a>
                                    <span class='business-labels'> Name: </span> <p>${member.name}</p>  
                                    <span class='business-labels'> Address: </span> <p> ${member.address}</p>
                                    <span class='business-labels'> Phone: </span> <p>${member.contact}</p>`;
            subcontainer.appendChild(a);
            subcontainer.appendChild(li);
            subcontainer.appendChild(ul);
            subcontainer.appendChild(p);
            subcontainer.appendChild(img);
            subcontainer.appendChild(container);
            businesses.appendChild(container);


        });


    }

    catch (error) {
        console.error(error);
    }


};


// ============== LIST VIEW ====================

async function fetchMembersList() {

    const leftSideBar = document.querySelector('.left-sidebar');

    // leftSideBar.style.display = 'block';

    // Clear the dropdown values to avoid duplicating the list again.
    document.querySelector('#dynamic-businesses').value = '';

    try {

        const response = await fetch('data/members.json'); // fetch the json file from a relative path

        if (!response.ok) { // Check if no response 
            throw new Error('Could not fetch resource');
        }

        const data = await response.json();  // await for Promise to resolve or be rejected and parse the result as json object

        const members = data;

        console.log(members); // log result to console

        const businesses = document.getElementById('businesses'); // target the businesses div by id

        console.log(data.length); // get the length of the data

        businesses.innerHTML = ''; // reset display; avoid duplicating the card display.

        // Iterate through each business item from your parsed json data...
        members.forEach(member => {

            businesses.style.display = 'flex';
            businesses.style.flexDirection = 'column';
            businesses.style.gap = '0.5rem';
            businesses.style.alignItems = 'flex-start';
            businesses.style.alignContent = 'flex-start';
            businesses.style.justifyContent = 'center';
            businesses.style.margin = '0 auto';
            // businesses.style.fontFamily = 'Montserrat';

            const container = document.createElement('div'); // create a div 
            container.className = 'container';
            container.style.display = 'flex';
            // container.style.flexDirection = 'row';
            container.style.alignContent = 'left';
            container.style.alignItems = 'left';

            container.style.listStyleType = 'none';
            container.style.backgroundColor = '#fff';
            container.style.border = '1px solid #ccc';
            // container.style.padding = '0';
            // container.style.marginLeft = '5px';
            container.style.color = '#000';
            // container.style.borderRadius = '5px';
            container.style.boxShadow = '0px 0px 3px #888';
            container.style.height = '25rem';
            container.style.width = '100%';
            // container.style.margin = '0 1rem';
            // container.style.maxWidth = '100vw';
            container.style.fontSize = 'small';


            const p = document.createElement('p');
            p.className = 'business-labels';

            const img = document.createElement('img');
            img.id = 'business-img';
            img.loading = 'lazy';

            const ul = document.createElement('ul');
            ul.id = 'business-ul';

            const li = document.createElement('li');
            li.id = 'business-li';

            const a = document.createElement('a');
            a.id = 'business-links';



            container.innerHTML = ` <span class='business-labels'> Name: </span> <p>${member.name}</p>  
                                    <span class='business-labels'> Address: </span> <p> ${member.address}</p>
                                    <span class='business-labels'> Phone: </span> <p>${member.contact}</p> 
                                    <a href='${member.url}'><img id='business-img' src=${member.image} width='50px' height='auto'></a>`;

            container.appendChild(a);

            container.appendChild(li);

            container.appendChild(ul);

            businesses.appendChild(container);



        });


    }

    catch (error) {
        console.error(error);
    }



}