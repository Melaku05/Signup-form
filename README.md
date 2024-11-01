# Signup Form API
A Signup form API built with Django, Django REST Framework, Djoser, and JWT token authentication.

## Features

- User registration with email and password
- JWT token-based authentication
- email verification and password reset functionality
- Automated testing with Pytest
- Code formatting with Black

## Technologies Used

- Django
- Django REST Framework
- Djoser
- JSON Web Tokens (JWT)
- Pytest
- Black

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Melaku05/Signup-form.git
   cd signup-form-api


2. **Create a virtual environment and install packages**:
   ```bash
   python -m venv venv && \
   source venv/bin/activate && \
   pip install -r requirements.txt && \
   pip install -r requirements-dev.txt


3. **Running the Project, and Sginup**:
 ```bash
python manage.py migrate && \
python manage.py runserver && \
http://localhost:8000/auth/users/ 
