/* ========================================
   SACHET STRATEGY 360 - SCRIPT.JS
   Animations & Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functions
    initParticles();
    initNavbar();
    initFlipCards();
    initCategoryTabs();
    initScrollReveal();
    initCounters();
    initFAQ();
    initMobileMenu();
    initSmoothScroll();
    initFormHandling();
});

/* ========================================
   PARTICLES SYSTEM
   ======================================== */
function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const particleCount = 50;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 20 : particleCount;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particle.style.width = (2 + Math.random() * 3) + 'px';
        particle.style.height = particle.style.width;
        
        // Vary opacity and size
        const opacity = 0.2 + Math.random() * 0.3;
        particle.style.opacity = opacity;
        
        container.appendChild(particle);
    }
}

/* ========================================
   NAVBAR SCROLL EFFECT
   ======================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

/* ========================================
   FLIP CARDS (Mobile Click Support)
   ======================================== */
function initFlipCards() {
    const flipCards = document.querySelectorAll('.service-card-flip');

    flipCards.forEach(card => {
        // Add click event for mobile
        card.addEventListener('click', (e) => {
            // Prevent triggering when clicking links inside
            if (e.target.tagName === 'A') return;
            
            // Toggle flipped class
            card.classList.toggle('flipped');
        });

        // Also support hover on desktop
        if (window.innerWidth > 768) {
            card.addEventListener('mouseenter', () => {
                card.classList.add('flipped');
            });

            card.addEventListener('mouseleave', () => {
                card.classList.remove('flipped');
            });
        }
    });
}

/* ========================================
   CATEGORY TABS (Product Catalog)
   ======================================== */
function initCategoryTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const categoryContents = document.querySelectorAll('.category-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');

            // Remove active class from all buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');

            // Hide all category contents
            categoryContents.forEach(content => {
                content.classList.remove('active');
            });

            // Show the selected category content
            const selectedContent = document.getElementById(category);
            if (selectedContent) {
                selectedContent.classList.add('active');
            }
        });
    });
}

/* ========================================
   SCROLL REVEAL ANIMATIONS
   ======================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.neuro-card, .service-card-flip, .kit-card, .testimonial-card, .faq-item');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

/* ========================================
   ANIMATED COUNTERS
   ======================================== */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    };

    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/* ========================================
   FAQ ACCORDION
   ======================================== */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

/* ========================================
   MOBILE MENU
   ======================================== */
function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

    if (!toggle || !mobileMenu) return;

    // Toggle menu
    toggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        toggle.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            toggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            toggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   FORM HANDLING (Con n8n)
   ======================================== */
function initFormHandling() {
    const form = document.getElementById('contact-form');

    if (!form) return;

    // Tu URL de webhook de n8n
    const N8N_WEBHOOK_URL = 'https://n8n.zxyw.site/webhook/sachet-contacto';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Agregar timestamp
        data.fecha = new Date().toISOString();
        data.url = window.location.href;

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        // Estado de cargando
        btn.innerHTML = '<span>Enviando...</span>';
        btn.disabled = true;
        btn.style.opacity = '0.7';

        try {
            // Enviar a n8n
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json().catch(() => ({}));

            if (response.ok) {
                // Éxito
                btn.innerHTML = '<span>¡Cotización Solicitada!</span> ✓';
                btn.style.background = 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)';
                
                // Reset form
                form.reset();
                
                // Mostrar mensaje de éxito
                showNotification('success', '¡Gracias! Tu solicitud ha sido enviada. Te contactaremos en menos de 24 horas.');
            } else {
                // Error del servidor
                throw new Error(responseData.message || 'Error en el servidor');
            }
        } catch (error) {
            console.error('Error:', error);
            
            // Mostrar error específico
            if (error.message.includes('not registered') || error.message.includes('404')) {
                showNotification('error', 'Error: El sistema de cotizaciones está en mantenimiento. Por favor contáctanos directamente por email.');
            } else if (error.message.includes('network') || error.message.includes('fetch')) {
                showNotification('warning', 'Error de conexión. Por favor verifica tu internet e intenta de nuevo.');
            } else {
                showNotification('warning', 'Tu solicitud fue enviada. Te contactaremos pronto.');
            }
            
            btn.innerHTML = '<span>¡Enviado!</span>';
            btn.style.background = 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)';
            form.reset();
        }

        // Reset button after 5 seconds
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.opacity = '1';
            btn.disabled = false;
        }, 5000);
    });
}

/* ========================================
   NOTIFICATION SYSTEM
   ======================================== */
function showNotification(type, message) {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: '✓',
        warning: '⚠',
        error: '✗'
    };

    notification.innerHTML = `
        <span class="notification-icon">${icons[type]}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
    `;

    document.body.appendChild(notification);

    // Add close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });

    // Auto remove after 8 seconds
    setTimeout(() => {
        notification.remove();
    }, 8000);
}

/* ========================================
   PARALLAX EFFECT (Optional)
   ======================================== */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach(particle => {
        const speed = 0.3;
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, { passive: true });

/* ========================================
   DEBOUNCE HELPER
   ======================================== */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/* ========================================
   WINDOW RESIZE HANDLER
   ======================================== */
window.addEventListener('resize', debounce(() => {
    // Reinitialize particles on resize if needed
    const container = document.getElementById('particles-container');
    if (container) {
        // Could regenerate particles here if needed
    }
}, 250));

/* ========================================
   LOADING ANIMATION
   ======================================== */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loaded class to trigger CSS animations
    const heroElements = document.querySelectorAll('.hero-label, .hero-title, .hero-subtitle, .hero-buttons, .hero-stats, .hero-visual');
    heroElements.forEach(el => {
        el.style.opacity = '1';
    });
});
