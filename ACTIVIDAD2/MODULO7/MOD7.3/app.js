/* 
   Script para simular contenido dinámico.
   Asigno tamaños aleatorios a las tarjetas
   para que se vea el efecto Masonry.
*/

const cards = document.querySelectorAll('.card');
const sizes = ['card-normal', 'card-tall', 'card-wide', 'card-big'];

cards.forEach(card => {
    const random = Math.floor(Math.random() * sizes.length);
    
    // Si no es 'normal', aplico la clase
    if (sizes[random] !== 'card-normal') {
        card.classList.add(sizes[random]);
    }
});
