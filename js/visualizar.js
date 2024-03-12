function mostrarCasasConPersonasAsignadas() {
    window.personasAsignadas.forEach(persona => {
        const [casaId, habitacionId] = persona.asignadaA.split('-');
        const selectorHabitacion = `#habitacion-${casaId}-${habitacionId}`;
        const elementoHabitacion = document.querySelector(selectorHabitacion);

        if (elementoHabitacion) {
            const elementoPersona = document.createElement('div');
            elementoPersona.classList.add('persona');
            elementoPersona.textContent = persona.nombre;
            elementoHabitacion.appendChild(elementoPersona);
        }
    });
}

function mostrarMensajeTemporal(mensaje, elementoPadre) {
    let mensajeDiv = document.createElement('div');
    mensajeDiv.textContent = mensaje;
    mensajeDiv.style.color = 'red';
    mensajeDiv.style.position = 'absolute';
    mensajeDiv.style.backgroundColor = 'white';
    mensajeDiv.style.padding = '5px';
    mensajeDiv.style.border = '1px solid red';
    mensajeDiv.style.borderRadius = '5px';
    mensajeDiv.style.top = '0';
    mensajeDiv.style.right = '0';
    mensajeDiv.style.zIndex = '1000';
    
    elementoPadre.appendChild(mensajeDiv);
    
    setTimeout(() => {
        mensajeDiv.remove();
    }, 2000); // Remover el mensaje después de 2 segundos
}

function asignarPersonaAHabitacion(personaId, casaId, habitacionId, maxCamas) {
    const habitacionSelector = `#habitacion-${casaId}-${habitacionId}`;
    const habitacionElement = document.querySelector(habitacionSelector);
    const personasEnHabitacion = habitacionElement.querySelectorAll('.persona').length;

    if (personasEnHabitacion < maxCamas) {
        const personaIndex = window.personas.findIndex(persona => persona.id === parseInt(personaId));
        if (personaIndex !== -1) {
            const personaAsignada = window.personas.splice(personaIndex, 1)[0]; // Mover persona a asignadas
            personaAsignada.asignadaA = `${casaId}-${habitacionId}`;
            window.personasAsignadas.push(personaAsignada);

            // Actualiza la UI de la habitación
            const personaElement = document.createElement('div');
            personaElement.classList.add('persona');
            personaElement.textContent = personaAsignada.nombre;
            habitacionElement.appendChild(personaElement);

            guardarDatos();
            mostrarPersonas(); // Actualizar listado de personas no asignadas
        }
    } else {
        // Cambio temporal del color de fondo para indicar problema
        habitacionElement.style.backgroundColor = '#ffcccc';
        setTimeout(() => {
            habitacionElement.style.backgroundColor = ''; // Volver al color original después de 2 segundos
        }, 2000);

        // Mostrar un mensaje temporal sin interrumpir al usuario
        mostrarMensajeTemporal("No hay suficientes camas disponibles en esta habitación.", habitacionElement);
    }
}