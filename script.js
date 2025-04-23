document.addEventListener('DOMContentLoaded', () => {
    // Event delegation for smooth scrolling
    document.body.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (anchor) {
            e.preventDefault();
            const targetId = anchor.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }
    });

    // Event delegation for dropdowns (click and touch support)
    document.body.addEventListener('click', (e) => {
        const dropdown = e.target.closest('.dropdown');
        if (dropdown) {
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) {
                menu.classList.toggle('hidden');
                // Close other open dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(otherMenu => {
                    if (otherMenu !== menu && !otherMenu.classList.contains('hidden')) {
                        otherMenu.classList.add('hidden');
                    }
                });
            }
        } else {
            // Close all dropdowns if clicking outside
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (!menu.classList.contains('hidden')) {
                    menu.classList.add('hidden');
                }
            });
        }
    });

    // Keyboard accessibility for dropdowns
    document.body.addEventListener('keydown', (e) => {
        const dropdown = e.target.closest('.dropdown .nav-link');
        if (dropdown && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            const menu = dropdown.parentElement.querySelector('.dropdown-menu');
            menu.classList.toggle('hidden');
            // Close other open dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(otherMenu => {
                if (otherMenu !== menu && !otherMenu.classList.contains('hidden')) {
                    otherMenu.classList.add('hidden');
                }
            });
        }
    });

    // Close dropdown when focus leaves
    document.querySelectorAll('.dropdown-menu a').forEach(link => {
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && !e.shiftKey) {
                const menu = link.closest('.dropdown-menu');
                const lastLink = menu.querySelector('a:last-child');
                if (link === lastLink) {
                    menu.classList.add('hidden');
                }
            }
        });
    });

    // Close dropdowns on scroll
    window.addEventListener('scroll', () => {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            if (!menu.classList.contains('hidden')) {
                menu.classList.add('hidden');
            }
        });
    });

    // Debounced search functionality
    const searchButton = document.querySelector('.search-button');
    const searchBar = document.querySelector('.search-bar');
    let searchTimeout;

    searchButton.addEventListener('click', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = searchBar.value.toLowerCase().trim();
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
        }, 300); // Debounce delay
    });
});
