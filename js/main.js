// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    const body = document.body;

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Toggle body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
                
                // Show auth buttons in mobile menu with a slight delay for animation
                if (window.innerWidth <= 768 && authButtons) {
                    setTimeout(() => {
                        authButtons.style.display = 'flex';
                        authButtons.style.opacity = '1';
                    }, 200);
                }
            } else {
                body.style.overflow = '';
                
                // Hide auth buttons when closing the menu
                if (window.innerWidth <= 768 && authButtons) {
                    authButtons.style.opacity = '0';
                    setTimeout(() => {
                        authButtons.style.display = '';
                    }, 200);
                }
            }
        });
    }

    // Close menu when clicking on a nav link
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                body.style.overflow = '';
                
                if (authButtons) {
                    authButtons.style.opacity = '0';
                    setTimeout(() => {
                        authButtons.style.display = '';
                    }, 200);
                }
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (hamburger && navLinks && !hamburger.contains(e.target) && !navLinks.contains(e.target) && !authButtons?.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            body.style.overflow = '';
            
            if (window.innerWidth <= 768 && authButtons) {
                authButtons.style.opacity = '0';
                setTimeout(() => {
                    authButtons.style.display = '';
                }, 200);
            }
        }
    });

    // Handle window resize for responsive behavior
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            if (authButtons) authButtons.style.display = '';
            if (authButtons) authButtons.style.opacity = '';
            if (navLinks) navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Registration Counter Animation
    const counterElement = document.getElementById('registration-count');
    if (counterElement) {
        const targetCount = parseInt(counterElement.textContent.replace(/,/g, ''), 10);
        const duration = 2000; // 2 seconds
        const frameRate = 20; // Update every 20ms
        const totalFrames = duration / frameRate;
        let currentFrame = 0;
        
        // Start with 0 and animate to the target number
        counterElement.textContent = '0';
        
        // Only start the animation when the element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Element is in view, start animation
                    const counterInterval = setInterval(() => {
                        currentFrame++;
                        const progress = currentFrame / totalFrames;
                        const currentCount = Math.round(progress * targetCount);
                        
                        if (currentFrame === totalFrames) {
                            clearInterval(counterInterval);
                            counterElement.textContent = targetCount.toLocaleString();
                        } else {
                            counterElement.textContent = currentCount.toLocaleString();
                        }
                    }, frameRate);
                    
                    // Stop observing once animation starts
                    observer.unobserve(counterElement);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counterElement);
    }

    // Chat Widget Functionality
    const chatButton = document.getElementById('chat-button');
    const chatContainer = document.getElementById('chat-container');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input-field');
    const sendButton = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');
    
    if (chatButton && chatContainer) {
        // Open chat when clicking the chat button
        chatButton.addEventListener('click', () => {
            chatContainer.classList.add('active');
            chatInput.focus();
        });
        
        // Close chat when clicking the close button
        if (closeChat) {
            closeChat.addEventListener('click', () => {
                chatContainer.classList.remove('active');
            });
        }
        
        // Function to add a new message to the chat
        function addMessage(message, isUser = false) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.classList.add(isUser ? 'user' : 'bot');
            
            const now = new Date();
            const timeString = now.getHours().toString().padStart(2, '0') + ':' + 
                               now.getMinutes().toString().padStart(2, '0');
            
            messageElement.innerHTML = `
                <div class="message-content">
                    <p>${message}</p>
                </div>
                <span class="message-time">${timeString}</span>
            `;
            
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Predefined bot responses
        const botResponses = {
            "hello": "Hello! How can I assist you today?",
            "hi": "Hi there! How can I help you?",
            "registration": "Registration is simple! Just click the 'Sign Up' button at the top of the page and follow the instructions. There's a one-time registration fee.",
            "cost": "The cost to participate includes a one-time registration fee and a quarterly contribution fee per draw.",
            "winners": "We select winners each quarter. Winners receive cash prizes or equivalent business equipment.",
            "payment": "We accept payments via bank transfer, debit cards, and mobile money services like Paystack and Flutterwave.",
            "training": "We offer free training videos and resources for all participants. Check out our Digital Empowerment section for more details.",
            "contact": "You can reach our support team at info@itmightbeyou.ng or call +234 800 000 0000 during business hours."
        };
        
        // Function to get bot response
        function getBotResponse(userInput) {
            userInput = userInput.toLowerCase().trim();
            
            // Check for keywords in user input
            for (const [keyword, response] of Object.entries(botResponses)) {
                if (userInput.includes(keyword)) {
                    return response;
                }
            }
            
            // Default response if no keywords match
            return "I'm not sure I understand. Could you please rephrase your question? You can ask about registration, cost, winners, payment methods, training, or contact information.";
        }
        
        // Send message when clicking send button
        if (sendButton && chatInput) {
            sendButton.addEventListener('click', () => {
                const message = chatInput.value.trim();
                if (message) {
                    // Add user message
                    addMessage(message, true);
                    
                    // Clear input
                    chatInput.value = '';
                    
                    // Simulate typing delay before bot response
                    setTimeout(() => {
                        const botResponse = getBotResponse(message);
                        addMessage(botResponse);
                    }, 800);
                }
            });
            
            // Send message when pressing Enter
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendButton.click();
                }
            });
        }
    }

    // Improved Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (testimonials.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;
        let autoSlideInterval;
        const autoSlideDelay = 5000;
        let isAnimating = false;

        // Set up testimonials
        testimonials.forEach((testimonial, index) => {
            // Add aria attributes for accessibility
            testimonial.setAttribute('aria-hidden', index !== 0 ? 'true' : 'false');
            
            // Position testimonials absolutely to prevent layout shifts
            testimonial.style.position = 'absolute';
            testimonial.style.top = '0';
            testimonial.style.left = '0';
            testimonial.style.width = '100%';
            
            // Hide all testimonials except the first one
            if (index !== 0) {
                testimonial.style.opacity = '0';
                testimonial.style.zIndex = '1';
                testimonial.style.visibility = 'hidden';
            } else {
                testimonial.style.opacity = '1';
                testimonial.style.zIndex = '2';
                testimonial.style.visibility = 'visible';
            }
        });

        // Add relative positioning to the container
        if (testimonialSlider) {
            testimonialSlider.style.position = 'relative';
            // Set a fixed height based on the current testimonial to prevent layout shifts
            testimonialSlider.style.height = testimonials[0].offsetHeight + 'px';
        }

        // Show testimonial at current index with fade effect
        function showTestimonial(index) {
            if (isAnimating) return;
            isAnimating = true;
            
            // Update slider height to match the new testimonial's height
            const targetHeight = testimonials[index].offsetHeight;
            testimonialSlider.style.height = targetHeight + 'px';
            
            testimonials.forEach((testimonial, i) => {
                if (i === index) {
                    // Prepare the new testimonial
                    testimonial.style.visibility = 'visible';
                    testimonial.style.zIndex = '2';
                    
                    // Fade in the current testimonial
                    setTimeout(() => {
                        testimonial.style.opacity = '1';
                    }, 50);
                    
                    // Mark as not animating after transition completes
                    setTimeout(() => {
                        isAnimating = false;
                    }, 350);
                } else {
                    // Set lower z-index for testimonials being hidden
                    testimonial.style.zIndex = '1';
                    testimonial.style.opacity = '0';
                    
                    // Hide after fade out
                    setTimeout(() => {
                        if (i !== index) {
                            testimonial.style.visibility = 'hidden';
                        }
                    }, 300);
                }
            });
        }

        // Next testimonial
        function nextTestimonial() {
            if (isAnimating) return;
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
            resetAutoSlide();
        }

        // Previous testimonial
        function prevTestimonial() {
            if (isAnimating) return;
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
            resetAutoSlide();
        }

        nextBtn.addEventListener('click', nextTestimonial);
        prevBtn.addEventListener('click', prevTestimonial);

        // Update slider height on window resize
        window.addEventListener('resize', () => {
            if (testimonialSlider && testimonials[currentIndex]) {
                testimonialSlider.style.height = testimonials[currentIndex].offsetHeight + 'px';
            }
        });

        // Auto slide
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextTestimonial, autoSlideDelay);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        // Initialize auto slide
        startAutoSlide();

        // Pause auto slide when user hovers over testimonial
        if (testimonialSlider) {
            testimonialSlider.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });

            testimonialSlider.addEventListener('mouseleave', startAutoSlide);
        }

        // Add swipe functionality for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        if (testimonialSlider) {
            testimonialSlider.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            }, {passive: true});
            
            testimonialSlider.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, {passive: true});
        }
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - next
                nextTestimonial();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - previous
                prevTestimonial();
            }
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 70;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Improved animate elements on scroll
    const animatedElements = document.querySelectorAll('.feature-card, .step, .testimonial');
    
    // Make sure all elements have proper animation setup
    animatedElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        el.classList.add('animation-target');
    });
    
    function checkScroll() {
        animatedElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 50) {
                el.classList.add('animate');
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initial check to make sure elements are visible on page load
    setTimeout(checkScroll, 100);
    
    // Check on scroll with throttling for better performance
    let scrollTimeout;
    document.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                checkScroll();
                scrollTimeout = null;
            }, 100);
        }
    });
    
    // Force check on resize with debouncing
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(checkScroll, 100);
    });

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

    // Improved back to top button functionality
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        // Hide button by default
        backToTopBtn.style.display = 'none';
        backToTopBtn.style.opacity = '0';
        
        // Throttle scroll event for better performance
        let scrollThrottleTimeout;
        window.addEventListener('scroll', () => {
            if (!scrollThrottleTimeout) {
                scrollThrottleTimeout = setTimeout(() => {
                    if (window.pageYOffset > 300) {
                        backToTopBtn.style.display = 'block';
                        // Add small delay to allow display:block to take effect
                        setTimeout(() => {
                            backToTopBtn.style.opacity = '1';
                        }, 10);
                    } else {
                        backToTopBtn.style.opacity = '0';
                        // Wait for fade-out transition before hiding
                        setTimeout(() => {
                            if (window.pageYOffset <= 300) {
                                backToTopBtn.style.display = 'none';
                            }
                        }, 300);
                    }
                    scrollThrottleTimeout = null;
                }, 100);
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Video card click handler
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            // In a real implementation, this would open a video modal or redirect to the video page
            const videoTitle = card.querySelector('h3').textContent;
            console.log(`Playing video: ${videoTitle}`);
            
            // For demo purposes, you could create a modal with a video player
            // Or redirect to the videos page
            // window.location.href = 'pages/videos.html';
        });
    });
}); 