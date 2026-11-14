// js/pedirDatos.js
// Este archivo es el único que "habla" con la API. Si algún día cambiamos de API,
// se toca este archivo (y la clase Receta), no el resto.

// Traemos la clase Receta para convertir cada dato de la API en un objeto nuestro.
import Receta from './Receta.js';

// Dirección base de la API. No tiene "export", así que es privada de este archivo.
const URL_API = 'https://dummyjson.com/recipes';

// traerRecetas: pide recetas a la API y devuelve una lista de objetos Receta.
// - Si "consulta" viene vacía, trae las primeras 12 recetas.
// - Si trae texto (por ejemplo "pizza"), usa el buscador de la API.
// Es "async" porque pedir datos a internet tarda: adentro usamos "await"
// para esperar la respuesta sin congelar la página.
// Si algo sale mal, lanza un error (throw) que atrapa el try/catch de app.js.
export async function traerRecetas(consulta = '') {
    // Elegimos la dirección según haya búsqueda o no (operador ternario: condición ? sí : no).
    const endpoint = consulta 
        ? `${URL_API}/search?q=${consulta}&limit=12` 
        : `${URL_API}?limit=12`;

    // fetch hace el pedido; await espera a que llegue la respuesta.
    const respuesta = await fetch(endpoint);
    // respuesta.ok es false si el servidor contestó con error (404, 500, etc.).
    if (!respuesta.ok) throw new Error('Error al conectar con la API: ' + respuesta.status);
    
    // Convertimos el texto que llegó en un objeto de JavaScript.
    const datos = await respuesta.json();
    // La lista viene dentro de la propiedad "recipes". Si no está, usamos una lista vacía.
    const recetasRaw = datos.recipes || [];

    // map recorre la lista y, por cada dato crudo, crea un objeto Receta.
    // El resultado es una lista nueva de Recetas listas para dibujar.
    return recetasRaw.map((dato) => new Receta(dato));
}