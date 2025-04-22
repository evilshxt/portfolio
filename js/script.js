// Theme Management
const themes = {
    gx: {
        '--bg': '#0d1117',
        '--text': '#ffffff',
        '--accent': '#58a6ff',
        '--bg-alt': '#161b22',
        '--sidebar-bg': '#0a0f14'
    },
    cyberpunk: {
        '--bg': '#1a001a',
        '--text': '#f8f8f8',
        '--accent': '#ff00ff',
        '--bg-alt': '#2a0033',
        '--sidebar-bg': '#1a001f'
    },
    matrix: {
        '--bg': '#000000',
        '--text': '#00ff00',
        '--accent': '#00cc00',
        '--bg-alt': '#0a0a0a',
        '--sidebar-bg': '#000000'
    },
    vaporwave: {
        '--bg': '#fdf6ff',
        '--text': '#5b2a86',
        '--accent': '#ff77ff',
        '--bg-alt': '#ffffff',
        '--sidebar-bg': '#f0e0ff'
    },
    default: {
        '--bg': '#121212',
        '--text': '#e0e0e0',
        '--accent': '#ff6b6b',
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
    // Remove all theme classes first
    root.className = ''; // Clear all classes
    root.classList.add(`theme-${theme}`);
    
    // Update CSS variables directly
    const selectedPalette = themes[theme];
    for (let variable in selectedPalette) {
        root.style.setProperty(variable, selectedPalette[variable]);
    }
    
    // Update active button state
    themeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
    });
    
    // Save the selected theme
    saveTheme(theme);
}

// Navigation System
const navLinks = document.querySelectorAll('.sidebar-nav-link');
const sections = document.querySelectorAll('.section');
const mainContent = document.getElementById('main-content');

function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('visible', 'active');
    });
    
    document.querySelectorAll('.progress-bar').forEach(bar => {
        bar.style.width = '0';
    });
    
    document.querySelectorAll('.profile-image, .intro-text').forEach(el => {
        el.classList.remove('fade-in');
    });
    
    document.querySelectorAll('.typing-animation').forEach(el => {
        el.classList.remove('typing-animation', 'typing-complete');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('visible', 'active');
        
        setTimeout(() => {
            targetSection.scrollIntoView({ behavior: 'instant', block: 'start' });
        }, 10);
        
        if (sectionId === 'about') {
            handleAboutAnimations(targetSection);
        } else if (sectionId === 'skills') {
            handleSkillsAnimations(targetSection);
        }
    }
    
    updateActiveNavLink(sectionId);
}

function handleAboutAnimations(section) {
    const title = section.querySelector('.about-title');
    const profileImage = section.querySelector('.profile-image');
    const introText = section.querySelector('.intro-text');
    
    if (title) {
        title.classList.add('typing-animation');
        setTimeout(() => {
            title.classList.add('typing-complete');
        }, 3500);
    }
    
    setTimeout(() => {
        if (profileImage) profileImage.classList.add('fade-in');
        setTimeout(() => {
            if (introText) introText.classList.add('fade-in');
        }, 500);
    }, 2000);
}

function handleSkillsAnimations(section) {
    const progressBars = section.querySelectorAll('.progress-bar');
    setTimeout(() => {
        progressBars.forEach((bar) => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    }, 300);
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
    const initialSection = window.location.hash.substring(1) || 'about';
    showSection(initialSection);
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            showSection(sectionId);
            window.history.pushState(null, null, `#${sectionId}`);
        });
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (window.innerWidth <= 768) {
        if (sidebarToggle) sidebarToggle.style.display = 'block';
        
        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('mobile-active');
                sidebarToggle.classList.toggle('active');
            });
        }
    } else {
        if (sidebarToggle) sidebarToggle.style.display = 'none';
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Load theme first
    loadTheme();
    
    // Set up theme buttons
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
    
    // Initialize other systems
    initNavigation();
    initMobileMenu();
});

// Event listeners
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showSection(hash);
    }
});

window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showSection(hash);
    }
});

window.addEventListener('resize', () => {
    initMobileMenu();
    
    sections.forEach(section => {
        if (section.classList.contains('active')) {
            section.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
    });
});