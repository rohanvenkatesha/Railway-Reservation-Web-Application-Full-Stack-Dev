from flask import Flask, request, jsonify, render_template
from flask_mysqldb import MySQL
import json
from datetime import timedelta
import MySQLdb.cursors
import logging

app = Flask(__name__)

# Setup logging
logging.basicConfig(filename='app.log', level=logging.DEBUG)

# Database configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'new_password'
app.config['MYSQL_DB'] = 'railway_reservation'

mysql = MySQL(app)

class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, timedelta):
            return str(obj)  # Convert timedelta to string
        return super().default(obj)

app.json_encoder = CustomJSONEncoder

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data['name']
    email = data['email']
    password = data['password']
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        
        # Check if the user already exists
        cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
        user = cursor.fetchone()
        if user:
            return jsonify({'message': 'User already exists!'}), 400

        # Register the new user
        cursor.execute('INSERT INTO users (name, email, password) VALUES (%s, %s, %s)', (name, email, password))
        mysql.connection.commit()
        cursor.close()
        return jsonify({'message': 'User registered successfully!'})
    except Exception as e:
        logging.error("Error in /register: %s", str(e))
        return jsonify({'message': 'Internal Server Error'}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM users WHERE email = %s AND password = %s', (email, password))
        user = cursor.fetchone()
        cursor.close()
        if user:
            return jsonify({'message': 'Login successful!', 'user': user})
        else:
            return jsonify({'message': 'Invalid credentials!'}), 401
    except Exception as e:
        logging.error("Error in /login: %s", str(e))
        return jsonify({'message': 'Internal Rohan Server Error'}), 500

@app.route('/trains', methods=['GET'])
def get_trains():
    try:
        # Log request details
        logging.info("Received request for /trains")
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM trains')
        trains = cursor.fetchall()
        cursor.close()

        # Log data fetched
        logging.info("Fetched trains data: %s", trains)

        # Convert timedelta to string representation
        for train in trains:
            train['departure_time'] = str(train['departure_time'])
            train['arrival_time'] = str(train['arrival_time'])

        return jsonify(trains)
    except Exception as e:
        logging.error("Error fetching trains: %s", str(e))
        return jsonify({'error': 'Failed to fetch trains'}), 500



@app.route('/reserve', methods=['POST'])
def reserve_ticket():
    data = request.get_json()
    user_id = data['user_id']
    train_id = data['train_id']
    date = data['date']
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('INSERT INTO reservations (user_id, train_id, date) VALUES (%s, %s, %s)', (user_id, train_id, date))
        mysql.connection.commit()
        cursor.close()
        return jsonify({'message': 'Ticket reserved successfully!'})
    except Exception as e:
        logging.error("Error in /reserve: %s", str(e))
        return jsonify({'message': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
