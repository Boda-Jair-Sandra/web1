// Configurar la fecha del evento
const eventDate = new Date("November 2, 2024 17:00:00").getTime();

const countdown = setInterval(function() {
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    // Cálculo de días, horas, minutos y segundos
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Mostrar resultado en los elementos HTML correspondientes
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    // Si el contador ha terminado
    if (timeLeft < 0) {
        clearInterval(countdown);
        document.getElementById("countdown").innerHTML = "¡El evento ha comenzado!";
    }
}, 1000);

// Función para mostrar el formulario correspondiente
function mostrarFormulario(formId) {
    document.getElementById('form-acepto').style.display = formId === 'acepto' ? 'block' : 'none';
    document.getElementById('form-declino').style.display = formId === 'declino' ? 'block' : 'none';
}

// Para el formulario de aceptación
document.getElementById('form-acepto').addEventListener('submit', function (e) {
    e.preventDefault();
    const data = {
        nombre: this.querySelector('input[placeholder="Nombre"]').value,
        apellido: this.querySelector('input[placeholder="Apellido"]').value,
        telefono: this.querySelector('input[placeholder="Número de teléfono"]').value,
        acompanantes: this.querySelector('input[placeholder="Número de acompañantes"]').value,
    };
    fetch('https://web1-2-opm9.onrender.com/acepto', { // Cambiado a tu dominio
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => response.text())
      .then(data => alert(data))
      .catch(error => console.error('Error:', error));
});

// Para el formulario de rechazo
document.getElementById('form-declino').addEventListener('submit', function (e) {
    e.preventDefault();
    const data = {
        nombre: this.querySelector('input[placeholder="Nombre"]').value,
        apellido: this.querySelector('input[placeholder="Apellido"]').value,
        motivo: this.querySelector('input[placeholder="Motivo (Opcional)"]').value,
    };
    fetch('https://web1-2-opm9.onrender.com/declino', { // Cambiado a tu dominio
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => response.text())
      .then(data => alert(data))
      .catch(error => console.error('Error:', error));
});
