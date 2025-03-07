document.addEventListener("DOMContentLoaded", () => {
    const baseFontSize = Math.min(window.innerWidth * 0.03, 24); // 3% del ancho pantalla (max 24px)
    const mobileBreakpoint = 768;

        // Crear overlay de transición
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg,rgb(19, 20, 20),rgb(3, 3, 3));
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        @media (max-width: ${mobileBreakpoint}px) {
            font-size: ${baseFontSize * 1.5}px;
        }

        
    `;
       

    // Efecto de escaneo cuántico
    const scanBeam = document.createElement('div');
    scanBeam.style.cssText = `
        position: absolute;
        top: -100%;
        left: 0;
        width: 100%;
        height: 70%;
        background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 255, 255, 0.15) 30%,
            rgba(50, 214, 255, 0.3) 50%,
            rgba(0, 217, 255, 0.15) 70%,
            transparent 100%
        );
        filter: blur(30px);
        animation: scan 2.5s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    // Dentro del eventListener DOMContentLoaded, reemplaza la creación del loaderText con:

// Contenedor principal
const loaderContent = document.createElement('div');
loaderContent.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

// Texto del nombre
const nombreDiv = document.createElement('div');
nombreDiv.textContent = 'Seguridad Informatica';
nombreDiv.style.cssText = `
    font-family: 'Courier New', monospace;
    font-size: 1.5em;
    color: rgb(0, 225, 255);
    text-shadow: 0 0 15px rgba(0, 225, 255, 0.7);
    letter-spacing: 3px;
    text-transform: uppercase;
    display: block;
    position: absolute;
`;

// Texto de carga modificado (tu versión original)
const loaderText = document.createElement('div');
loaderText.style.cssText = `
    font-family: 'Courier New', monospace;
    font-size: 3em;
    color: rgb(0, 225, 255);
    text-shadow: 0 0 15px rgba(0, 225, 255, 0.7);
    display: block;
    position: absolute;
    mix-blend-mode: screen;
        padding-top:132px;
`;


// Modifica la sección donde añades elementos al overlay:
loaderContent.appendChild(nombreDiv);
loaderContent.appendChild(loaderText);

overlay.appendChild(loaderContent);
    

    // Efecto de glitch dinámico
    const glitchEffect = document.createElement('div');
    glitchEffect.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 2px,
            rgba(255, 0, 255, 0.1) 3px,
            rgba(255, 0, 255, 0.1) 4px
        );
        animation: glitch 0.1s infinite;
        opacity: 0.3;
    `;

    // Añadir elementos al overlay
    overlay.appendChild(scanBeam);
    overlay.appendChild(loaderText);
    overlay.appendChild(glitchEffect);
    document.body.appendChild(overlay);

// Función de ajuste responsive
function ajustarTexto() {
    const anchoPantalla = window.innerWidth;
    const mostrarDecimales = anchoPantalla > mobileBreakpoint;
    
    loaderText.style.fontSize = `${Math.min(anchoPantalla * 0.03, 24) * (anchoPantalla > mobileBreakpoint ? 2 : 1.5)}px`;
    
    textAnimate(mostrarDecimales);
}

// Animación del texto de carga modificada
let progress = 0;
const textAnimate = (mostrarDecimales = true) => {
    const porcentaje = mostrarDecimales ? 
        Math.min(progress, 100).toFixed(1) :
        Math.min(Math.round(progress), 100);
    
    loaderText.textContent = `[CARGANDO${window.innerWidth > mobileBreakpoint ? ' DATOS' : ''}... ${porcentaje}%]`;
    
    progress += (100 - progress) * 0.1;
    if(progress < 99.9) {
        requestAnimationFrame(() => textAnimate(mostrarDecimales));
    }
};

// Event listener para resize
window.addEventListener('resize', ajustarTexto);

// Iniciar con valores iniciales
ajustarTexto();

// Keyframes dinámicos con media queries
const style = document.createElement('style');
style.textContent = `
    @keyframes scan {
        0% { top: -100%; opacity: 0; }
        30% { opacity: 1; }
        100% { top: 150%; opacity: 0; }
    }

    @keyframes glitch {
        0% { background-position: 0 0; }
        100% { background-position: 20px 20px; }
    }

    @media (max-width: ${mobileBreakpoint}px) {
        div {
            font-size: 1.2em !important;
        }
        
        ${loaderText.style.cssText.replace(/;/g, ' !important;')}
        
        .efecto-secundario {
            transform: scale(0.8) !important;
        }
    }
`;
    document.head.appendChild(style);

    // Eliminar overlay al finalizar
    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 1000);
        iniciarSegundoEfecto(); // Transición inmediata
    }, 1700);


    function iniciarSegundoEfecto() {
        // Segundo overlay - Efecto de confirmación
        const overlayFinal = document.createElement('div');
        overlayFinal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            animation: 
                efectoEntrada 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards,
                efectoSalida 5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        `;
    
        const mensajeFinal = document.createElement('div');
        mensajeFinal.innerHTML = `
            <div style="
                font-family: 'Courier New', monospace;
                font-size: 4em;
                color:rgb(0, 238, 255);
                text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
                text-align: center;
            ">
                <div style="
                    font-size: 1.5em;
                    margin-bottom: 20px;
                    animation: checkAnim 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                ">✓</div>
                Bienvenido!
            </div>
        `;
    
        overlayFinal.appendChild(mensajeFinal);
        document.body.appendChild(overlayFinal);
    
        // Keyframes dinámicos
        const style = document.createElement('style');
        style.textContent = `
            @keyframes efectoEntrada {
                0% { opacity: 0; transform: scale(1.2); }
                100% { opacity: 1; transform: scale(1); }
            }
            
            @keyframes efectoSalida {
                0% { opacity: 1; }
                100% { opacity: 0; }
            }
            
            @keyframes checkAnim {
                0% { opacity: 0; transform: scale(0); }
                80% { transform: scale(1.2); }
                100% { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    
        // Eliminar overlay final después de todo
        overlayFinal.addEventListener('animationend', () => {
            // Delay de 1 segundo antes de eliminar el overlay
            setTimeout(() => {
                overlayFinal.remove();
            }, 1200); // 1000 ms = 1 segundo
        });
        
    }
});

