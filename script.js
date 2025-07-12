// Project data
const projects = [
    {
        title: "Legal Client Panel",
        description: "Comprehensive client management system with document handling and case tracking.",
        category: "Web Projects",
        tech: ["ASP.NET MVC", "MySQL", "Entity Framework", "JavaScript"],
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
        github: "#",
        demo: "#"
    },
    {
        title: "Accounting Software for Manufacturing",
        description: "Real-time inventory management with live item value calculations and reporting.",
        category: "Web Projects", 
        tech: ["ASP.NET MVC", "MySQL", "Real-time Updates", "Charts"],
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
        github: "#",
        demo: "#"
    },
    {
        title: "Xphloria.com Website",
        description: "SEO-optimized corporate website with smooth animations and content management.",
        category: "Web Projects",
        tech: ["HTML", "CSS", "JavaScript", "SEO", "CMS"],
        image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=400&fit=crop",
        github: "#",
        demo: "#"
    },
    {
        title: "Bubble No-Code App",
        description: "Full-featured application built with reusable elements and complex workflows.",
        category: "No-Code Projects",
        tech: ["Bubble.io", "Workflows", "Database Design", "API Integration"],
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
        github: "#",
        demo: "#"
    },
    {
        title: "Attendance Management App",
        description: "Mobile app for tracking attendance with real-time synchronization and reporting.",
        category: "App Projects",
        tech: ["Flutter", ".NET Web API", "MySQL", "REST API"],
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
        github: "#",
        demo: "#"
    }
];

// State variables
let activeFilter = 'All';
let isDarkMode = true;
let isMenuOpen = false;

// DOM Elements
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const projectsGrid = document.getElementById('projectsGrid');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Setup event listeners
    setupEventListeners();
    
    // Render initial projects
    renderProjects();
    
    // Setup scroll tracking
    setupScrollTracking();
    
    // Set initial theme
    updateTheme();
});

// Setup all event listeners
function setupEventListeners() {
    // Theme toggles
    themeToggle.addEventListener('click', toggleTheme);
    mobileThemeToggle.addEventListener('click', toggleTheme);
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', toggleMobileMenu);
    
    // Navigation links
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            scrollToSection(section);
            closeMobileMenu();
        });
    });
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            setActiveFilter(filter);
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-bar') && isMenuOpen) {
            closeMobileMenu();
        }
    });
}

// Theme functions
function toggleTheme() {
    isDarkMode = !isDarkMode;
    updateTheme();
}

function updateTheme() {
    if (isDarkMode) {
        body.classList.remove('light');
        body.classList.add('dark');
    } else {
        body.classList.remove('dark');
        body.classList.add('light');
    }
    
    // Update theme icons
    updateThemeIcons();
}

function updateThemeIcons() {
    const themeIcons = document.querySelectorAll('.theme-icon');
    themeIcons.forEach(icon => {
        if (isDarkMode) {
            icon.setAttribute('data-lucide', 'sun');
        } else {
            icon.setAttribute('data-lucide', 'moon');
        }
    });
    lucide.createIcons();
}

// Mobile menu functions
function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.add('show');
        menuToggle.querySelector('i').setAttribute('data-lucide', 'x');
    } else {
        mobileMenu.classList.remove('show');
        menuToggle.querySelector('i').setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
}

function closeMobileMenu() {
    if (isMenuOpen) {
        isMenuOpen = false;
        mobileMenu.classList.remove('show');
        menuToggle.querySelector('i').setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    }
}

// Navigation functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function setupScrollTracking() {
    window.addEventListener('scroll', function() {
        const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
        const scrollPosition = window.scrollY + 100;

        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const { offsetTop, offsetHeight } = element;
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                    updateActiveNavLink(section);
                    break;
                }
            }
        }
    });
}

function updateActiveNavLink(activeSection) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === activeSection) {
            link.classList.add('active');
        }
    });
}

// Project filtering functions
function setActiveFilter(filter) {
    activeFilter = filter;
    
    // Update filter button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === filter) {
            btn.classList.add('active');
        }
    });
    
    // Re-render projects
    renderProjects();
}

function renderProjects() {
    const filteredProjects = activeFilter === 'All' 
        ? projects 
        : projects.filter(project => project.category === activeFilter);
    
    projectsGrid.innerHTML = '';
    
    filteredProjects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}">
            <div class="image-overlay"></div>
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-buttons">
                <a href="${project.github}" class="btn btn-outline btn-sm">
                    <i data-lucide="github"></i>
                    Code
                </a>
                <a href="${project.demo}" class="btn btn-primary btn-sm">
                    <i data-lucide="external-link"></i>
                    Demo
                </a>
            </div>
        </div>
    `;
    
    // Re-initialize icons for the new content
    setTimeout(() => lucide.createIcons(), 0);
    
    return card;
}

// Utility functions
window.scrollToSection = scrollToSection; // Make it globally available for onclick handlers
