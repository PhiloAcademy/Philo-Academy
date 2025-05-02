document.addEventListener('DOMContentLoaded', () => {
    // Popup functionality
    const popupOverlay = document.getElementById('join-us-popup');
    const closePopup = document.querySelector('.close-popup');

    // Show popup after 2 seconds
    setTimeout(() => {
        if (popupOverlay) {
            popupOverlay.style.display = 'flex';
        }
    }, 2000);

    // Close popup on close button click
    if (closePopup) {
        closePopup.addEventListener('click', () => {
            popupOverlay.style.display = 'none';
        });
    }

    // Close popup on clicking outside
    if (popupOverlay) {
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                popupOverlay.style.display = 'none';
            }
        });
    }

    // Close popup on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popupOverlay && popupOverlay.style.display === 'flex') {
            popupOverlay.style.display = 'none';
        }
    });

    // Listen for Google Form submission to close popup
    window.addEventListener('message', (event) => {
        if (event.data === 'form-submitted') {
            alert('Thank you! Your response has been saved.');
            popupOverlay.style.display = 'none';
        }
    });

    // Slideshow functionality
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        if (!slides.length) return; // Exit if no slides
        // Normalize index
        currentSlide = (index + slides.length) % slides.length;
        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active-dot', i === currentSlide);
        });
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function startSlideshow() {
        if (slideInterval) clearInterval(slideInterval); // Clear existing interval
        slideInterval = setInterval(nextSlide, 3000); // Cycle every 3 seconds
    }

    // Initialize slideshow
    if (slides.length > 0) {
        showSlide(currentSlide);
        startSlideshow();
    }

    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            startSlideshow(); // Restart interval on manual navigation
        });
    });
});
