// js/dibujar.js
// Este archivo se encarga de todo lo que se ve en pantalla: escribe en el DOM
// (el HTML de la página) las cards, los mensajes y el error.
// Cada función tiene "export" para que app.js pueda usarla con import { ... }.

// dibujarRecetas: recibe la lista de recetas y el elemento donde mostrarlas
// (el <div id="galeria">) y crea una card por cada receta.
export function dibujarRecetas(recetas, contenedor) {
    // Vaciamos el contenedor para borrar lo anterior (el "Cargando..." o una búsqueda vieja).
    contenedor.innerHTML = '';

    // Si la búsqueda no encontró nada, mostramos un aviso y salimos de la función.
    if (recetas.length === 0) {
        dibujarMensaje('No se encontraron recetas con ese criterio.', contenedor);
        return;
    }

    // forEach recorre la lista: el código de adentro se repite una vez por receta.
    recetas.forEach((receta) => {
        // Creamos un <div> nuevo y le ponemos la clase "tarjeta" para que tome los estilos del CSS.
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta');

        // Llenamos la card con su contenido: imagen, título y los dos campos de texto.
        tarjeta.innerHTML = `
            <img src="${receta.imagen}" alt="${receta.altImagen}" loading="lazy">
            <div class="tarjeta-info">
                <h2>${receta.titulo}</h2>
                <span class="tarjeta-subtitulo">${receta.campoCocina}</span>
                <span class="tarjeta-subtitulo2">${receta.campoDetalle}</span>
            </div>
        `;
        // appendChild agrega la card terminada dentro del contenedor, y recién ahí se ve.
        contenedor.appendChild(tarjeta);
    });
}

// dibujarMensaje: reemplaza todo lo que haya en el contenedor por un texto simple.
// Se usa para el estado de carga ("Cargando recetas...") y para "no se encontraron recetas".
export function dibujarMensaje(texto, contenedor) {
    contenedor.innerHTML = `<div class="mensaje">${texto}</div>`;
}

// dibujarErrorConReintento: muestra un mensaje de error claro cuando falla la API,
// con un botón "Volver a intentar". El detalle técnico del error va a la consola (F12),
// no a la pantalla, porque al usuario no le sirve leer "Error 500".
// Ojo: esta función solo DIBUJA el botón; qué hace al hacerle clic lo decide app.js.
export function dibujarErrorConReintento(contenedor, mensajeError) {
    console.error('Detalle del error:', mensajeError);

    contenedor.innerHTML = `
        <div class="contenedor-error">
            <p class="texto-error">
                <span class="icono-error">⚠️</span>
                <span class="linea-principal">Error al cargar las recetas.</span>
                <span class="linea-secundaria">Inténtalo de nuevo más tarde.</span>
            </p>
            <button id="btn-reintentar" class="boton-reintentar">Volver a intentar</button>
        </div>
    `;
}