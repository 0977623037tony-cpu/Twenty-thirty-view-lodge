// ============================================
// Twenty-Thirty View Lodge - JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navBookBtn = document.querySelector('.nav-book-btn');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        
        // Create mobile menu if not exists
        let mobileMenu = document.querySelector('.mobile-menu');
        if (!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            mobileMenu.innerHTML = `
                <ul class="mobile-nav-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#rooms">Rooms</a></li>
                    <li><a href="#gallery">Gallery</a></li>
                    <li><a href="#why-us">Why Us</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="#contact" class="mobile-book-btn">Book Now</a></li>
                </ul>
            `;
            document.querySelector('.navbar .container').appendChild(mobileMenu);
            
            // Add mobile menu styles
            const style = document.createElement('style');
            style.textContent = `
                .mobile-menu {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    padding: 20px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    display: none;
                }
                .mobile-menu.active {
                    display: block;
                }
                .mobile-nav-links {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .mobile-nav-links li {
                    padding: 12px 0;
                    border-bottom: 1px solid #eee;
                }
                .mobile-nav-links a {
                    color: #2c3e50;
                    font-weight: 500;
                    display: block;
                }
                .mobile-book-btn {
                    background: #e67e22;
                    color: white !important;
12px 25                    padding: px;
                    border-radius: 5px;
                    text-align: center;
                    margin-top: 10px;
                    display: block !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        }
    });

    // Booking Form Handling
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            const message = document.getElementById('message').value;
            
            // Create WhatsApp message
            const whatsappMessage = `Hello Twenty-Thirty View Lodge, I would like to book a room.%0A%0AName: ${name}%0APhone: ${phone}%0ACheck-in: ${checkin}%0ACheck-out: ${checkout}%0AMessage: ${message}`;
            
            // Redirect to WhatsApp
            const whatsappUrl = `https://wa.me/1234567890?text=${whatsappMessage}`;
            window.open(whatsappUrl, '_blank');
            
            // Show success message
            alert('Thank you for your booking request! We will contact you soon.');
            bookingForm.reset();
        });
    }

    // Set minimum date for check-in (today)
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    
    if (checkinInput && checkoutInput) {
        const today = new Date().toISOString().split('T')[0];
        checkinInput.setAttribute('min', today);
        
        // Update checkout min date when checkin changes
        checkinInput.addEventListener('change', function() {
            checkoutInput.setAttribute('min', this.value);
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    // Gallery image error handling
    document.querySelectorAll('.gallery-item img, .room-image img').forEach(img => {
        img.addEventListener('error', function() {
            // Use a placeholder or hide broken images
            this.style.display = 'none';
            this.parentElement.classList.add('image-error');
        });
    });

    // Scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #e67e22;
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 999;
    `;
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.style.opacity = '1';
        } else {
            scrollTopBtn.style.opacity = '0';
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Console message
    console.log('Twenty-Thirty View Lodge - Website Loaded Successfully');
});

