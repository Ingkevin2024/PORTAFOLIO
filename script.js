// Animación de las barras de progreso
document.addEventListener('DOMContentLoaded', () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const percent = bar.getAttribute('data-percent');
            bar.style.width = `${percent}%`;
        });
    }

    // Intersection Observer para animar las barras cuando sean visibles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
            }
        });
    });

    progressBars.forEach(bar => observer.observe(bar));

    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Menú móvil
    // Navigation functionality
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-item');
    
    // Toggle mobile menu
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('active');
        
        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('active');
        }
    });

    // Smooth scroll functionality
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Close mobile menu
            nav.classList.remove('nav-active');
            burger.classList.remove('active');
            
            // Smooth scroll to section
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Add this to your existing CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    // Formulario de contacto
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar el formulario
        alert('¡Mensaje enviado con éxito!');
        contactForm.reset();
    });
});

// Animación al hacer scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - sectionHeight / 2)) {
            section.classList.add('active');
        }
    });
});


function sendToWhatsApp(e) {
    e.preventDefault();
    
    // Get form values
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    
    // Format the message
    const text = `*Nuevo mensaje de contacto*%0A
Nombre: ${nombre}%0A
Email: ${email}%0A
Mensaje: ${mensaje}`;
    
    const phone = "573114546909"; 
    
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phone}&text=${text}`;
    
    window.open(whatsappURL, '_blank');
    
    document.getElementById('contact-form').reset();
}

// Efecto parallax para el hero
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero-background');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    hero.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
});

// Animación de las tarjetas de proyecto
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Animación de las barras de progreso
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const percent = progressBar.getAttribute('data-percent');
            progressBar.style.setProperty('--progress', `${percent}%`);
        }
    });
}, observerOptions);

document.querySelectorAll('.progress-bar').forEach(bar => {
    observer.observe(bar);
});

// Smooth scrolling for buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Add click effect
        this.classList.add('button-clicked');
        setTimeout(() => {
            this.classList.remove('button-clicked');
        }, 200);
    });
});

// Typing effect
const texts = [
    "Desarrollador Web Full Stack & Backend",
    "Especialista en Soluciones Digitales Innovadoras",
    "Creando Experiencias Web Únicas & Funcionales",
    "Transformando Ideas en Código Eficiente"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeEffect() {
    const typingText = document.querySelector('.typing-text');
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingDelay = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingDelay = 500; // Pause before typing next
    } else {
        typingDelay = isDeleting ? 50 : 100;
    }
    
    setTimeout(typeEffect, typingDelay);
}

// Start the typing effect when the page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
});