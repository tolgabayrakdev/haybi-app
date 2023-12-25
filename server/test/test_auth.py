from .test_main import client



def test_login():
    test_data = {
        "email": "tofsdfsdlgfsdfsssdadssd123@gmail.com",
        "password": "tolgafdsf1fsdfsd23"
    }
    response = client.post("api/v1/auth/login", json=test_data)
    assert response.status_code == 200
    assert response.json() == {
        "message": "Login is successful."
    }