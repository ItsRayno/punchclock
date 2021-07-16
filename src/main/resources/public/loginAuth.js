const URL = 'http://localhost:8081';





const loginUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entry = {};
    entry['username'] = formData.get('username');
    entry['password'] = formData.get('password');

    fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
    }).then((result) => {
        result.json().then((entry) => {
            window.location.href="login.html";
        });
    });
};






document.addEventListener('DOMContentLoaded', function(){
    const loginUserForm = document.querySelector('#loginForm');
    loginUserForm.addEventListener('submit', loginUser);

});