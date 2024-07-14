# Railway-Reservation-Flask-Backend-Api-Testing

Start the flask app in seperate terminal
$flask run

## Follow these Steps for Api Testing

curl -X POST -H "Content-Type: application/json" -d "{\"name\":\"John Doe\", \"email\":\"john@example.com\", \"password\":\"1234\"}" http://localhost:5000/register

curl -X POST -H "Content-Type: application/json" -d "{\"email\":\"john@example.com\", \"password\":\"1234\"}" http://localhost:5000/login

curl http://localhost:5000/trains

curl -X POST -H "Content-Type: application/json" -d "{\"user_id\": 1, \"train_id\": 1, \"date\": \"2024-07-15\"}" http://localhost:5000/reserve
