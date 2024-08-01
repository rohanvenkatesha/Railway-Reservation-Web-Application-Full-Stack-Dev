const apiBaseURL = 'http://localhost:5000';

function registerUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch(`${apiBaseURL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
}

function loginUser() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    fetch(`${apiBaseURL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Login successful!') {
            alert(data.message);
            console.log('User Info:', data.user); // Store user info if needed
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

// function getTrains() {
//     fetch(`${apiBaseURL}/trains`, {
//         method: 'GET'
//     })
//     .then(response => response.json())
//     .then(data => {
//         const trainsList = document.getElementById('trainsList');
//         trainsList.innerHTML = '';
//         data.forEach(train => {
//             const listItem = document.createElement('li');
//             listItem.textContent = `Train: ${train.name}, Departure: ${train.departure_time}, Arrival: ${train.arrival_time}`;
//             trainsList.appendChild(listItem);
//         });
//     })
//     .catch(error => console.error('Error:', error));
// }
function getTrains() {
    console.log('Fetching trains...');
    fetch('http://localhost:5000/trains', {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Data received:', data);
        const trainsList = document.getElementById('trainsList');
        trainsList.innerHTML = '';
        data.forEach(train => {
            const listItem = document.createElement('li');
            listItem.textContent = `Train: ${train.name}, Departure: ${train.departure_time}, Arrival: ${train.arrival_time}`;
            trainsList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error fetching trains:', error));
}

function reserveTicket() {
    const user_id = document.getElementById('userId').value;
    const train_id = document.getElementById('trainId').value;
    const date = document.getElementById('date').value;

    fetch(`${apiBaseURL}/reserve`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, train_id, date })
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
}
