document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('limpiarCache').addEventListener('click', limpiarCacheYReiniciar);
});

function limpiarCacheYReiniciar() {
    // Limpiar localStorage
    localStorage.removeItem('datosGestorHabitaciones');
    // Opcionalmente, puedes redirigir a la misma página para forzar una recarga completa
    window.location.reload();
}

function guardarDatos() {
    const datos = {
        casas: window.casas,
        personas: window.personas,
        personasAsignadas: window.personasAsignadas // Incluir personas asignadas
    };
    localStorage.setItem('datosGestorHabitaciones', JSON.stringify(datos));
}


function cargarDatos() {
    const datosGuardados = localStorage.getItem('datosGestorHabitaciones');
    if (datosGuardados) {
        const datos = JSON.parse(datosGuardados);
        window.casas = datos.casas || [];
        window.personas = datos.personas || [];
        window.personasAsignadas = datos.personasAsignadas || [];

        mostrarCasas();
        mostrarPersonas();
        // No es necesario un mostrarPersonasAsignadas si usamos mostrarCasasConPersonasAsignadas
        mostrarCasasConPersonasAsignadas(); // Esta función necesitará ser ajustada
    }
    console.log(window.casas);
    console.log(window.personas);
}