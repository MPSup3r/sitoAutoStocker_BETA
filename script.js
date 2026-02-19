document.addEventListener('DOMContentLoaded', () => {
    // --- Gestione Temi (Dark/Light Mode) ---
    const toggleBtn = document.getElementById('theme-toggle');
    // Controlla la preferenza di sistema
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    // Funzione per impostare e salvare il tema
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    // 1. Controlla se l'utente ha già scelto un tema in passato
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // 2. Altrimenti usa la preferenza di sistema attuale
        setTheme(prefersDarkScheme.matches ? 'dark' : 'light');
    }

    // Cambia tema al click sul bottone
    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // Ascolta i cambiamenti delle impostazioni di sistema in tempo reale
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // --- Gestione Animazioni allo Scroll (Intersection Observer) ---

    // Opzioni per l'osservatore: l'animazione scatta quando il 15% dell'elemento è visibile
    const observerOptions = {
        root: null, // usa il viewport del browser
        rootMargin: '0px',
        threshold: 0.15 
    };

    // La funzione callback che viene eseguita quando un elemento entra/esce dal viewport
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Se l'elemento sta intersecando (è visibile nel viewport)
            if (entry.isIntersecting) {
                // Aggiungi la classe che fa partire l'animazione CSS
                entry.target.classList.add('is-visible');
                
                // Opzionale: smetti di osservare l'elemento una volta animato (per performance)
                // observer.unobserve(entry.target); 
                // Nota: Rimuovendo il commento sopra, le animazioni avvengono solo una volta. 
                // Lasciandolo commentato, se l'utente scorre su e giù, non si ri-animano perché la classe c'è già.
                // Se volessi ri-animare ogni volta che escono e rientrano, dovrei aggiungere un 'else { entry.target.classList.remove('is-visible'); }'
            }
        });
    };

    // Crea l'osservatore
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Seleziona tutti gli elementi che vogliamo animare
    // .animate-block: blocchi singoli (titoli, intere sezioni di testo, immagini)
    // .stagger-box: contenitori i cui figli devono animarsi in sequenza (liste, griglie di card)
    const targets = document.querySelectorAll('.animate-block, .stagger-box');
    
    // Inizia ad osservare ogni target
    targets.forEach(target => {
        observer.observe(target);
    });
});
