function agregarPersonas() {
    const nombres = document.getElementById('nombrePersona').value.split('\n');
    nombres.forEach(nombre => {
        nombre = nombre.trim(); // Eliminar espacios en blanco antes y después del nombre
        if (nombre) {
            const nuevaPersona = {
                id: window.personas.length + 1,
                nombre: nombre
            };
            window.personas.push(nuevaPersona);
        }
    });
    guardarDatos();
    mostrarPersonas();
    document.getElementById('nombrePersona').value = ''; // Limpiar el textarea después de agregar
}

function mostrarPersonas() {
    const seccionPersonas = document.getElementById('personas');
    seccionPersonas.innerHTML = ''; // Limpiar antes de volver a mostrar

    window.personas.forEach(persona => {
        let divPersona = document.createElement('div');
        divPersona.classList.add('persona');
        divPersona.textContent = persona.nombre;
        divPersona.setAttribute('draggable', true);
        divPersona.setAttribute('id', `persona-${persona.id}`);
        divPersona.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', persona.id);
        });
        seccionPersonas.appendChild(divPersona);
    });
}