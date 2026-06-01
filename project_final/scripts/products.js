import { loadProducts, filterProducts } from './menu-handler.js';
import { initializeTheme } from './theme-manager.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the saved theme or background settings
    initializeTheme();

    // Synchronize the current year dynamically in the footer
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Update dynamically the last modification field
    const lastModifiedSpan = document.getElementById('lastModified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }

    // Initial load of the products in the grid
    if (document.getElementById('all-pets-grid')) {
        loadProducts();
    }
    
    // Support for featured items section on landing page if it exists
    if (document.getElementById('featured-pets-grid')) {
        loadProducts(true);
    }

    // Listen for category selection updates (Filters)
    const filterSelect = document.getElementById('filter');
    if (filterSelect) {
        filterSelect.addEventListener('change', (event) => {
            filterProducts(event.target.value);
        });
    }
});