// Cargar la música
const music = new Audio('../audio/song.mp3');
music.loop = true;
music.volume = 0.16; // Volumen inicial

// Crear el contexto de audio
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const source = audioContext.createMediaElementSource(music);
const analyser = audioContext.createAnalyser();

// Conectar los nodos
source.connect(analyser);
analyser.connect(audioContext.destination);

// Configurar el analyser
analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Elementos HTML
const musicToggle = document.getElementById('music-toggle');
const volumeSlider = document.getElementById('volume-slider');
const backgroundOverlay = document.getElementById('background-overlay');

// Función para actualizar opacidad en tiempo real
function animate() {
    requestAnimationFrame(animate);

    analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
    }
    const average = sum / bufferLength;

    // Opacidad basada en la energía promedio de las frecuencias
    const opacity = ((average * 8 ) / 255) * 0.5; // máx 60%
    backgroundOverlay.style.opacity = opacity;
}

// Botón Play/Pause
musicToggle.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        audioContext.resume(); // Necesario porque el contexto empieza suspendido
        musicToggle.textContent = 'Pausa';
    } else {
        music.pause();
        musicToggle.textContent = 'Play';
    }
});

// Slider de volumen
volumeSlider.addEventListener('input', () => {
    music.volume = volumeSlider.value / 100;
});

// Iniciar
musicToggle.textContent = 'Pausa';
volumeSlider.value = 16;
music.play();
audioContext.resume();
animate();
