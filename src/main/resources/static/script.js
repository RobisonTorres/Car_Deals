document.getElementById('addNewCar').addEventListener('click', displayForm);
function displayForm() {

    // This function is called when the "Add New Car" button is clicked. It displays the form
    // for adding a new car by changing the display style of the form element.
    closeFormUpdate(event);
    const input = document.getElementById('brand');
    if (input.options.length <= 1) {
        brandSelect(input);
    }
    const form = document.getElementById('popForm');
    return form.style.display = 'block';
}

document.getElementById('closeForm').addEventListener('click', closeForm);
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

document.getElementById('closeFormUpdate').addEventListener('click', closeFormUpdate);
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
    let brandSelect = document.getElementById('brand');
    let brandInput = brandSelect.options[brandSelect.selectedIndex].text;
    if (brandInput === 'Other') {
        brandInput = document.getElementById('brandNew').value;
    }
    const brand = {
        id: parseInt(brandSelect.options[brandSelect.selectedIndex].value, 10),
        name: brandInput
    }
    const car = {
        model: document.getElementById('model').value,
        fabrication: parseInt(document.getElementById('fabrication').value, 10),
        color: document.getElementById('color').value,
        mileage: parseInt(document.getElementById('mileage').value, 10),
        plate: document.getElementById('plate').value,
        price: document.getElementById('price').value,
        status: document.getElementById('status').value
    };
    if (!car.model || !car.fabrication || !car.color || !car.plate || !car.price || !car.status) {
        alert('Please fill in all fields.');    
        return;
    };
    const bcWrapperDtoCreate = {
        brandDto: brand,
        carDto: car
    }; 
    fetch('http://localhost:8080/cars/create_car', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bcWrapperDtoCreate)
    })
    .then(response => {
        if (response.ok) {
            alert('Car created successfully!');
            document.querySelector('form').reset();
            closeForm(event);
            location.reload(true);
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
    <div>
        <table>
            <thead>
                <tr>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Fabrication Date</th>
                    <th>Color</th>
                    <th>Mileage</th>
                    <th>Plate</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody id="showAllCars">
`;

    data.forEach(car => {
        output += `
            <tr id="car-${car.id}">
            <td>${car.brand.name}</td>
            <td>${car.model}</td>
            <td>${car.fabrication ?? 'N/A'}</td>
            <td>${car.color}</td>
            <td>${car.mileage} km</td>
            <td>${car.plate}</td>
            <td>$${car.price}</td>
            <td>${car.status}</td>
            <td>
                <button class="edit-btn" id="editCar" onclick="editCarLoad(${car.id})">Edit</button>
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
    </div>
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
    const input = document.getElementById('brand_update');
    if (input.options.length <= 1) {
        // If the brand selection input is empty, it fetches the available brands.
        brandSelect(input);
    }
    carId = parseInt(carId, 10);
    fetch(`http://localhost:8080/cars/get_car/${carId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())    
    .then(car => {
        let brandSelect = car.brand.id;
        document.getElementById('brand_update').value = brandSelect;
        document.getElementById('model_update').value = car.model;
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
    let brandSelect = document.getElementById('brand_update');
    let brandInput = brandSelect.options[brandSelect.selectedIndex].text;
    if (brandInput === 'Other') {
        brandInput = document.getElementById('brandUpdate').value;
    };
    const brand = {
        id: parseInt(document.getElementById('brand_update').value, 10),
        name: brandInput
    };
    const car = {
        id: document.getElementById('carId').value,
        model: document.getElementById('model_update').value,
        fabrication: parseInt(document.getElementById('fabrication_update').value, 10),
        color: document.getElementById('color_update').value,
        mileage: parseInt(document.getElementById('mileage_update').value, 10),
        plate: document.getElementById('plate_update').value,
        price: document.getElementById('price_update').value,
        status: document.getElementById('status_update').value
    };
    if (!car.model || !car.fabrication || !car.color || !car.plate || !car.price || !car.status) {
        alert('Please fill in all fields.');
        return;
    };
    const brandCarWrapperUpdate = {
        brandDto: brand,
        carDto: car
    };   
    fetch(`http://localhost:8080/cars/update_car/${car.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(brandCarWrapperUpdate)
    })
    .then(response => {
        if (response.ok) {
            alert('Car updated successfully!');
            document.querySelector('form').reset();
            closeFormUpdate(event);
            hideFiltersCars(event);           
            showAllCars();
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
    if (!confirm('Are you sure you want to delete this car?')) {
        return; // If the user cancels, do nothing.
    };
    carId = parseInt(carId, 10);
    fetch(`http://localhost:8080/cars/delete_car/${carId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            const row = document.getElementById(`car-${carId}`);
            if (row) row.remove();
            hideAllCars();
            showAllCars();
        } else {
            alert('Failed to delete car.');
        }
    });
}

function brandSelect(brandInput) {

    // This function fetches all car brands from the server and populates the brand selection input
    // with the available brands. It also adds an "Other" option to allow users to enter a new brand.
    fetch('http://localhost:8080/cars/all_brands', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(brand => {
            const newOption = document.createElement('option');
            newOption.value = brand.id;
            newOption.text = brand.name;
            brandInput.appendChild(newOption);
        });
        if (brandInput != filter_brand) {
            const newOption = document.createElement('option');
            newOption.value = 'Other';
            newOption.text = 'Other';   
            brandInput.appendChild(newOption);
        }
    })
}

function addNewBrand(event) {
    
    // This function is called when the brand selection input changes. If the user selects "Other",
    // it displays an input field for the user to enter a new brand name. Otherwise, it hides the input field.
    const select = event.target;
    const brandNewInput = document.getElementById('brandNew');
    const brandUpdateInput = document.getElementById('brandUpdate');
    if (select.value === 'Other') {
        brandNewInput.style.display = 'block';
        brandUpdateInput.style.display = 'block';
    } else {
        brandNewInput.style.display = 'none';
        brandNewInput.style.display = 'none';
    }
}

document.getElementById('filter_brand').addEventListener('change', modelSelect);
function modelSelect() {

    // This function is called when the brand selection input changes. It fetches the models
    // associated with the selected brand and populates the model selection input with the available models.
    const select = document.getElementById('filter_model');
    select.innerHTML = `<option value="" disabled selected hidden>Model</option>`;
    const brandId = document.getElementById('filter_brand').value;

    fetch(`http://localhost:8080/cars/filter_brand/${brandId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        const models = new Set();
        data.forEach(car => {
            if (!models.has(car.model)) {
                models.add(car.model);
                const option = document.createElement('option');
                option.value = car.model;
                option.text = car.model;
                select.appendChild(option);
            }
        });
    });
}

document.getElementById('filter_model').addEventListener('change', yearSelect);
function yearSelect() {

    // This function is called when the model selection input changes. It fetches the years
    // associated with the selected model and populates the year selection input with the available years.
    const select = document.getElementById('filter_year');
    select.innerHTML = `<option value="" disabled selected hidden>Year</option>`;
    const model = document.getElementById('filter_model').value;

    fetch(`http://localhost:8080/cars/filter_model/${model}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        const models = new Set();
        data.forEach(car => {
            if (!models.has(car.fabrication)) {
                models.add(car.fabrication);
                const option = document.createElement('option');
                option.value = car.fabrication;
                option.text = car.fabrication;
                select.appendChild(option);
            }
        });
    });
}

function filterCars(event) {

    // This function is called when the filter form is submitted. It collects the filter criteria
    // from the form fields, constructs a query string, and sends a GET request to the server
    // to filter the cars based on the selected criteria.
    event.preventDefault();
    const brand = document.getElementById('filter_brand').value;
    const model = document.getElementById('filter_model').value;
    const fabrication = parseInt(document.getElementById('filter_year').value, 10);
    const status = document.getElementById('filter_status').value;

    if (!brand || !model || !fabrication || !status) {
        alert('Please select all filter criteria.');
        return;
    }

    fetch(`http://localhost:8080/cars/filter_cars?brand=${brand}&model=${model}&fabrication=${fabrication}&status=${status}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        let output = `
            <table>
                <thead>
                    <tr>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Fabrication Date</th>
                        <th>Color</th>  
                        <th>Mileage</th>
                        <th>Plate</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
        `;
        data.forEach(car => {
            output += `
                <tr id="car-${car.id}">
                    <td>${car.brand.name}</td>
                    <td>${car.model}</td>
                    <td>${car.fabrication ?? 'N/A'}</td>
                    <td>${car.color}</td>
                    <td>${car.mileage} km</td>
                    <td>${car.plate}</td>
                    <td>$${car.price}</td>
                    <td>${car.status}</td>
                    <td>
                        <button class="edit-btn" id="editCar" onclick="editCarLoad(${car.id})">Edit</button>
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
        document.getElementById('showAllCarsFiltered').innerHTML = output;
    })
    .catch(error => {
        console.error('Error filtering cars:', error);
        document.getElementById('showAllCarsFiltered').innerHTML = '<p>Error loading filtered cars.</p>';
    });
}

document.getElementById('hideFilterResult').addEventListener('click', hideFiltersCars);
function hideFiltersCars(event) {

    // This function hides the table of filtered cars by setting its inner HTML to an empty string.
    event.preventDefault();
    document.querySelector('form').reset();
    document.getElementById('showAllCarsFiltered').innerHTML = '';
}

const search = document.querySelector('#searchCar');
const carTableBody = document.querySelector('#showAllCars');
search.addEventListener('input', () => {

    // This function filters the car table based on the search input.
    // It listens for input events on the search field and hides rows that do not match the search criteria.
    const searchValue = search.value.toLowerCase();
    const rows = carTableBody.querySelectorAll('tr');    

    rows.forEach(car => {
        const brandRow = car.querySelector('td:nth-child(1)');
        const modelRow = car.querySelector('td:nth-child(2)');

        // This line below is useful for ensuring that the search functionality does not break.
        if (brandRow && modelRow) {
            const carBrand = brandRow.textContent.toLowerCase();
            const carModel = modelRow.textContent.toLowerCase();
            if (!carBrand.includes(searchValue) && !carModel.includes(searchValue)) {
                car.style.display = 'none';
            } else {
                car.style.display = '';
            }
        }
    });
});

showAllCars();