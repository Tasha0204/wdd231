export { fetchMembers, dropdownMembers };

async function fetchMembers() {
    try {
        const response = await fetch('data/members.json'); // fetch the json file from a relative path


        if (!response.ok) { // Check if no response 
            throw new Error('Could not fetch resource');
        }

        const members = await response.json();  // await for Promise to resolve or be rejected and parse the result as json object
        dropdownMembers(members);
        return members;


    } catch (error) {
        console.error(error);
    }
}

// Populate your dropdown with the chamber's  member's names.

const dropdownMembers = (members) => {

    const selector = document.querySelector('#dynamic-businesses');

    members.forEach((member) => {


        // populate the dropdown with the member's names
        const memberName = `${member.id} ${member.name}`;

        // Check if the option already exists...
        const existingOption = Array.from(selector.options).some(option => option.value === `${member.id} ${member.name}`);
        // Create the dropdown list only if empty initially...
        if (!existingOption) {

            const option = document.createElement('option');

            option.value = memberName;
            option.textContent = memberName;

            selector.append(option);


        }


    });

}