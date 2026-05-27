document.addEventListener('DOMContentLoaded', () => {
    // 1. Timestamp
    const timestamp = document.getElementById('timestamp');
    if (timestamp) timestamp.value = new Date().toISOString();

    // 2. Abrir modales
    const cards = document.querySelectorAll('.membership-card');
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const modals = ['modal-np', 'modal-bronze', 'modal-silver', 'modal-gold'];
            document.getElementById(modals[index]).style.display = "block";
        });
    });

    // 3. Cerrar modales (buscando la clase .close-btn)
    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.target.closest('.modal').style.display = "none";
        });
    });
});