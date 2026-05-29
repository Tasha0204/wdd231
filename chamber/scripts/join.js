document.addEventListener('DOMContentLoaded', () => {
    
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    
    const currentYearElement = document.getElementById('currentyear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // 3. Colocar la última fecha de modificación en el footer
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }
   
    document.querySelectorAll('.membership-card').forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) modal.style.display = "block";
        });
    });

   
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const openModal = e.target.closest('.modal');
            if (openModal) openModal.style.display = "none";
        });
    });
});