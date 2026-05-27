// Espera a que todo el HTML se cargue primero
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Timestamp (Punto 12)
    const timestamp = document.getElementById('timestamp');
    if (timestamp) {
        timestamp.value = new Date().toISOString();
    }

    // 2. Modales: Abrir (Punto 11)
    // Buscamos todos los botones que tienen la clase 'modal-trigger'
    const triggers = document.querySelectorAll('.membership-card');
    
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            // Obtenemos el texto del nivel para saber qué modal abrir
            const text = trigger.textContent.toLowerCase();
            let modalId = '';
            
            if (text.includes('non-profit')) modalId = 'modal-np';
            else if (text.includes('bronze')) modalId = 'modal-bronze';
            else if (text.includes('silver')) modalId = 'modal-silver';
            else if (text.includes('gold')) modalId = 'modal-gold';

            if (modalId) {
                document.getElementById(modalId).style.display = "block";
            }
        });
    });

    // 3. Modales: Cerrar
    // Buscamos todos los botones dentro de los modales para cerrar
    const closeButtons = document.querySelectorAll('.modal button');
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Cerramos el modal padre del botón clicado
            e.target.closest('.modal').style.display = "none";
        });
    });
});