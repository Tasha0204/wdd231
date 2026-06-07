document.addEventListener('DOMContentLoaded', () => {
    // 1. Capturamos la URL actual con los parámetros (Criterio 7 de la rúbrica)
    const currentUrl = window.location.search;
    const urlParams = new URLSearchParams(currentUrl);

    const resultsContainer = document.getElementById('results');
    if (!resultsContainer) return;

    // 2. Extraemos cada propiedad enviada por el formulario mediante su atributo "name"
    const name = urlParams.get('name') || 'No especificado';
    const email = urlParams.get('email') || 'No especificado';
    const phone = urlParams.get('phone') || 'No especificado';
    const bookingType = urlParams.get('booking_type') || 'No especificado';
    const dateTime = urlParams.get('date_time') || 'No especificado';
    const notes = urlParams.get('notes') || 'Ninguna';
    const timestamp = urlParams.get('timestamp') || '';

    // Formatear la fecha para que se vea más amigable
    const formattedDate = dateTime.replace('T', ' a las ');

    // 3. Inyectamos los valores en una lista estructurada limpia
    resultsContainer.innerHTML = `
        <ul class="summary-list">
            <li><strong>Cliente:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Teléfono:</strong> ${phone}</li>
            <li><strong>Servicio:</strong> ${bookingType}</li>
            <li><strong>Fecha y Hora:</strong> ${formattedDate}</li>
            <li><strong>Notas Adicionales:</strong> ${notes}</li>
        </ul>
        <p class="timestamp-stamp"><small>Envío registrado el: ${new Date(timestamp).toLocaleString()}</small></p>
    `;
});