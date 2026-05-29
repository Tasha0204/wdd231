document.addEventListener('DOMContentLoaded', () => {
    
    
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = Date.now();
    }

    const currentYearElement = document.getElementById('currentyear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }


    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }

   
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
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


    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = "none";
        }
    });
});