# TP Final - Diseño Web (2026) 

¡Bienvenidos a nuestro repositorio! Este es el trabajo práctico final de la materia **Diseño Web** del ISFT N° 194 (Tecnicatura Superior en Desarrollo de Software, 2.° año - Prof. Mauro Gonzalo Triaca).

Sitio web multipágina de temática gastronómica que consume la **API pública de DummyJSON (Recetas)**, desarrollado con HTML5, CSS3 y JavaScript moderno.

🔗 **Link al repositorio:** [GitHub - TP-Dise-o-Web](https://github.com/SantiagoBiondo/TP-Dise-o-Web)

---

## 👥 Integrantes del Grupo

| Integrante          | Rol / Tareas principales                                                     |
| :------------------ | :--------------------------------------------------------------------------- |
| **Santiago Biondo** | Maquetación Frontend, diseño UI, gestión de GitHub y sección de contacto.    |
| **Martín Romano**   | Consumo de API, lógica en JavaScript y sección "Nosotros" (About).           |
| **Gustavo Fossati** | Formulario de contacto, validaciones, maquetación de inicio y documentación. |

---
## 🎨 Temática y decisiones de diseño

Elegimos una **temática gastronómica cálida y cercana**, que evoca la cocina casera. La paleta usa tonos tierra y anaranjados, con buen contraste para leer cómodo:

| Color     | Uso                                             | Variable CSS      |
| --------- | ----------------------------------------------- | ----------------- |
| `#fff4e6` | Fondo crema                                     | `--claro`         |
| `#4a2c1a` | Texto marrón                                    | `--marron`        |
| `#e8590c` | Naranja principal: header, botones, detalles    | `--naranja`       |
| `#d04e0a` | Naranja más oscuro para el hover de los botones | `--naranja-hover` |
| `#f59f00` | Anaranjado del footer                           | `--anaranjado`    |
| `#ffffff` | Cards y cajas                                   | `--blanco`        |

- Las fotos de los platos son las protagonistas: por eso las cards son blancas, con sombras suaves y sin bordes marcados.
- En el About reutilizamos la misma grilla y el mismo diseño de card para presentar al equipo, para que el sitio se vea coherente.
- Cada foto tiene un texto alternativo (`alt`) descriptivo para que el sitio sea accesible.

---
## 📄 Páginas del Sitio

* **`index.html` (Inicio):** Muestra la galería de recetas obtenidas de la API en formato de tarjetas (*cards*), con un buscador en tiempo real y manejo de estados (carga y error).
* **`contact.html` (Contacto):** Formulario de contacto con validaciones hechas en JavaScript (longitud de campos, email, teléfono, etc.) y diseño adaptado.
* **`about.html` (Nosotros):** Presentación del equipo de trabajo, los roles, los detalles del proyecto y la API utilizada.

*Nota: Las tres páginas comparten la misma barra de navegación y el pie de página.*

---
## 🛠️ Tecnologías utilizadas

* **HTML5** (Estructura semántica)
* **CSS3** (Variables, Flexbox, Grid y diseño Responsive con enfoque *Mobile First*)
* **JavaScript (ES6+)** (Módulos, peticiones con `fetch` y `async/await`, programación orientada a objetos con Clases)
* **API Externa:** [DummyJSON Recipes](https://dummyjson.com/docs/recipes)
* **Herramientas:** Visual Studio Code, Git y GitHub

---
## 🗂️ Estructura de carpetas

TP-Dise-o-Web/
├── index.html
├── contact.html
├── about.html
├── README.md
├── css/
│   └── styles.css
├── img/
│   ├── santy.jpg
│   ├── gus.jpg
│   ├── martin.jpg
│   └── libro.jpg
│
└── JS/
    ├── app.js          # Archivo principal que une la app y el buscador
    ├── pedirDatos.js   # Maneja el fetch con la API
    ├── Receta.js       # Clase para estructurar los datos de las recetas
    ├── dibujar.js      # Se encarga de escribir y actualizar el DOM
    └── contacto.js     # Validaciones del formulario
## 🔌 Funcionamiento de la API, JavaScript y Validaciones

Para este proyecto decidimos estructurar el código en **Módulos de JavaScript** (`ES Modules`) para mantener todo ordenado y separar responsabilidades:

1. **Petición a la API (`pedirDatos.js`):** 
   Utilizamos `fetch` junto con `async/await` para conectarnos a la API pública de **DummyJSON Recipes**. Tenemos una función que se encarga exclusivamente de traer los datos (ya sea la lista inicial de 12 recetas o el resultado del buscador).

2. **Modelado de datos (`Receta.js`):** 
   Creamos una clase llamada `Receta` para limpiar y organizar la información que nos devuelve la API. De esta manera, cada receta se convierte en un objeto ordenado con las propiedades exactas que necesitamos (título, imagen, tipo de cocina, detalles de dificultad/tiempo y el texto alternativo).

3. **Renderizado en el DOM (`dibujar.js`):** 
   Este archivo toma los datos ya procesados y se encarga de inyectarlos dinámicamente en el HTML. También maneja los estados visuales:
   * Muestra un mensaje de **carga** mientras espera la respuesta.
   * Dibuja la **grilla de cards** si todo sale bien.
   * Muestra un mensaje de **error** con un botón para reintentar si algo falla.

4. **Buscador en tiempo real con *Debounce* (`app.js`):** 
   Para evitar saturar a la API haciendo una consulta por cada tecla que presiona el usuario, implementamos un temporizador (*debounce*) de 300 ms. El buscador espera a que el usuario termine de escribir para realizar la petición.

5. **Validación del Formulario de Contacto (`contacto.js`):** 
   Para controlar que los datos ingresados sean válidos, interceptamos el evento `submit` del formulario usando `preventDefault()`. Evaluamos cada campo bajo ciertas reglas:
   * **Nombre:** Debe tener al menos 4 caracteres.
   * **Email:** Se valida que cumpla con un formato de correo electrónico correcto (usando expresiones regulares).
   * **Teléfono:** Se comprueba que contenga exactamente 10 dígitos.
   * **Motivo / Preferencia:** Se verifica que se haya seleccionado una opción obligatoria.
   * **Mensaje:** Debe tener un mínimo de 10 caracteres.
   
   Si hay algún error, el script dispara una alerta (`alert`) específica indicando qué falta o qué está mal y pone el foco (*focus*) automáticamente en el campo con problemas. Si todo es correcto, muestra un mensaje de éxito y blanquea el formulario.