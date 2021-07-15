const URL = 'http://localhost:8081';
let entries = [];
let switchmode = {
    update: false,
    id: null
}





const dateAndTimeToDate = (dateString, timeString) => {
    return new Date(`${dateString}T${timeString}`).toISOString();
};

const createEntry = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entry = {};
    entry['checkIn'] = dateAndTimeToDate(formData.get('checkInDate'), formData.get('checkInTime'));
    entry['checkOut'] = dateAndTimeToDate(formData.get('checkOutDate'), formData.get('checkOutTime'));

    fetch(`${URL}/entries`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
    }).then((result) => {
        result.json().then((entry) => {
            entries.push(entry);
            renderEntries();
        });
    });
};



const indexEntries = () => {
    fetch(`${URL}/entries`, {
        method: 'GET'
    }).then((result) => {
        result.json().then((result) => {
            entries = result;
            renderEntries();
        });
    });
    renderEntries();
};



const deleteEntries = (id) => {
    fetch(`${URL}/entries/${id}`, {
        method: 'DELETE'
    }).then((result) => {
       indexEntries();
    });
};

/*const updateEntry = (entry) => {
    fetch(`${URL}/entries`, {
        method: 'PUT'
    }).then((result) => {
        editView(entry);

    });
};

 */

const updateEntry = (entry) => {
    fetch(`${URL}/entries/${entry.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
    }).then((result) => {
        result.json().then((entry) => {
            entries = entries.map((e) => e.id === entry.id ? entry : e);
            renderEntries();
        });
    });
}

const editEntry = (e) =>{

    e.preventDefault();
    const formData = new FormData(e.target);
    const entry = {};
    entry['checkIn'] = dateAndTimeToDate(formData.get('checkInDate'), formData.get('checkInTime'));
    entry['checkOut'] = dateAndTimeToDate(formData.get('checkOutDate'), formData.get('checkOutTime'));
    entry.id = switchmode.id;

    fetch(`${URL}/entries`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
    }).then((result) => {
       indexEntries();
       updateEntry(entry);
       switchmode.update = false;
       switchmode.id = null;
    });
};

const editView = (entry) => {
    const splicheckIn = entry.checkIn.split('T');
    const splitcheckOut = entry.checkOut.split('T');

    let checkIn = document.getElementById("checkIn");
    let checkInTime = document.getElementById("checkInTime");
    let checkOut = document.getElementById("checkOut");
    let checkOutTime = document.getElementById("checkOutTime");



    checkIn.value = splicheckIn[0];
    checkInTime.value = splicheckIn[1];
    checkOut.value = splitcheckOut[0];
    checkOutTime.value = splitcheckOut[1];
    
    
    switchmode.update = true;
    switchmode.id = entry.id;

}

const createCell = (text) => {
    const cell = document.createElement('td');
    cell.innerText = text;
    return cell;
};




const renderEntries = () => {
    const display = document.querySelector('#entryDisplay');
    display.innerHTML = '';
    entries.forEach((entry) => {
        const row = document.createElement('tr');
        const delteButton = document.createElement("Button");
        delteButton.innerHTML = "DELETE";
        delteButton.onclick = function() {
            deleteEntries(entry.id)
        };
        const editButton = document.createElement("button");
        editButton.innerHTML = "Edit";

        editButton.onclick = function (){
            editView(entry)
        };

        row.appendChild(createCell(entry.id));
        row.appendChild(createCell(new Date(entry.checkIn).toLocaleString()));
        row.appendChild(createCell(new Date(entry.checkOut).toLocaleString()));
        row.appendChild(delteButton);
        //row.appendChild(editButton);
        display.appendChild(row);
    });
};


document.addEventListener('DOMContentLoaded', function(){
    const createEntryForm = document.querySelector('#createEntryForm');
    if(switchmode.update){
        createEntryForm.addEventListener('submit', editEntry);

    }else {
        createEntryForm.addEventListener('submit', createEntry);
    }
    indexEntries();
});

