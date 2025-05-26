// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            // Show auth buttons in mobile menu
            if (window.innerWidth <= 768 && authButtons) {
                if (navLinks.classList.contains('active')) {
                    setTimeout(() => {
                        authButtons.style.display = 'flex';
                    }, 300);
                } else {
                    authButtons.style.display = '';
                }
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (hamburger && navLinks && !hamburger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            if (window.innerWidth <= 768 && authButtons) {
                authButtons.style.display = '';
            }
        }
    });

    // Handle window resize for responsive behavior
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            if (authButtons) authButtons.style.display = '';
            if (navLinks) navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    });

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (testimonials.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;

        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });

        // Show testimonial at current index
        function showTestimonial(index) {
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
            });
            testimonials[index].style.display = 'block';
        }

        // Next testimonial
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });

        // Previous testimonial
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });

        // Auto slide every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Animate elements on scroll - FIXED VERSION
    const animatedElements = document.querySelectorAll('.feature-card, .step, .testimonial');
    
    // Make sure all elements are visible by default (especially important for mobile)
    animatedElements.forEach(el => {
        // Ensure visibility
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        el.classList.add('animation-target');
    });
    
    function checkScroll() {
        animatedElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 50) {  // Reduced threshold for mobile
                el.classList.add('animate');
                // Ensure elements stay visible when animated
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            } else {
                // Don't hide elements when they're out of view
                el.style.opacity = '1';
            }
        });
    }
    
    // Initial check to make sure elements are visible on page load
    setTimeout(checkScroll, 100);
    
    // Check on scroll
    document.addEventListener('scroll', checkScroll);
    
    // Force check on resize (for responsive layouts)
    window.addEventListener('resize', checkScroll);

    // Form validation for signup and login forms
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        if (form) {
            form.addEventListener('submit', function(e) {
                let isValid = true;
                const requiredFields = form.querySelectorAll('[required]');
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        showError(field, 'This field is required');
                    } else {
                        removeError(field);
                        
                        // Email validation
                        if (field.type === 'email') {
                            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!emailPattern.test(field.value)) {
                                isValid = false;
                                showError(field, 'Please enter a valid email address');
                            }
                        }
                        
                        // Password validation (for signup form)
                        if (field.id === 'password' && form.id === 'signup-form') {
                            if (field.value.length < 8) {
                                isValid = false;
                                showError(field, 'Password must be at least 8 characters long');
                            }
                        }
                        
                        // Password confirmation validation
                        if (field.id === 'confirm-password') {
                            const password = document.getElementById('password');
                            if (field.value !== password.value) {
                                isValid = false;
                                showError(field, 'Passwords do not match');
                            }
                        }
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                }
            });
        }
    });
    
    // Helper functions for form validation
    function showError(field, message) {
        // Remove any existing error first
        removeError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '5px';
        
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = 'red';
    }
    
    function removeError(field) {
        const error = field.parentNode.querySelector('.error-message');
        if (error) {
            error.remove();
        }
        field.style.borderColor = '';
    }

    // Back to top button functionality
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}); 