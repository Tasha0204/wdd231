import { loadProducts, filterProducts } from './menu-handler.js';
import { initializeTheme } from './theme-manager.js';

document.addEventListener('DOMContentLoaded', () => {
  
    initializeTheme();
    const currentYearSpan = document.getElementById('currentyear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    const lastModifiedSpan = document.getElementById('lastModified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }

    if (document.getElementById('all-pets-grid')) {
        loadProducts();
    }
    
    if (document.getElementById('featured-pets-grid')) {
        loadProducts(true);
    }

    const filterSelect = document.getElementById('filter');
    if (filterSelect) {
        filterSelect.addEventListener('change', (event) => {
            filterProducts(event.target.value);
        });
    }
});