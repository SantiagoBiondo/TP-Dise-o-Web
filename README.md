# Recetario Web — TP Final Diseño Web 2026

Sitio web de tres páginas que consume la **API pública de Recetas de DummyJSON** y muestra los platos en cards responsive, con un buscador en tiempo real, un formulario de contacto validado con JavaScript y una página con la presentación del equipo.

Trabajo Práctico Evaluativo final de **Diseño Web** · ISFT N° 194 · Tecnicatura Superior en Desarrollo de Software · 2.º año · Prof. Mauro Gonzalo Triaca.

🔗 Repositorio: [github.com/SantiagoBiondo/TP-Dise-o-Web](https://github.com/SantiagoBiondo/TP-Dise-o-Web)



## ⚙️ Detalles técnicos

### Estructura de archivos

```
TP-Dise-o-Web/
├── index.html         → Inicio: galería de recetas
├── contact.html       → Formulario de contacto
├── about.html         → Equipo y proyecto
├── README.md
├── css/
│   └── styles.css      → Estilos de las 3 páginas
├── img/                → Fotos de los integrantes e imagen del formulario
└── JS/
    ├── app.js          → Punto de entrada: arma la página de inicio y el buscador
    ├── pedirDatos.js   → Único archivo que habla con la API (fetch)
    ├── Receta.js       → Clase que modela los datos de cada receta
    ├── dibujar.js      → Todo lo que escribe en el DOM (cards, mensajes, error)
    └── contacto.js     → Validación del formulario de contacto
```