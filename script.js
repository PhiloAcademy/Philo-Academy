document.addEventListener('DOMContentLoaded', () => {
    // Popup functionality
    const popupOverlay = document.getElementById('join-us-popup');
    const closePopup = document.querySelector('.close-popup');

    // Show popup after 2 seconds
    setTimeout(() => {
        popupOverlay.style.display = 'flex';
    }, 2000);

    // Close popup on close button click
    closePopup.addEventListener('click', () => {
        popupOverlay.style.display = 'none';
    });

    // Close popup on clicking outside
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.style.display = 'none';
        }
    });

    // Close popup on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popupOverlay.style.display === 'flex') {
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
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active-dot', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Initially show the first slide
    showSlide(currentSlide);

    // Cycle slides every 5 seconds
    setInterval(nextSlide, 5000);

    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(index);
        });
    });
});
