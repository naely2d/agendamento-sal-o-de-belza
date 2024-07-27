document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('appointment-form');
    const appointmentList = document.getElementById('appointment-list');

    // Load appointments from LocalStorage
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

    function saveAppointments() {
        localStorage.setItem('appointments', JSON.stringify(appointments));
    }

    function renderAppointments() {
        appointmentList.innerHTML = '';
        appointments.forEach((appointment, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>Nome:</strong> ${appointment.name}<br>
                <strong>E-mail:</strong> ${appointment.email}<br>
                <strong>Serviço:</strong> ${appointment.service}<br>
                <strong>Data:</strong> ${appointment.date}<br>
                <strong>Horário:</strong> ${appointment.time}<br>
                <button data-index="${index}">Cancelar</button>
            `;
            appointmentList.appendChild(li);
        });
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        const appointment = { name, email, service, date, time };
        appointments.push(appointment);
        saveAppointments();
        renderAppointments();
        form.reset();
    });

    appointmentList.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const index = event.target.getAttribute('data-index');
            appointments.splice(index, 1);
            saveAppointments();
            renderAppointments();
        }
    });

    renderAppointments();
});
