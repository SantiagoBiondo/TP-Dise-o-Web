// js/Receta.js
// Este archivo define la clase Receta: un "molde" para crear objetos receta.
// La API manda muchos datos por cada receta (ingredientes, instrucciones, calorías...).
// La clase se queda solo con los que vamos a mostrar y les pone nombres en castellano.
// Así, el resto del código usa receta.titulo en vez de dato.name.
// "export default" significa que esto es lo único que ofrece el archivo,
// por eso en pedirDatos.js se importa sin llaves: import Receta from './Receta.js'
export default class Receta {
    // El constructor se ejecuta cada vez que se escribe "new Receta(datos)".
    // Recibe "datos": el objeto tal cual lo manda la API para UNA receta.
    // "this" es la receta nueva que se está creando; le vamos agregando propiedades.
    constructor(datos) {
        // Copiamos la URL de la foto del plato.
        this.imagen = datos.image;

        // Si la API no manda nombre o cocina, el || pone un texto de reserva.
        this.titulo = datos.name || 'Receta sin nombre';
        this.campoCocina = datos.cuisine || 'Internacional';
        // Armamos un solo texto con dificultad, minutos de preparación y puntaje.
        // Las comillas invertidas (`) permiten meter variables con ${...}.
        this.campoDetalle = ${datos.difficulty} · Prep: ${datos.prepTimeMinutes} min · ⭐ ${datos.rating};

        // Texto alternativo (alt) para la imagen: lo leen los lectores de pantalla
        // y aparece si la foto no carga. Si la API manda el tipo de comida
        // (por ejemplo ["Dinner"]), lo agregamos entre paréntesis.
        const tipoComida = Array.isArray(datos.mealType) && datos.mealType.length > 0
            ? ` (${datos.mealType.join(', ')})`
            : '';
        this.altImagen = ${this.titulo}, plato de cocina ${this.campoCocina}${tipoComida};
    }
}