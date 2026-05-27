// Timestamp (Punto 12)
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('timestamp').value = new Date().toISOString();
});

// Modales (Punto 11)
function openModal(id) { document.getElementById(id).style.display = "block"; }
function closeModal(id) { document.getElementById(id).style.display = "none"; }