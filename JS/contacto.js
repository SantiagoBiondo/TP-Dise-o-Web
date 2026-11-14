// js/contacto.js
// Validación del formulario de contacto. Revisa cada campo obligatorio y,
// si alguno está mal, avisa con un alert y no deja enviar.

// DOMContentLoaded espera a que el HTML termine de cargar antes de buscar el formulario;
// si no, getElementById podría no encontrarlo todavía.
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('form-contacto');

    // Esta función se ejecuta cada vez que se aprieta "Enviar Formulario" (evento submit).
    // "e" es el evento: trae información de lo que pasó y permite cancelarlo.
    // Las validaciones van en orden: si una falla, "return" corta la función ahí mismo
    // y no se revisan las siguientes. focus() pone el cursor en el campo con error.
    formulario.addEventListener('submit', (e) => {
        // Cortamos el envío por defecto para validar con JavaScript
        e.preventDefault();

        // Leemos lo que escribió la persona. trim() saca los espacios del principio y del final.
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const motivo = document.getElementById('motivo').value;
        const mensaje = document.getElementById('mensaje').value.trim();

        // Validaciones obligatorias
        if (nombre.length < 4) {
            alert('⚠️ El campo "Nombre y Apellido" debe tener al menos 4 caracteres.');
            document.getElementById('nombre').focus();
            return;
        }

        // Validación del email con una expresión regular (regex): un patrón de texto.
        // Este pide: algo + @ + algo + . + algo, sin espacios. test() devuelve true o false.
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            alert('⚠️ Por favor, ingresa un correo electrónico válido.');
            document.getElementById('email').focus();
            return;
        }

        // Validación de teléfono (exactamente 10 dígitos numéricos)
        const regexTelefono = /^[0-9]{10}$/;
        if (!regexTelefono.test(telefono)) {
            alert('⚠️ El teléfono debe contener exactamente 10 dígitos numéricos (ej. 1123456789).');
            document.getElementById('telefono').focus();
            return;
        }

        // Validación del select
        if (motivo === '') {
            alert('⚠️ Por favor, seleccioná un motivo de consulta.');
            document.getElementById('motivo').focus();
            return;
        }

        // Validación del textarea
        if (mensaje.length < 10) {
            alert('⚠️ El mensaje debe tener al menos 10 caracteres.');
            document.getElementById('mensaje').focus();
            return;
        }

        // Si llegamos hasta acá, ninguna validación hizo "return": todo está bien.
        alert('¡Formulario enviado con éxito! Gracias por comunicarte con el Recetario Web.');
        
        // reset() deja todos los campos como al principio, listos para otro mensaje.
        formulario.reset();
    });
});