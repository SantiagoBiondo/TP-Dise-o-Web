// js/app.js
// Punto de entrada del sitio: es el único script que carga index.html (con type="module").
// Decide QUÉ pasa y en qué orden, pero no sabe CÓMO se piden los datos
// (eso lo hace pedirDatos.js) ni cómo se dibujan (eso lo hace dibujar.js).

// Traemos las funciones que necesitamos de los otros archivos. Van entre llaves
// porque en esos archivos se exportaron con nombre (export function ...).
import { traerRecetas } from './pedirDatos.js';
import { dibujarRecetas, dibujarMensaje, dibujarErrorConReintento } from './dibujar.js';

// Guardamos en variables los elementos del HTML que vamos a usar.
const contenedorGaleria = document.getElementById('galeria');
const buscador = document.getElementById('buscador');

// Guardamos la última búsqueda para que el botón "Reintentar" vuelva a pedir exactamente lo mismo.
let ultimaConsulta = '';

// buscarRecetas: es la función principal de la página. Maneja los tres estados:
//   1) loading: muestra "Cargando..." mientras espera.
//   2) success: si la API responde bien, dibuja las cards.
//   3) error:   si algo falla, muestra el error con el botón para reintentar.
// "consulta" es lo escrito en el buscador; si no se pasa nada, vale '' (todas las recetas).
async function buscarRecetas(consulta = '') {
    ultimaConsulta = consulta;
    dibujarMensaje('Cargando recetas... 🍳', contenedorGaleria);

    // try/catch: intentamos lo de "try"; si en algún paso se produce un error,
    // el programa salta directo al "catch" en vez de romperse.
    try {
        // await espera a que pedirDatos.js traiga las recetas.
        const recetas = await traerRecetas(consulta);
        dibujarRecetas(recetas, contenedorGaleria);
    } catch (error) {
        // Usamos la nueva función con botón y texto grande
        dibujarErrorConReintento(contenedorGaleria, error.message);

        // Asociamos el evento al botón recién creado en el DOM
        const btnReintentar = document.getElementById('btn-reintentar');
        if (btnReintentar) {
            btnReintentar.addEventListener('click', () => {
                buscarRecetas(ultimaConsulta);
            });
        }
    }
}

// Buscador en tiempo real con "debounce":
// cada vez que se escribe una letra (evento "input") se reinicia un temporizador de 300 ms.
// Solo cuando la persona deja de escribir por 300 ms se hace la búsqueda.
// Así no le pedimos datos a la API por cada letra ("p", "pi", "piz"...), sino una sola vez.
let temporizador;
buscador.addEventListener('input', (e) => {
    clearTimeout(temporizador);
    const consulta = e.target.value.trim();

    temporizador = setTimeout(() => {
        buscarRecetas(consulta);
    }, 300);
});

// Carga inicial: apenas se abre la página, mostramos las recetas sin búsqueda.
buscarRecetas();