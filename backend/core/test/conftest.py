import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

User = get_user_model()


@pytest.fixture
def api_client():

    return APIClient()


@pytest.fixture
def user_data():

    return {
        "email": "info@test.com",
        "password": "Mehsuir11@#",
    }
