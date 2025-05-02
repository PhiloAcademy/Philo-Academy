document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('join-us-popup');
    const closePopup = document.querySelector('.close-popup');
    const form = document.getElementById('join-us-form');

    // Show popup after 2 seconds
    setTimeout(() => {
        popup.style.display = 'flex';
    }, 2000);

    // Close popup when close button is clicked
    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Close popup when clicking outside the content
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const contact = document.getElementById('contact').value;
        const helpType = document.getElementById('help-type').value;
        const comments = document.getElementById('comments').value;

        console.log('Form Submitted:', { name, contact, helpType, comments });
        alert('Thank you for your submission! We will get back to you soon.');
        popup.style.display = 'none';
        form.reset();
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
