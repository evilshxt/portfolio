// This file now handles only specific about section animations
// Most section visibility logic has been moved to script.js

// Handle mobile navigation for smaller screens
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.querySelector('.sidebar');

// Only initialize mobile menu if we're on a mobile device
function initMobileMenu() {
    if (window.innerWidth <= 768) {
        // Show the sidebar toggle button
        if (sidebarToggle) {
            sidebarToggle.style.display = 'block';
        }
        
        // Add toggle functionality
        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('mobile-active');
                sidebarToggle.classList.toggle('active');
            });
        }
    } else {
        // Hide toggle button on larger screens
        if (sidebarToggle) {
            sidebarToggle.style.display = 'none';
        }
    }
}

// Initialize mobile menu on load
window.addEventListener('load', initMobileMenu);

// Update mobile menu on resize
window.addEventListener('resize', initMobileMenu);

// Specific about section animations can be added here if needed