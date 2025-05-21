document.getElementById('clickMe').addEventListener('click', allCarsOption);
document.getElementById('addNewCar').addEventListener('click', displayForm);
document.getElementById('closeForm').addEventListener('click', closeForm);
document.getElementById('closeFormUpdate').addEventListener('click', closeFormUpdate);

function allCarsOption () {
    
    // This function is called when the "Show All Cars" button is clicked. It toggles
    // the display of all cars by calling the showAllCars() or hideAllCars() function.
    const titleEnum = Object.freeze({show: "Show All Cars",  hide: "Hide All Cars"});
    const button = document.getElementById('clickMe');
    if (button.innerHTML === titleEnum.show) {
        button.innerHTML = titleEnum.hide;
        showAllCars();
    } else {
        button.innerHTML = titleEnum.show;
        hideAllCars();
    }
}

function displayForm() {

    // This function is called when the "Add New Car" button is clicked. It displays the form
    // for adding a new car by changing the display style of the form element.
    closeFormUpdate(event);
    const form = document.getElementById('popForm');
    return form.style.display = 'block';
}

function closeForm(event) {

    // This function is called when the "Close" button in the form is clicked. It hides the form
    // by changing the display style of the form element.
    event.preventDefault(); // It prevents form submission if button is in a form.
    const form = document.getElementById('popForm');
    return form.style.display = 'none';
}

function displayFormUpdate() {

    // This function is called when the "edit" button is clicked. It displays the form
    // for editing a car by changing the display style of the form element.
    closeForm(event);
    const form = document.getElementById('popFormUpdate');
    return form.style.display = 'block';
}

function closeFormUpdate(event) {

    // This function is called when the "Close" button in the form is clicked. It hides the form
    // by changing the display style of the form element.
    event.preventDefault();
    const form = document.getElementById('popFormUpdate');
    return form.style.display = 'none';
}

function createCar(event) {

    // This function is called when the form is submitted. It collects the data from 
    // the form fields, constructs a car object, and sends it to the server.
    event.preventDefault();
    const car = {
        model: document.getElementById('model').value,
        brand: document.getElementById('brand').value,
        fabrication: parseInt(document.getElementById('fabrication').value, 10),
        color: document.getElementById('color').value,
        mileage: parseInt(document.getElementById('mileage').value, 10),
        plate: document.getElementById('plate').value,
        price: document.getElementById('price').value,
        status: document.getElementById('status').value
    };
    fetch('http://localhost:8080/cars/create_car', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
    })
    .then(response => {
        if (response.ok) {
            alert('Car created successfully!');
            document.querySelector('form').reset();
            closeForm(event);
        } else {
            alert('Failed to create car.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error creating car.');
    });
}

function showAllCars() {

    // This function fetches all cars from the server and displays them in a table.
    // It sends a GET request to the server and processes the response.
    fetch('http://localhost:8080/cars/all_cars', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        let output = `
            <tbody>
        `;
        data.forEach(car => {
            output += `
                <tr id="car-${car.id}">
                    <td>${car.model}</td>
                    <td>${car.brand}</td>
                    <td>${car.fabrication ?? 'N/A'}</td>
                    <td>${car.color}</td>
                    <td>${car.mileage} km</td>
                    <td>${car.plate}</td>
                    <td>$${car.price}</td>
                    <td>${car.status}</td>
                    <td>
                         <button class="edit-btn" onclick="editCarLoad(${car.id})">Edit</button>
                    </td>
                    <td>
                        <button class="delete-btn" onclick="deleteCar(${car.id})">Delete</button>
                    </td>
                </tr>
            `;
        });
        output += `
                </tbody>
            </table>
        `;
        document.getElementById('showAllCars').innerHTML = output;
    })
    .catch(error => {
        console.error('Error fetching cars:', error);
        document.getElementById('showAllCars').innerHTML = '<p>Error loading cars.</p>';
    });
}

function hideAllCars() {

    // This function hides the table of cars by setting its inner HTML to an empty string.
    document.getElementById('showAllCars').innerHTML = '';
}

function editCarLoad(carId) {

    // This function is called when the "Edit" button is clicked. It fetches the car data
    // from the server and populates the form fields with the car's current data.
    // It also displays the form for editing the car.
    displayFormUpdate();
    carId = parseInt(carId, 10);
    fetch(`http://localhost:8080/cars/get_car/${carId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(car => {
        document.getElementById('model_update').value = car.model;
        document.getElementById('brand_update').value = car.brand;
        document.getElementById('fabrication_update').value = car.fabrication;
        document.getElementById('color_update').value = car.color;
        document.getElementById('mileage_update').value = car.mileage;
        document.getElementById('plate_update').value = car.plate;
        document.getElementById('price_update').value = car.price;
        document.getElementById('status_update').value = car.status;
        document.getElementById('carId').value = car.id;
    })
    .catch(error => {
        console.error("Error fetching car data:", error);
    });
}

function updateCar(event) {

    // This function takes the updated data from the form, constructs a car object, 
    // and sends it to the server to update the car with the specified ID.    
    event.preventDefault();
    const car = {
        id: document.getElementById('carId').value,
        model: document.getElementById('model_update').value,
        brand: document.getElementById('brand_update').value,
        fabrication: parseInt(document.getElementById('fabrication_update').value, 10),
        color: document.getElementById('color_update').value,
        mileage: parseInt(document.getElementById('mileage_update').value, 10),
        plate: document.getElementById('plate_update').value,
        price: document.getElementById('price_update').value,
        status: document.getElementById('status_update').value
    };
    fetch(`http://localhost:8080/cars/update_car/${car.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
    })
    .then(response => {
        if (response.ok) {
            alert('Car updated successfully!');
            document.querySelector('form').reset();
            closeFormUpdate(event);
        } else {
            alert('Failed to update car.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error updating car.');
    });
}

function deleteCar(carId) {

    // This function is called when the "Delete" button is clicked. It sends a DELETE request
    // to the server to delete the car with the specified ID.
    carId = parseInt(carId, 10);
    fetch(`http://localhost:8080/cars/delete_car/${carId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            const row = document.getElementById(`car-${carId}`);
            if (row) row.remove();
        } else {
            alert('Failed to delete car.');
        }
    });
}