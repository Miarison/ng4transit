function register(firstname, lastname, email, role, password, callback) {
    data = {
        'firstname': firstname,
        'lastname': lastname,
        'email': email,
        'password': password,
        'role': role
    }

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/api/users/',
        dataType: 'json',
        contentType: 'application/json',
        headers: {"Authorization": 'Bearer '+localStorage.getItem('token')},
        data: JSON.stringify(data),
        success: function (data) { 
            callback(data); 
        }
    });
}