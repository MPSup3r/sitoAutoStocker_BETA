document.addEventListener('DOMContentLoaded', () => {
    // --- Gestione Tema (Switch Checkbox) ---
    const themeCheckbox = document.getElementById('theme-checkbox');
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        // Sincronizza lo stato della checkbox con il tema
        if(themeCheckbox) themeCheckbox.checked = (theme === 'dark');
    }

    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme(prefersDarkScheme.matches ? 'dark' : 'light');
    }

    // Ascolta il cambio di stato dello switch
    if(themeCheckbox) {
        themeCheckbox.addEventListener('change', (e) => {
            setTheme(e.target.checked ? 'dark' : 'light');
        });
    }

    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // --- Animazioni allo Scroll ---
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const targets = document.querySelectorAll('.animate-block, .stagger-box');
    
    targets.forEach(target => {
        observer.observe(target);
    });
});
