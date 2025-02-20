// Seleccionar elementos
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const content = document.querySelector('.content');

// Agregar evento al botón
menuToggle.addEventListener('click', () => {
    desplegarAction();
});

function desplegarAction() {
    // Alternar la clase 'active' en el menú
    menu.classList.toggle('active');

    // Alternar la clase 'hidden' en el menú para ajustar el contenido
    if (menu.classList.contains('active')) {
        content.style.width = '76%'; // Restaurar ancho original
        content.style.marginLeft = '24%'; // Restaurar margen izquierdo
        menuToggle.textContent = 'X'; // Cambiar texto del botón

    } else {
        content.style.width = '100%'; // Expandir al 100%
        content.style.marginLeft = '0'; // Eliminar margen izquierdo
        menuToggle.textContent = '☰ '; // Cambiar texto del botón        
    }
}

// Iniciar con el menú desplegado
document.addEventListener('DOMContentLoaded', () => {
    desplegarAction();
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".desplegable > a").forEach(item => {
        item.addEventListener("click", (event) => {
            event.preventDefault(); // Evita que el enlace recargue la página
            const parentLi = item.parentElement;
            parentLi.classList.toggle("open");
        });
    });
});
