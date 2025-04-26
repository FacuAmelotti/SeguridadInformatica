document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('temas-form');
    const temaSection = document.getElementById('tema-section');
    const evaluacionSection = document.getElementById('evaluacion-section');
    const preguntaTexto = document.getElementById('pregunta-texto');
    const opcionesLista = document.getElementById('opciones-lista');
    const siguienteBtn = document.getElementById('siguiente-btn');
    const finalizarBtn = document.getElementById('finalizar-btn');
    const contador = document.getElementById('contador');
    const area = document.getElementById('area');
    const titulo = document.getElementById('preg-titulo');
    const dificultad = document.getElementById('dificultad');

    let preguntas = [];
    let preguntasRestantes = [];
    let preguntaActual = null;
    let puntaje = 0;
    let respondidas = 0;
    let totalPreguntas = 0;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const temasSeleccionados = Array.from(document.querySelectorAll('input[name="tema"]:checked')).map(c => c.value);

        preguntas = [];

        try {
            const res = await fetch(`../json/general.json`);
            const data = await res.json();
            preguntas = preguntas.concat(data);
        } catch (err) {
            console.error(`Error cargando GENERAL.json`, err);
        }

        for (const tema of temasSeleccionados) {
            try {
                const res = await fetch(`../json/${tema}.json`);
                const data = await res.json();
                preguntas = preguntas.concat(data);
            } catch (err) {
                console.error(`Error cargando ${tema}.json`, err);
            }
        }

        if (preguntas.length === 0) {
            alert('No se pudieron cargar preguntas.');
            return;
        }

        preguntasRestantes = [...preguntas];
        totalPreguntas = Math.min(30, preguntasRestantes.length);
        puntaje = 0;
        respondidas = 0;

        siguienteBtn.classList.add('hidden');
        finalizarBtn.classList.add('hidden');

        temaSection.classList.add('hidden');
        evaluacionSection.classList.remove('hidden');
        siguienteBtn.classList.remove('hidden');
        finalizarBtn.classList.remove('hidden');
        mostrarSiguientePregunta();
    });



    function mostrarSiguientePregunta() {
        if (preguntasRestantes.length === 0 || totalPreguntas <= 0) {
            finalizarEvaluacion();
            return;
        }
    
        const index = Math.floor(Math.random() * preguntasRestantes.length);
        preguntaActual = preguntasRestantes.splice(index, 1)[0];
        totalPreguntas--;
    
        preguntaTexto.textContent = preguntaActual.Text;
        opcionesLista.innerHTML = '';
        siguienteBtn.disabled = true;
        finalizarBtn.disabled = true;
    
        // Mostrar área y dificultad
        area.textContent = `Área: ${preguntaActual.Topic || 'Sin especificar'}`;
        titulo.textContent = `Pregunta: ${respondidas +1}`;
        dificultad.textContent = `Dificultad: ${preguntaActual.Difficult || 'Sin especificar'}`;
        contador.textContent = `Puntaje: ${puntaje} / ${respondidas}`;
    
        // --- Mezclar opciones ---
        const opcionesConIndices = preguntaActual.Options.map((opcion, i) => ({ opcion, originalIndex: i }));
        const opcionesMezcladas = opcionesConIndices.sort(() => Math.random() - 0.5);
    
        // Guardar nueva relación para saber cuál es la correcta ahora
        preguntaActual.opcionesMezcladas = opcionesMezcladas;
    
        opcionesMezcladas.forEach(({ opcion }, i) => {
            const li = document.createElement('li');
            const btn = document.createElement('button');
            btn.textContent = opcion;
            btn.addEventListener('click', () => {
                seleccionarRespuesta(i, btn);
            });
            li.appendChild(btn);
            opcionesLista.appendChild(li);
        });
    }
    
    function seleccionarRespuesta(indice, boton) {
        const botones = opcionesLista.querySelectorAll('button');
        botones.forEach(b => b.disabled = true);
        respondidas++;
    
        const { originalIndex } = preguntaActual.opcionesMezcladas[indice];
        const correctaIndex = preguntaActual.opcionesMezcladas.findIndex(o => o.originalIndex === preguntaActual.CorrectAnswerIndex);
    
        if (originalIndex === preguntaActual.CorrectAnswerIndex) {
            boton.style.backgroundColor = 'green';
            puntaje++;
        } else {
            boton.style.backgroundColor = 'red';
            botones[correctaIndex].style.backgroundColor = 'green';
        }
    
        // Crear texto temporal debajo del botón correcto
        const correctoBoton = botones[correctaIndex];
        const textoCorrecto = document.createElement('p');
        textoCorrecto.textContent = `✅ ${preguntaActual.Options[preguntaActual.CorrectAnswerIndex]}`;
        textoCorrecto.style.color = 'green';
        textoCorrecto.style.marginTop = '8px';
        textoCorrecto.classList.add('texto-correcto');
    
        correctoBoton.parentElement.appendChild(textoCorrecto);
    
        contador.textContent = `Puntaje: ${puntaje} / ${respondidas}`;
        siguienteBtn.disabled = false;
        finalizarBtn.disabled = false;
    }
    
    siguienteBtn.addEventListener('click', () => {
        limpiarTextoCorrecto();
        mostrarSiguientePregunta();
    });
    
    finalizarBtn.addEventListener('click', () => {
        limpiarTextoCorrecto();
        finalizarEvaluacion();
    });
    
    function limpiarTextoCorrecto() {
        const textos = opcionesLista.querySelectorAll('.texto-correcto');
        textos.forEach(t => t.remove());
    }
    

    function finalizarEvaluacion() {
        preguntaTexto.textContent = `Evaluación terminada. Puntaje final: ${puntaje} de ${respondidas}`;
        opcionesLista.innerHTML = '';
        siguienteBtn.classList.add('hidden');
        finalizarBtn.classList.add('hidden');
        area.textContent = '';
        titulo.textContent = '';
        dificultad.textContent = '';
        contador.textContent = '';
    }
});
