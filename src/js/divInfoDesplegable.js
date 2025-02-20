// Esperar a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".toggle-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault(); // Evita que el enlace recargue la página

            // Alternar la clase 'open' en el contenedor padre
            const parentSection = button.closest(".desplegable-info");
            parentSection.classList.toggle("open");
        });
    });
});
