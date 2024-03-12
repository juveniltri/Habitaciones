document.addEventListener('DOMContentLoaded', () => {
    window.casas = []; // Almacenará las casas y habitaciones
    window.personas = []; // Almacenará las personas
    mostrarCasas();
});

function agregarCasa() {
    const nombreCasa = document.getElementById('nombreCasa').value;
    if (nombreCasa) {
        const nuevaCasa = {
            id: casas.length + 1,
            nombre: nombreCasa,
            habitaciones: []
        };
        casas.push(nuevaCasa);
        document.getElementById('nombreCasa').value = ''; // Limpiar el input después de agregar
        mostrarCasas();
    }
}

function agregarHabitacion(casaId, camas) {
    const casa = casas.find(c => c.id === casaId);
    if (casa) {
        casa.habitaciones.push({
            id: casa.habitaciones.length + 1,
            camas: camas
        });
        mostrarCasas();
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
            divHabitacion.textContent = `Habitación ${habitacion.id} - ${habitacion.camas} camas`;
            divCasa.appendChild(divHabitacion);
        });

        seccionCasas.appendChild(divCasa);
    });
}

function agregarPersona() {
    const nombrePersona = document.getElementById('nombrePersona').value;
    if (nombrePersona) {
        const nuevaPersona = {
            id: personas.length + 1,
            nombre: nombrePersona
        };
        personas.push(nuevaPersona);
        mostrarPersonas();
    }
}

function mostrarPersonas() {
    // Implementa la lógica para mostrar las personas y permitir arrastrarlas a habitaciones
}