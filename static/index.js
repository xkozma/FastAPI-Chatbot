import Header from './components/header.js';
import Footer from './components/footer.js';
import AppMain from './components/app-main.js';

// This file initializes the frontend application.

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');

    // Initialize header and footer
    const header = new Header();
    const footer = new Footer();
    const appMain = new AppMain();

    // Function to set the theme based on localStorage
    const setTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    };

    // Get the theme from localStorage
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

    // Function to load content from a URL
    const loadContent = (url) => {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                appMain.setContent(data);
                root.innerHTML = header.render() + appMain.render() + footer.render();
                updateButtonText(); // Ensure the button text is updated after content load

                // Re-attach the event listener to the theme toggle button after content is loaded
                const themeToggle = document.getElementById('theme-toggle');
                if (themeToggle) {
                    themeToggle.addEventListener('click', themeToggleHandler);
                }
                appMain.afterRender();
            });
    };

    // Initial content load
    const initialLoad = () => {
        fetch('/api/message')
            .then(response => response.json())
            .then(data => {
                appMain.setContent(`<p>This is a simple FastAPI and vanilla JS application running on the same port.</p><p>Message from backend: ${data.message}</p>`);
                root.innerHTML = header.render() + appMain.render() + footer.render();
                updateButtonText(); // Ensure the button text is updated after initial load

                const themeToggle = document.getElementById('theme-toggle');
                if (themeToggle) {
                    themeToggle.addEventListener('click', themeToggleHandler);
                }
                appMain.afterRender();

                console.log('Vanilla JS app loaded!');
            });
    };

    updateButtonText(); // Set initial button text

    // Handle navigation
    if (window.location.pathname.startsWith('/docs/')) {
        loadContent(window.location.pathname);
    } else {
        initialLoad();
    }
});

window.addEventListener('popstate', (event) => {
    loadContent(window.location.pathname);
});

// Override default link behavior
document.addEventListener('click', function (event) {
    if (event.target.tagName === 'A' && event.target.href.startsWith(window.location.origin)) {
        event.preventDefault();
        const url = event.target.href;
        history.pushState({}, '', url);
    }
    }
);