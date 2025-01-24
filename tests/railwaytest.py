import unittest
import json
from app import app

class TestRailwayAPI(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_register(self):
        response = self.app.post('/register', data=json.dumps({
            'name': 'John Doe', 
            'email': 'johndoe@example.com', 
            'password': 'password123'
        }), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('User registered successfully!', response.data.decode())

    def test_login(self):
        response = self.app.post('/login', data=json.dumps({
            'email': 'johndoe@example.com', 
            'password': 'password123'
        }), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('Login successful!', response.data.decode())

if __name__ == '__main__':
    unittest.main()
