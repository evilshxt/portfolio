/**
 * Production-ready contact.js file with proper form submission and error handling
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize contact form animations when section becomes visible
    const contactSection = document.getElementById('contact');
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactSection && contactForm) {
        // Add floating labels functionality
        const formGroups = document.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const label = group.querySelector('label');
            
            if (input && label) {
                // Check if input has value on load (for browser autofill)
                if (input.value) {
                    label.classList.add('active');
                }
                
                input.addEventListener('focus', () => {
                    label.classList.add('active');
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        label.classList.remove('active');
                    }
                });
            }
        });
        
        // Form validation function
        const validateForm = () => {
            let isValid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                // Reset previous error states
                input.classList.remove('error');
                const errorMessage = input.parentNode.querySelector('.input-error');
                if (errorMessage) errorMessage.remove();
                
                // Check if required field is empty
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    
                    // Create and append error message
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'input-error';
                    errorDiv.textContent = `${input.name} is required`;
                    input.parentNode.appendChild(errorDiv);
                }
                
                // Validate email format
                if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        isValid = false;
                        input.classList.add('error');
                        
                        const errorDiv = document.createElement('div');
                        errorDiv.className = 'input-error';
                        errorDiv.textContent = 'Please enter a valid email address';
                        input.parentNode.appendChild(errorDiv);
                    }
                }
            });
            
            return isValid;
        };
        
        // Enhanced form submission
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validate form first
            if (!validateForm()) {
                // Show general error message
                formMessage.style.display = 'block';
                formMessage.classList.add('error');
                formMessage.classList.remove('success');
                formMessage.textContent = '❌ Please fix the errors above and try again.';
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
                
                return;
            }
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = `
                <svg class="spinner" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="30" stroke-dashoffset="25">
                        <animateTransform attributeName="transform" type="rotate" from="0 10 10" to="360 10 10" dur="1s" repeatCount="indefinite"/>
                    </circle>
                </svg>
                Sending...
            `;
            submitButton.disabled = true;
            
            try {
                const formData = new FormData(contactForm);
                const formAction = contactForm.getAttribute('action');
                
                // Check if we're using formsubmit.co or another service
                if (formAction.includes('formsubmit.co')) {
                    // If using formsubmit.co, check if the email is still the placeholder
                    const actionEmail = formAction.split('formsubmit.co/')[1];
                    if (actionEmail === 'youremail@example.com' || actionEmail === 'your-actual-email@example.com') {
                        throw new Error('Please replace the placeholder email in the form action with your actual email');
                    }
                }
                
                // Actual form submission
                const response = await fetch(formAction, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                // For formsubmit.co and similar services that may not return JSON
                let result;
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    result = await response.json();
                } else {
                    result = await response.text();
                }
                
                if (!response.ok) {
                    throw new Error(result.message || 'Form submission failed');
                }
                
                // Show success message
                formMessage.style.display = 'block';
                formMessage.classList.add('success');
                formMessage.classList.remove('error');
                formMessage.textContent = '✅ Message sent successfully!';
                
                // Reset form
                contactForm.reset();
                
                // Remove active class from labels
                document.querySelectorAll('.form-group label').forEach(label => {
                    label.classList.remove('active');
                });
                
            } catch (error) {
                console.error('Form submission error:', error);
                
                // Show more specific error message
                formMessage.style.display = 'block';
                formMessage.classList.add('error');
                formMessage.classList.remove('success');
                
                // Customize message based on error
                if (error.message.includes('placeholder email')) {
                    formMessage.textContent = '❌ Developer: Please update the form email address.';
                } else if (error.message.includes('Too many requests')) {
                    formMessage.textContent = '❌ Too many submissions. Please try again later.';
                } else {
                    formMessage.textContent = `❌ Error sending message: ${error.message || 'Please try again.'}`;
                }
            } finally {
                // Reset button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                    formMessage.classList.remove('success', 'error');
                }, 5000);
            }
        });
        
        // Social icons hover effects
        const socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.querySelector('svg').style.transform = 'scale(1.2)';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.querySelector('svg').style.transform = 'scale(1)';
            });
        });
        
        // Check if contact section is visible in viewport
        const observeContactSection = () => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        contactSection.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2
            });
            
            observer.observe(contactSection);
        };
        
        // Initialize observation
        observeContactSection();
        
        // Adjust viewport height on mobile devices to accommodate side-by-side layout
        const adjustViewportHeight = () => {
            if (window.innerWidth <= 900) {
                // For mobile: Let the content determine the height
                contactSection.style.minHeight = 'auto';
                contactSection.style.paddingTop = '3rem';
                contactSection.style.paddingBottom = '3rem';
            } else {
                // For desktop: Full viewport height
                contactSection.style.minHeight = '100vh';
            }
        };
        
        // Run on load and resize
        adjustViewportHeight();
        window.addEventListener('resize', adjustViewportHeight);
    }
});