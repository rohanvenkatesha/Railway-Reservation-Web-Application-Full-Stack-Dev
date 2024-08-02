# Railway Reservation Flask Backend API Testing

## Overview

This repository contains a Flask-based backend API for a railway reservation system. The API allows users to register, log in, view available trains, and reserve tickets. It is designed for testing purposes and demonstrates the integration of Flask with a MySQL database.

## Features

- **User Registration**: Allows users to create an account.
- **User Login**: Users can log in and receive a session token.
- **Train Listing**: Fetches and displays available trains.
- **Ticket Reservation**: Allows users to reserve tickets for a specific train on a specific date.
- **Session Management**: Ensures routes are accessible only after login.

## Installation

### Prerequisites

- Python 3.6 or higher
- MySQL
- Flask
- Flask-MySQLdb

### Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/Railway-Reservation-Flask-Backend-Api-Testing.git
   cd Railway-Reservation-Flask-Backend-Api-Testing
   ```

2. **Create a Virtual Environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows, use `venv\Scripts\activate`
   ```

3. **Install Dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set Up the Database:**

   Create a MySQL database named `railway_reservation` and set up the necessary tables. You can use the provided SQL scripts in the `db` folder (if available) or manually create the tables as needed.

5. **Configure the Application:**

   Edit `app.py` to set your MySQL database credentials and secret key:

   ```python
   app.config['MYSQL_HOST'] = 'localhost'
   app.config['MYSQL_USER'] = 'root'
   app.config['MYSQL_PASSWORD'] = 'your_password'
   app.config['MYSQL_DB'] = 'railway_reservation'
   app.secret_key = 'your_secret_key'
   ```

6. **Run the Application:**

   ```bash
   python app.py
   ```

   The application will start on `http://localhost:5000`.

## API Endpoints

### Register a New User

- **Endpoint:** `/register`
- **Method:** POST
- **Request Body:**

  ```json
  {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "your_password"
  }
  ```

- **Response:**

  ```json
  {
      "message": "User registered successfully!"
  }
  ```

### Login

- **Endpoint:** `/login`
- **Method:** POST
- **Request Body:**

  ```json
  {
      "email": "john@example.com",
      "password": "your_password"
  }
  ```

- **Response:**

  ```json
  {
      "message": "Login successful!",
      "user": {
          "id": 1,
          "name": "John Doe",
          "email": "john@example.com"
      }
  }
  ```

### Get Available Trains

- **Endpoint:** `/trains`
- **Method:** GET
- **Response:**

  ```json
  [
      {
          "id": 1,
          "name": "Train A",
          "departure_time": "08:00:00",
          "arrival_time": "12:00:00"
      }
  ]
  ```

### Reserve a Ticket

- **Endpoint:** `/reserve`
- **Method:** POST
- **Request Body:**

  ```json
  {
      "user_id": 1,
      "train_id": 1,
      "date": "2024-08-15"
  }
  ```

- **Response:**

  ```json
  {
      "message": "Ticket reserved successfully!"
  }
  ```

## Contributing

Feel free to submit pull requests or issues. Contributions are welcome!


## Follow these Steps for API Testing

Start the Flask app in a separate terminal

$flask run

curl -X POST -H "Content-Type: application/json" -d "{\"name\":\"John Doe\", \"email\":\"john@example.com\", \"password\":\"1234\"}" http://localhost:5000/register

curl -X POST -H "Content-Type: application/json" -d "{\"email\":\"john@example.com\", \"password\":\"1234\"}" http://localhost:5000/login

curl http://localhost:5000/trains

curl -X POST -H "Content-Type: application/json" -d "{\"user_id\": 1, \"train_id\": 1, \"date\": \"2024-07-15\"}" http://localhost:5000/reserve
