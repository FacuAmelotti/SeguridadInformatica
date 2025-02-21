document.addEventListener("DOMContentLoaded", () => {
    const img = document.getElementById("imgEffect");

    img.addEventListener("mouseenter", () => {
        img.style.transition = "0.5s";
        img.style.filter = "blur(0.52px) grayscale(100%)";
        img.style.transform = "rotate(-3deg) scale(1.02)";
    });

    img.addEventListener("mouseleave", () => {
        img.style.transition = "0.5s";
        img.style.filter = "none";
        img.style.transform = "rotate(0deg) scale(1)";
    });
});