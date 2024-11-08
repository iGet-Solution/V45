const mobileMenu = document.getElementById('mobile-menu');
const closeIcon = document.querySelector('.close-icon');
const navLinks = document.getElementById('nav-links');
const navLinkItems = document.querySelectorAll('.nav-links li');
const navbar = document.querySelector('.navbar');
const videoContainer = document.querySelector('.video-container'); // Conteneur de la vidéo
const scrollButton = document.getElementById('scroll-button'); // Bouton de scroll

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

// Fonction de défilement en douceur avec ajustement dynamique en fonction de la hauteur de la navbar
scrollButton.addEventListener('click', (event) => {
    event.preventDefault();
    const targetSection = document.querySelector(scrollButton.getAttribute('data-scroll-target'));

    if (targetSection) {
        // Utilise uniquement la hauteur de la navbar
        const navbarHeight = navbar.offsetHeight;

        // Défilement vers la section cible sans ajustement mobile
        window.scrollTo({
            top: targetSection.offsetTop - navbarHeight,
            behavior: 'smooth'
        });
    }
});

// Sélectionne le bouton Back to Top
const backToTopButton = document.getElementById('back-to-top');

// Afficher/Masquer le bouton lors du défilement
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Action lors du clic sur le bouton Back to Top
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// Fonction pour animer chaque compteur avec une vitesse ajustable
function animateCounter(element, endValue) {
    let startValue = 0;
    let duration = 10000; // 10 secondes pour un défilement lent
    let increment = Math.ceil(endValue / (duration / 30)); // Ajustement de l'incrémentation

    let counter = setInterval(() => {
        startValue += increment;
        if (startValue >= endValue) {
            startValue = endValue;
            clearInterval(counter);
        }
        element.innerText = startValue;
    }, 30); // Intervalle plus grand pour un défilement plus lent
}

// Démarrer l'animation et réinitialiser les compteurs à chaque fois
function startCounters() {
    const counters = document.querySelectorAll('.counter .number span');
    counters.forEach(counter => {
        const endValue = parseInt(counter.getAttribute('data-end-value'));
        counter.innerText = '0'; // Réinitialise à zéro
        animateCounter(counter, endValue);
    });
}

// Observateur d'intersection pour surveiller l'entrée de la section dans la vue
const countersSection = document.getElementById('counters');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounters();
        }
    });
}, {
    threshold: 0.5 // Active quand 50% de la section est visible
});

// Attache l'observateur à la section des compteurs
observer.observe(countersSection);

// Formulaire
document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    // Récupère les valeurs des champs
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Configuration des données à envoyer
    const formData = {
        name: name,
        email: email,
        message: message
    };

    try {
        // Envoie la requête en utilisant fetch
        const response = await fetch("https://formspree.io/f/xqazaayq", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // Affiche un message de confirmation
            const confirmationMessage = document.createElement("div");
            confirmationMessage.innerText = "Votre message a été envoyé avec succès !";
            confirmationMessage.style.color = "white"; // Couleur du texte
            confirmationMessage.style.backgroundColor = "#52b3e4"; // Couleur de fond
            confirmationMessage.style.padding = "10px";
            confirmationMessage.style.borderRadius = "5px";
            confirmationMessage.style.marginTop = "10px";
            document.querySelector(".button-container").appendChild(confirmationMessage);

            // Réinitialise le formulaire
            document.getElementById("contact-form").reset();

            // Cache le message après 5 secondes
            setTimeout(() => {
                confirmationMessage.remove();
            }, 5000);
        } else {
            alert("Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.");
        }
    } catch (error) {
        console.error("Erreur :", error);
        alert("Une erreur est survenue. Veuillez vérifier votre connexion et réessayer.");
    }
});

