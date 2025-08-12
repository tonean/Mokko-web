// Morphing header animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    let isScrolled = false;

    function updateHeader() {
        const currentScrollY = window.scrollY;
        const scrollThreshold = 100; // Start morphing after 100px scroll

        if (currentScrollY > scrollThreshold && !isScrolled) {
            // Morph into top bar
            header.classList.add('scrolled');
            isScrolled = true;
        } else if (currentScrollY <= scrollThreshold && isScrolled) {
            // Morph back to original
            header.classList.remove('scrolled');
            isScrolled = false;
        }

        lastScrollY = currentScrollY;
    }

    // Throttle scroll events for better performance
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateHeader();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Add scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial check in case page is already scrolled
    updateHeader();
});

// Smooth scrolling for any internal links (optional enhancement)
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Chat message scroll animation
document.addEventListener('DOMContentLoaded', function() {
    const messages = document.querySelectorAll('.message');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const messageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Add a small delay for each message based on its position
                const messageIndex = Array.from(messages).indexOf(entry.target);
                setTimeout(function() {
                    entry.target.classList.add('visible');
                }, messageIndex * 200); // 200ms delay between each message
                
                // Stop observing once animated
                messageObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Start observing all messages
    messages.forEach(function(message) {
        messageObserver.observe(message);
    });
});

// Scroll-triggered fade-in animations
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Add a smaller delay for faster staggered animation
                const elementIndex = Array.from(fadeElements).indexOf(entry.target);
                setTimeout(function() {
                    entry.target.classList.add('visible');
                }, elementIndex * 80); // 80ms delay between each element (faster)
                
                // Stop observing once animated
                fadeObserver.unobserve(entry.target);
            }
        });
    }, fadeObserverOptions);
    
    // Start observing all fade-in elements
    fadeElements.forEach(function(element) {
        fadeObserver.observe(element);
    });
}); 