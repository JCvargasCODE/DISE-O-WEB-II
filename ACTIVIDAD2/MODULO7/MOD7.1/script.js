// Intersection Observer para animaciones al hacer scroll
const observerOptions = {
    threshold: 0.2, // porcentaje de visibilidad del elemento para activar
    rootMargin: '0px 0px -100px 0px' // margen para disparar animación antes de llegar al viewport
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // activa animación CSS
        }
    });
}, observerOptions);

// Observar todos los elementos con animación de scroll
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Ripple effect para botones
document.querySelectorAll('.btn-ripple').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span'); // crear span para el efecto
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple'); // clase CSS para animación
        this.appendChild(ripple);

        // remover ripple después de la animación
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    });
});
