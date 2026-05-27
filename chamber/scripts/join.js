document.addEventListener('DOMContentLoaded', () => {
    // 1. Manejo del Timestamp
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // 2. Manejo de abrir modales (Event Listeners)
    const triggers = document.querySelectorAll('.modal-trigger');
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal');
            document.getElementById(modalId).style.display = "block";
        });
    });

    // 3. Manejo de cerrar modales
    const closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            document.getElementById(modalId).style.display = "none";
        });
    });
});