function agregarCasa() {
    const nombreCasa = document.getElementById('nombreCasa').value;
    if (nombreCasa) {
        const nuevaCasa = {
            id: casas.length + 1,
            nombre: nombreCasa,
            habitaciones: []
        };
        casas.push(nuevaCasa);
        guardarDatos();
        document.getElementById('nombreCasa').value = ''; // Limpiar el input después de agregar
        mostrarCasas();
        mostrarCasasConPersonasAsignadas();
    }
}

function agregarHabitacion(casaId, camas) {
    const casa = casas.find(c => c.id === casaId);
    if (casa) {
        casa.habitaciones.push({
            id: casa.habitaciones.length + 1,
            camas: camas
        });
        guardarDatos();
        mostrarCasas();
        mostrarCasasConPersonasAsignadas();
    }
}

function mostrarCasas() {
    const seccionCasas = document.getElementById('casas');
    seccionCasas.innerHTML = ''; // Limpiar la sección antes de volver a mostrar

    casas.forEach(casa => {
        let divCasa = document.createElement('div');
        divCasa.classList.add('casa');
        divCasa.innerHTML = `<h2>${casa.nombre}</h2>`;
        
        ['2', '3', '4'].forEach(camas => {
            let boton = document.createElement('button');
            boton.textContent = `Añadir Habitación de ${camas} camas`;
            boton.onclick = () => agregarHabitacion(casa.id, parseInt(camas));
            divCasa.appendChild(boton);
        });

        casa.habitaciones.forEach(habitacion => {
            let divHabitacion = document.createElement('div');
            divHabitacion.classList.add('habitacion');
            divHabitacion.innerHTML = `Habitación ${habitacion.id} - ${habitacion.camas} camas`;
            divHabitacion.setAttribute('id', `habitacion-${casa.id}-${habitacion.id}`);
            divHabitacion.addEventListener('dragover', (e) => {
                e.preventDefault(); // Necesario para permitir el evento drop
            });
            divHabitacion.addEventListener('drop', (e) => {
                let personaId = e.dataTransfer.getData('text/plain');
                asignarPersonaAHabitacion(personaId, casa.id, habitacion.id, habitacion.camas);
            });
            divCasa.appendChild(divHabitacion);
        });
        

        seccionCasas.appendChild(divCasa);
    });
}