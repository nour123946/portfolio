
// Configuration du thème
let currentTheme = localStorage.getItem('theme') || 'dark';

// Initialisation du thème
document.addEventListener('DOMContentLoaded', () => {
    // Appliquer le thème sauvegardé
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeToggle();
    
    // Initialiser toutes les fonctionnalités
    initializeNavigation();
    initializeAnimations();
    initializeTypingEffect();
    initializeParallax();
    initializeScrollEffects();
    initializeCounters();
    initializeContactForm();
    initializeProjectCards();
    initializeScrollToTop();
    createAnimatedBackground();
    
    // Marquer comme chargé
    document.body.classList.add('loaded');
});

// Gestion du toggle de thème
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeToggle();
}

function updateThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
        toggle.innerHTML = currentTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    }
}

// Navigation mobile et effets de scroll
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Menu mobile
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Fermer le menu en cliquant sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Effet de scroll sur la navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(15, 15, 35, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(45, 27, 105, 0.4)';
            } else {
                navbar.style.background = 'rgba(15, 15, 35, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(45, 27, 105, 0.3)';
            }
        }
    });

    // Smooth scrolling pour les liens
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animations d'apparition
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observer tous les éléments avec fade-in
    const fadeElements = document.querySelectorAll('.skill-domain, .project-card, .timeline-item, .contact-item, .about-card');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Effet de typing pour le titre
function initializeTypingEffect() {
    const titleName = document.querySelector('.title-name');
    if (!titleName) return;

    const text = titleName.textContent;
    titleName.textContent = '';
    titleName.style.borderRight = '2px solid #FF6B35';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            titleName.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 120);
        } else {
            // Effet de clignotement du curseur
            setInterval(() => {
                titleName.style.borderRight = titleName.style.borderRight === '2px solid #FF6B35' ? 
                    '2px solid transparent' : '2px solid #FF6B35';
            }, 500);
        }
    };
    
    setTimeout(typeWriter, 1500);
}

// Effet parallax pour les formes flottantes
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.3;
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// Effets de scroll avancés
function initializeScrollEffects() {
    const revealElements = document.querySelectorAll('.skill-domain, .project-card, .timeline-item, .about-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px) scale(0.95)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(element);
    });
}

// Animation des compteurs
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    if (counters.length === 0) return;

    const countersObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                animateCounters();
                countersAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) {
        countersObserver.observe(aboutStats);
    }
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 60;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Gestion du formulaire de contact
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Animation du bouton de soumission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        // Simulation d'envoi
        setTimeout(() => {
            showNotification('Message envoyé avec succès! Je vous répondrai bientôt.', 'success');
            contactForm.reset();
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Fonction pour afficher les notifications améliorées
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #2D1B69, #00D4FF)' : '#FF6B35'};
        color: white;
        padding: 20px 25px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Suppression automatique
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 400);
    }, 5000);
}

// Animations des cartes de projet
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Effet hover amélioré
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.03)';
            card.style.boxShadow = '0 30px 60px rgba(45, 27, 105, 0.4)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(45, 27, 105, 0.3)';
        });

        // Gestion des boutons "Voir le projet"
        const viewButton = card.querySelector('.btn-view');
        if (viewButton) {
            viewButton.addEventListener('click', (e) => {
                e.stopPropagation();
                const projectTitle = card.querySelector('h3').textContent;
                showNotification(`Projet "${projectTitle}" - Lien vers le projet à venir!`, 'success');
                
                // Effet de ripple
                createRippleEffect(e, viewButton);
            });
        }
    });
}

// Effet de ripple pour les boutons
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    // Style pour l'animation ripple
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Bouton scroll to top
function initializeScrollToTop() {
    // Créer le bouton
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    document.body.appendChild(scrollTopBtn);
    
    // Créer le bouton de toggle de thème
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.addEventListener('click', toggleTheme);
    document.body.appendChild(themeToggle);
    
    // Gestion de l'affichage du bouton scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
}

// Créer l'arrière-plan animé avec particules
function createAnimatedBackground() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    // Créer des particules flottantes
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (4 + Math.random() * 4) + 's';
        
        // Variations de couleur pour les particules
        const colors = ['#2D1B69', '#00D4FF', '#FF6B35'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

// Animation des tuiles de compétences
document.addEventListener('DOMContentLoaded', () => {
    const skillTiles = document.querySelectorAll('.skill-tile');
    
    skillTiles.forEach((tile, index) => {
        // Animation d'apparition décalée
        setTimeout(() => {
            tile.style.opacity = '1';
            tile.style.transform = 'translateY(0)';
        }, index * 50);
        
        // Effet d'ondulation au survol
        tile.addEventListener('mouseenter', () => {
            tile.style.animation = 'tileWave 0.6s ease-out';
        });
        
        tile.addEventListener('animationend', () => {
            tile.style.animation = '';
        });
    });
});

// Ajout du style pour l'animation de vague
if (!document.getElementById('tile-wave-style')) {
    const style = document.createElement('style');
    style.id = 'tile-wave-style';
    style.textContent = `
        @keyframes tileWave {
            0% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.05) rotate(1deg); }
            50% { transform: scale(1.1) rotate(0deg); }
            75% { transform: scale(1.05) rotate(-1deg); }
            100% { transform: scale(1) rotate(0deg); }
        }
    `;
    document.head.appendChild(style);
}

// Gestion du redimensionnement de la fenêtre
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Réajuster les animations si nécessaire
        const navbar = document.querySelector('.navbar');
        if (navbar && window.innerWidth <= 768) {
            navbar.style.background = 'rgba(15, 15, 35, 0.98)';
        }
    }, 250);
});

// Initialisation finale
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Précharger les animations
    setTimeout(() => {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(el => {
            el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }, 100);
});

// Performance monitoring
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Optimisations de performance pour les animations
        const expensiveAnimations = document.querySelectorAll('.shape, .particle');
        expensiveAnimations.forEach(el => {
            el.style.willChange = 'transform';
        });
    });
}
