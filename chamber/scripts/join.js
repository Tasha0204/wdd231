document.addEventListener('DOMContentLoaded', () => {
    // 1. Asignar Timestamp
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // 2. Abrir modales (usando data-modal)
    document.querySelectorAll('.membership-card').forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) modal.style.display = "block";
        });
    });

    // 3. Cerrar modales (usando la clase close-btn)
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal').style.display = "none";
        });
    });
});