const URL = 'http://localhost:8081';






const createUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entry = {};
    entry['username'] = formData.get('username');
    entry['password'] = formData.get('password');

    fetch(`${URL}/users/sign-up`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
    }).then((result) => {
        result.json().then((entry) => {
        window.location.href="/login.html";

        });
    });
};



document.addEventListener('DOMContentLoaded', function(){
    const createUserForm = document.querySelector('#registerForm');
        createUserForm.addEventListener('submit', createUser);

});