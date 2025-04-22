// Theme Management
const themes = {
    gx: {
        '--bg': '#0d1117',
        '--text': '#ffffff',
        '--accent': '#58a6ff',
        '--accent-rgb': '88, 166, 255',
        '--bg-alt': '#161b22',
        '--sidebar-bg': '#0a0f14'
    },
    cyberpunk: {
        '--bg': '#1a001a',
        '--text': '#f8f8f8',
        '--accent': '#ff00ff',
        '--accent-rgb': '255, 0, 255',
        '--bg-alt': '#2a0033',
        '--sidebar-bg': '#1a001f'
    },
    matrix: {
        '--bg': '#000000',
        '--text': '#00ff00',
        '--accent': '#00cc00',
        '--accent-rgb': '0, 204, 0',
        '--bg-alt': '#0a0a0a',
        '--sidebar-bg': '#000000'
    },
    vaporwave: {
        '--bg': '#fdf6ff',
        '--text': '#5b2a86',
        '--accent': '#ff77ff',
        '--accent-rgb': '255, 119, 255',
        '--bg-alt': '#ffffff',
        '--sidebar-bg': '#f0e0ff'
    },
    default: {
        '--bg': '#121212',
        '--text': '#e0e0e0',
        '--accent': '#ff6b6b',
        '--accent-rgb': '255, 107, 107',
        '--bg-alt': '#1e1e1e',
        '--sidebar-bg': '#0a0a0a'
    }
};

const themeButtons = document.querySelectorAll('.theme-button');
const root = document.documentElement;
let currentTheme = 'default';
let previousTheme = null;

// Save theme to localStorage
function saveTheme(theme) {
    localStorage.setItem('portfolioTheme', theme);
}

// Load theme from localStorage
function loadTheme() {
    const savedTheme = localStorage.getItem('portfolioTheme');
    if (savedTheme && themes[savedTheme]) {
        currentTheme = savedTheme;
        setTheme(savedTheme);
    }
}

function setTheme(theme) {
    const selectedPalette = themes[theme];
    for (let variable in selectedPalette) {
        root.style.setProperty(variable, selectedPalette[variable]);
    }

    themeButtons.forEach(btn => {
        if (btn.getAttribute('data-theme') === theme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Set input text color based on theme
    const inputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
    if (theme === 'vaporwave') {
        inputs.forEach(input => input.style.color = '#5b2a86');
    } else {
        inputs.forEach(input => input.style.color = '#ffffff');
    }

    saveTheme(theme);
}


// Initialize theme
loadTheme();

themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedTheme = button.getAttribute('data-theme');
        if (selectedTheme !== currentTheme) {
            previousTheme = currentTheme;
            currentTheme = selectedTheme;
            setTheme(selectedTheme);
        } else if (previousTheme && selectedTheme === currentTheme) {
            currentTheme = 'default';
            previousTheme = null;
            setTheme('default');
        }
    });
});

// Navigation System
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

function showSection(sectionId) {
    // Hide all sections first
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Scroll to the top of the section
        setTimeout(() => {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 10);
    }
    
    // Update active nav link
    updateActiveNavLink(sectionId);
    
    // Close mobile menu if open
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse.classList.contains('show')) {
        const toggler = document.querySelector('.navbar-toggler');
        bootstrap.Collapse.getInstance(navbarCollapse).hide();
    }
}

function updateActiveNavLink(sectionId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

// Initialize navigation
function initNavigation() {
    // Set default section based on URL hash or default to 'about'
    const initialSection = window.location.hash.substring(1) || 'about';
    showSection(initialSection);
    
    // Add click event listeners to all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            showSection(sectionId);
            window.history.pushState(null, null, `#${sectionId}`);
        });
    });
}

// Handle hash changes
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showSection(hash);
    }
});

// Handle popstate (back/forward navigation)
window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showSection(hash);
    }
});

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<span>Sending...</span>';
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message
                    const messageElement = document.getElementById('form-message');
                    messageElement.style.display = 'block';
                    contactForm.reset();
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        messageElement.style.display = 'none';
                    }, 5000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                alert('There was a problem sending your message. Please try again later.');
            } finally {
                // Reset button state
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
        });
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initContactForm();
    
    // Initialize Bootstrap components
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', () => {
            const target = navbarToggler.getAttribute('data-bs-target');
            const navbarCollapse = document.querySelector(target);
            navbarCollapse.classList.toggle('show');
        });
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    // Recalculate section positions if needed
    sections.forEach(section => {
        if (section.classList.contains('active')) {
            section.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
    });
});