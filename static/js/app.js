const apiBaseURL = 'http://localhost:5000';

// Register a new user
async function register() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    const response = await fetch(`${apiBaseURL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    });

    const result = await response.json();

    if (response.ok) {
        document.getElementById('register-message').innerText = 'Registration successful!';
        document.getElementById('register-form').reset();
    } else {
        document.getElementById('register-message').innerText = result.message;
    }
}

// Login an existing user
async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch(`${apiBaseURL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (response.ok) {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('user-section').style.display = 'block';
    } else {
        document.getElementById('login-message').innerText = result.message;
    }
}

// Fetch available trains
async function getTrains() {
    const response = await fetch(`${apiBaseURL}/trains`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const trains = await response.json();
        const trainsList = document.getElementById('trains-list');
        trainsList.innerHTML = '';
        trains.forEach(train => {
            const li = document.createElement('li');
            li.textContent = `Train ID: ${train.id}, Departure: ${train.departure_time}, Arrival: ${train.arrival_time}`;
            trainsList.appendChild(li);
        });
        document.getElementById('train-section').style.display = 'block';
    } else {
        document.getElementById('login-message').innerText = 'Failed to fetch trains. Please log in.';
    }
}

// Show the reservation form
function reserveTicket() {
    document.getElementById('train-section').style.display = 'none';
    document.getElementById('reserve-section').style.display = 'block';
}

// Submit a reservation request
async function submitReservation() {
    const trainId = document.getElementById('train-id').value;
    const reservationDate = document.getElementById('reservation-date').value;

    const response = await fetch(`${apiBaseURL}/reserve`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ train_id: trainId, date: reservationDate })
    });

    const result = await response.json();

    if (response.ok) {
        document.getElementById('reserve-message').innerText = 'Ticket reserved successfully!';
        document.getElementById('reserve-section').reset();
    } else {
        document.getElementById('reserve-message').innerText = result.message;
    }
}

// Logout the user
async function logout() {
    await fetch(`${apiBaseURL}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    document.getElementById('user-section').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'block';
}
