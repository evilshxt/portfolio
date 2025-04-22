const projects = [
    {
        title: "Advanced TO-DO Website",
        description: "A full-featured TO-DO application with advanced functionality including persistent storage, theme switching, and analytics to track your productivity.",
        image: "css/assets/todoana.png",
        tech: ["Bootstrap", "HTML", "Vanilla JS-ES6", "CSS 3"],
        demoUrl: "evilshxt.github.io/todo/index.html",
        codeUrl: "#"
    },
    {
        title: "Landing Page For Coffee Shop",
        description: "A responsive landing page for a coffee shop showcasing their products, services, and ambiance with modern design elements.",
        image: "css/assets/brew.png",
        tech: ["Bootstrap", "HTML", "Tailwind CSS"],
        demoUrl: "https://evilshxt.github.io/brewhaven/",
        codeUrl: "#"
    },
    {
        title: "Landing Page For Music Studio",
        description: "An engaging landing page for a music studio featuring animations and clean design to highlight their services and creative space.",
        image: "css/assets/afro.png",
        tech: ["Bootstrap", "HTML", "Tailwind CSS", "AOS.js"],
        demoUrl: "https://evilshxt.github.io/afrocity/index.html",
        codeUrl: "#"
    }
];

function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (projectsGrid) {
        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card">
                <div class="project-image-container">
                    <img src="${project.image}" alt="${project.title}" class="project-image">
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="tech-badges">
                        ${project.tech.map(tech => `<span class="tech-badge" style="transition-delay: ${Math.random() * 0.3}s">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.demoUrl}" class="project-link demo-link" target="_blank">Live Demo</a>
                        <a href="${project.codeUrl}" class="project-link code-link" target="_blank">View Code</a>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Animate cards in
        setTimeout(() => {
            const cards = document.querySelectorAll('.project-card');
            cards.forEach(card => {
                card.classList.add('visible');
            });
        }, 100);
    }
}

// Initialize projects when page loads
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    
    // Animate title
    const title = document.querySelector('.projects-title');
    if (title) {
        setTimeout(() => {
            title.style.animation = 'fadeInUp 1s ease-out forwards';
        }, 100);
    }
});