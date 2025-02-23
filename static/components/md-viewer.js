import Header from './header.js';
import Footer from './footer.js';

// Function to load marked.js from CDN
const loadMarked = () => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    const header = new Header();
    const footer = new Footer();

    // Function to set the theme based on localStorage
    const setTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    const themeToggleHandler = () => {
        document.body.classList.toggle('dark-mode');
        const newTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        updateButtonText();
    };

    const updateButtonText = () => {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        }
    };

    const loadContent = (url) => {
        loadMarked().then(() => {
            fetch(url)
                .then(response => response.text())
                .then(markdown => {
                    // Parse the Markdown content to HTML
                    const html = marked.parse(markdown);
                    root.innerHTML = header.render() + `<div class="md-viewer">${html}</div>` + footer.render();
                    updateButtonText(); // Ensure the button text is updated after content load

                    // Re-attach the event listener to the theme toggle button after content is loaded
                    const themeToggle = document.getElementById('theme-toggle');
                    if (themeToggle) {
                        themeToggle.addEventListener('click', themeToggleHandler);
                    }
                });
        }).catch(error => {
            console.error('Failed to load marked.js', error);
            root.innerHTML = header.render() + `<div class="md-viewer">Failed to load Markdown parser.</div>` + footer.render();
        });
    };

    updateButtonText(); // Set initial button text

    // Override default link behavior
    document.addEventListener('click', function (event) {
        if (event.target.tagName === 'A' && event.target.href.startsWith(window.location.origin)) {
            event.preventDefault();
            const url = event.target.href;
            history.pushState({}, '', url);
            loadContent(url);
        }
    });

    window.addEventListener('popstate', (event) => {
        loadContent(window.location.pathname);
    });

    // Initial content load based on the URL
    if (window.location.pathname.startsWith('/docs/')) {
        loadContent(window.location.pathname);
    }
});
