const URL = 'http://localhost:8081';
let users = [];
let mode = true;
let currentUser;


const resetForm = () => {
    const entryForm = document.querySelector('#loginForm');
    entryForm.reset();
    mode = true;
    currentUser = null;
}

const indexEntries = () => {
    fetch(`${URL}/users`, {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('auth')
        }
    }).then((result) => {
        result.json().then((result) => {
            users = result;
            renderEntries();
        });
    });
    renderEntries();
};



const deleteUser = (id) => {
    fetch(`${URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': localStorage.getItem('auth')
        }
    }).then((result) => {
        indexEntries();
    });
};



const editView = (user) => {
    const username = user.username;

    let usernameForm = document.getElementById("username");


    usernameForm.value = username;

    mode= false;
    currentUser = user;

}

const createCell = (text) => {
    const cell = document.createElement('td');
    cell.innerText = text;
    return cell;
};

const renderEntries = () => {
    const display = document.querySelector('#entryDisplay');
    display.innerHTML = '';
    users.forEach((user) => {
        const row = document.createElement('tr');
        const delteButton = document.createElement("Button");
        delteButton.innerHTML = "DELETE";
        delteButton.onclick = function() {
            deleteUser(user.id)
        };
        const editButton = document.createElement("button");
        editButton.innerHTML = "Edit";

        editButton.onclick = function (){
            editView(user)
        };

        row.appendChild(createCell(user.id));
        row.appendChild(createCell(user.username));
        row.appendChild(delteButton);
        row.appendChild(editButton);
        display.appendChild(row);
    });
};
const createUser = (user) =>{
    fetch(`${URL}/users/sign-up`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth')
        },
        body: JSON.stringify(user)
    }).then((result) => {
        indexEntries();
        result.json().then((user) => {
            console.log('Response:', response)
            return response.json();
        });
    });
};

const updateUser = (user) => {
    fetch(`${URL}/users/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth')
        },
        body: JSON.stringify(user)
    }).then((result) => {
        indexEntries();
        result.json().then((user) => {
            //users = users.map((e) => e.id === user.id ? entry : e);
        });
    });
}

const saveForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = {};
    user['username'] = formData.get('username');
    user['password'] = formData.get('password');
    if (mode) {
        createUser(user);
    } else {
        user.id = currentUser.id;
        updateUser(user);
    }
    resetForm();
    }


document.addEventListener('DOMContentLoaded', function(){
    const createEntryForm = document.querySelector('#loginForm');
    createEntryForm.addEventListener('submit', saveForm);
    indexEntries();
});

