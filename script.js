// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            navMenu.classList.toggle('show');

            // Animate hamburger bars
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('animate'));
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (navMenu.classList.contains('show')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('show');
            }

            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link on scroll
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = 'none';
        }
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        // Initialize EmailJS with your user ID (you'll need to sign up at emailjs.com)
        (function () {
            // Replace "user_yourUserID" with your actual EmailJS user ID after signing up
            emailjs.init("user_yourUserID");
        })();

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[placeholder="Subject"]').value;
            const message = this.querySelector('textarea').value;

            // Simple validation
            if (name && email && subject && message) {
                // Change button text to show loading state
                const submitButton = this.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;

                // Prepare template parameters
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    to_email: "maityreetam001@gmail.com",
                    subject: subject,
                    message: message
                };

                // Send email using EmailJS
                window.emailjs.send('service_337gplk', 'template_bwdwvlx', templateParams)
                    .then(function (response) {
                        console.log('SUCCESS!', response.status, response.text);

                        // Create a success message element
                        const successMessage = document.createElement('div');
                        successMessage.className = 'success-message';
                        successMessage.innerHTML = `
                            <i class="fas fa-check-circle"></i>
                            <p>Thank you for your message, ${name}! I will get back to you soon.</p>
                        `;

                        // Insert the success message after the form
                        contactForm.parentNode.appendChild(successMessage);

                        // Reset the form
                        contactForm.reset();

                        // Restore button state
                        submitButton.textContent = originalButtonText;
                        submitButton.disabled = false;

                        // Remove success message after 5 seconds
                        setTimeout(() => {
                            successMessage.style.opacity = '0';
                            setTimeout(() => {
                                successMessage.remove();
                            }, 500);
                        }, 5000);
                    })
                    .catch(function (error) {
                        console.log('FAILED...', error);
                        alert('There was an error sending your message. Please try again.');
                        submitButton.textContent = originalButtonText;
                        submitButton.disabled = false;
                    });
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Scroll reveal animation
    function revealOnScroll() {
        const elements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .contact-item');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    // Add CSS class for animation
    const style = document.createElement('style');
    style.innerHTML = `
        .skill-category, .project-card, .timeline-item, .contact-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .skill-category.visible, .project-card.visible, .timeline-item.visible, .contact-item.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hamburger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        
        .bar {
            transition: all 0.3s ease;
        }
        
        nav ul.show {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            width: 100%;
            background: white;
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
            padding: 20px 0;
            z-index: 999;
        }
        
        nav ul.show li {
            margin: 15px 0;
            text-align: center;
        }
        
        /* Profile image animation */
        @keyframes profileImageAnimation {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 0;
            }
            50% {
                transform: scale(1.2) rotate(10deg);
            }
            100% {
                transform: scale(1) rotate(0deg);
                opacity: 1;
            }
        }
        
        .image-container {
            animation: profileImageAnimation 1.5s ease-out forwards;
        }
    `;
    document.head.appendChild(style);

    // Initial call and event listener for scroll reveal
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Typing effect for hero section
    const typingElement = document.querySelector('.hero-text h1');
    if (typingElement) {
        // Store the original content with HTML structure
        const originalContent = typingElement.innerHTML;
        // Create a text-only version for typing (remove the span tag)
        const textContent = "Hi, I'm Reetam Maity";
        typingElement.innerHTML = '';

        let i = 0;
        function typeWriter() {
            if (i < textContent.length) {
                if (i > 6 && i < 20) {
                    typingElement.innerHTML += '<span class="highlight">' + textContent.charAt(i) + '</span>';
                } else {
                    typingElement.innerHTML += textContent.charAt(i);
                }
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
});