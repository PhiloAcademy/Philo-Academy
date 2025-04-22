// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Dropdown menu accessibility (keyboard support)
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    const dropdownLink = dropdown.querySelector('.nav-link');

    // Toggle dropdown on click (for mobile)
    dropdownLink.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdownMenu.classList.toggle('hidden');
        }
    });

    // Keyboard accessibility
    dropdownLink.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            dropdownMenu.classList.toggle('hidden');
        }
    });

    // Close dropdown when focus leaves
    dropdownMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && !e.shiftKey) {
                const lastLink = dropdownMenu.querySelector('a:last-child');
                if (link === lastLink) {
                    dropdownMenu.classList.add('hidden');
                }
            }
        });
    });
});

// Basic search functionality
document.querySelector('.search-button').addEventListener('click', () => {
    const query = document.querySelector('.search-bar').value.toLowerCase().trim();
    if (!query) {
        alert('Please enter a search term.');
        return;
    }

    // Reset previous highlights
    document.querySelectorAll('.highlight').forEach(element => {
        element.classList.remove('highlight');
        element.innerHTML = element.textContent;
    });

    // Search in main content
    const mainContent = document.querySelector('main');
    const paragraphs = mainContent.querySelectorAll('p, li');
    let found = false;

    paragraphs.forEach(p => {
        const text = p.textContent.toLowerCase();
        if (text.includes(query)) {
            found = true;
            p.classList.add('highlight');
            const regex = new RegExp(`(${query})`, 'gi');
            p.innerHTML = p.textContent.replace(regex, '<span class="highlight-text">$1</span>');
            p.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    if (!found) {
        alert(`No results found for "${query}".`);
    }
});

// Highlight styling (added dynamically)
const style = document.createElement('style');
style.textContent = `
    .highlight {
        background-color: rgba(252, 194, 0, 0.3);
        padding: 0.2rem;
        border-radius: 4px;
    }
    .highlight-text {
        background-color: var(--accent-color);
        color: var(--primary-color);
        font-weight: 700;
        padding: 0.1rem 0.3rem;
        border-radius: 3px;
    }
    .dropdown-menu.hidden {
        display: none;
    }
`;
document.head.appendChild(style);
