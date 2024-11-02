# Signup Form Application
A full-stack Signup form application built with Django, Django REST Framework, Djoser, JWT token authentication for the backend, and React with TypeScript for the frontend.

## Features

- User registration with email and password
- JWT token-based authentication
- email verification and password reset functionality
- Automated testing with Pytest
- Code formatting with Black
- Frontend built with React and TypeScript

## Technologies Used

- **Backend**: Django, Django REST Framework, Djoser, JSON Web Tokens (JWT)
- **Frontend**: React, TypeScript
- **Testing**: Pytest
- **Code Formatting**: Black, ESLint, Prettier

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Melaku05/Signup-form.git
   cd Signup-form/backend


2. **Create a virtual environment and install packages**:
   ```bash
   python3 -m venv venv && \
   source venv/bin/activate && \
   pip install -r requirements.txt && \
   pip install -r requirements-dev.txt


3. **Create a .env file**:
   ```bash
   SECRET_KEY=your_django_secret_key
   EMAIL_HOST="mail.your-email-provider.com"
   EMAIL_PORT=your_email_port
   EMAIL_USE_SSL= True
   EMAIL_USE_TLS= False
   EMAIL_HOST_USER="your_email@example.com"
   EMAIL_HOST_PASSWORD="your_email_password"
   DEFAULT_FROM_EMAIL= "your_email@example.com"
   ADMIN_EMAIL= "your_email@example.com"


4. **Running the Project, and Sginup**:
 ```bash
   python manage.py migrate && \
   python manage.py runserver && \
   http://localhost:8000/auth/users/ 





5. **Running the frontend**:
```
```
   cd frontend
   npm install
   npm start
```
   


![Screenshot from 2024-11-02 19-28-19](https://github.com/user-attachments/assets/01afb75b-9d5c-4e13-9965-ca98c6ad2187)


![Screenshot from 2024-11-02 19-28-32](https://github.com/user-attachments/assets/f080a4ee-8504-4f76-9af4-7f9bee090b37)

