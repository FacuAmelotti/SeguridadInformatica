function ampliarImagen(img) {
    let overlay = document.querySelector(".overlay");
    let imagenAmpliada = document.querySelector(".overlay img");

    imagenAmpliada.src = img.src;
    overlay.style.display = "flex";
}

function cerrarImagen() {
    document.querySelector(".overlay").style.display = "none";
}
