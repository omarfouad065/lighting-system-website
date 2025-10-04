// Main JavaScript file for Luminous Events website - Dark Mode

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initAnimations();
    initMobileMenu();
    initFormValidation();
    initScrollEffects();
    initDarkMode();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('shadow-xl', 'border-b', 'border-gray-800');
        } else {
            navbar.classList.remove('shadow-xl', 'border-b', 'border-gray-800');
        }
    });
    
    // Active navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Toggle only the semantic active class; visual handled in CSS
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-xl';
            } else {
                icon.className = 'fas fa-times text-xl';
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars text-xl';
            });
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animation on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .team-card, .portfolio-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Clear validation on input
            input.addEventListener('input', function() {
                clearValidation(this);
            });
        });
    });
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${getFieldLabel(fieldName)} is required.`;
    }
    
    // Email validation
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }
    
    // Phone validation - accept any phone number format
    if (fieldName === 'phone' && value) {
        // Allow any phone number format including numbers starting with 0
        const phoneRegex = /^[\+]?[0-9][\d\s\-\(\)]{0,20}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }
    }
    
    // Show/hide validation message
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

// Clear validation
function clearValidation(field) {
    clearFieldError(field);
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error text-red-500 text-sm mt-1';
    errorDiv.textContent = message;
    
    field.classList.add('border-red-500', 'focus:ring-red-500');
    field.classList.remove('border-gray-300', 'focus:ring-purple-500');
    
    field.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    field.classList.remove('border-red-500', 'focus:ring-red-500');
    field.classList.add('border-gray-300', 'focus:ring-purple-500');
}

// Get field label
function getFieldLabel(fieldName) {
    const labels = {
        'firstName': 'First Name',
        'lastName': 'Last Name',
        'email': 'Email Address',
        'phone': 'Phone Number',
        'message': 'Message',
        'eventType': 'Event Type',
        'eventDate': 'Event Date',
        'budget': 'Budget Range'
    };
    
    return labels[fieldName] || fieldName;
}

// Scroll effects
function initScrollEffects() {
    // Parallax effect for hero sections
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-video');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Back to top button
    createBackToTopButton();
}

// Create back to top button
function createBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.className = 'fixed bottom-8 right-8 bg-purple-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 opacity-0 pointer-events-none z-50';
    backToTopBtn.id = 'back-to-top';
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            backToTopBtn.classList.add('opacity-100');
        } else {
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
            backToTopBtn.classList.remove('opacity-100');
        }
    });
    
    // Scroll to top functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Loading animation
function showLoading() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.className = 'fixed inset-0 bg-white z-50 flex items-center justify-center';
    loader.innerHTML = `
        <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p class="text-gray-600">Loading...</p>
        </div>
    `;
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.remove();
    }
}

// Page transition effects
function initPageTransitions() {
    // Add fade-in effect to page content
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-in-out';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
}

// Initialize page transitions
initPageTransitions();

// Dark mode functionality
function initDarkMode() {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    });
}

// Toggle dark mode
function toggleDarkMode() {
    const isDark = document.documentElement.classList.contains('dark');
    
    if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Dark mode utilities
function setDarkMode() {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
}

function setLightMode() {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
}

// Export functions for use in other scripts
window.LuminousEvents = {
    showLoading,
    hideLoading,
    debounce,
    throttle,
    toggleDarkMode,
    setDarkMode,
    setLightMode
};
