const mobileMenu = document.getElementById('mobile-menu');
const closeIcon = document.querySelector('.close-icon');
const navLinks = document.getElementById('nav-links');
const navLinkItems = document.querySelectorAll('.nav-links li');
const navbar = document.querySelector('.navbar');
const videoContainer = document.querySelector('.video-container'); // Conteneur de la vidéo
let menuOpen = false;

// Gestion du scroll pour changer la transparence
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        navbar.classList.remove("transparent");
        navbar.classList.add("solid");
    } else {
        navbar.classList.remove('solid');
        navbar.classList.add('transparent');
    }
});

// Gérer l'ouverture du menu hamburger au clic
mobileMenu.addEventListener('click', (event) => {
    event.preventDefault();
    menuOpen = !menuOpen;
    navLinks.classList.toggle('nav-active', menuOpen);

    // Gérer l'affichage des icônes
    if (menuOpen) {
        closeIcon.style.display = 'block'; // Afficher la croix
        mobileMenu.style.display = 'none'; // Cacher le hamburger
    } else {
        closeIcon.style.display = 'none'; // Cacher la croix
        mobileMenu.style.display = 'block'; // Afficher le hamburger
    }
});

// Fermer le menu lorsque la croix est cliquée
closeIcon.addEventListener('click', () => {
    menuOpen = false;
    navLinks.classList.remove('nav-active');
    closeIcon.style.display = 'none'; // Cacher la croix
    mobileMenu.style.display = 'block'; // Afficher le hamburger
});

// Fermer le menu lorsque l'on clique sur un lien du menu
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        menuOpen = false;
        navLinks.classList.remove('nav-active');
        closeIcon.style.display = 'none'; // Cacher la croix
        mobileMenu.style.display = 'block'; // Afficher le hamburger
    });
});

// Ajout de la gestion des sections actives
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';

    // Si l'utilisateur est tout en haut de la page ou dans la zone de la vidéo de fond
    if (window.scrollY === 0 || (videoContainer && window.scrollY < videoContainer.offsetHeight)) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        return; // Sortir de la fonction pour ne rien activer
    }

    // Boucle pour déterminer quelle section est actuellement visible
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // Vérifie si la position de défilement se trouve dans la section actuelle
        if (window.scrollY >= sectionTop - 50 && window.scrollY < sectionTop + sectionHeight - 50) {
            currentSection = section.getAttribute('id');
        }
    });

    // Mise à jour de la classe active sur les liens du menu
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
});
