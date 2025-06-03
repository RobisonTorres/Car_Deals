document.getElementById('addNewCar').addEventListener('click', displayForm);
function displayForm() {

    // This function is called when the "Add New Car" button is clicked. It displays the form
    // for adding a new car by changing the display style of the form element.
    closeFormUpdate(event);
    const input = document.getElementById('brand');
    if (input.options.length <= 1) {
        brandSelect(input, 'all_brands');
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
        image: document.getElementById('image').value,
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

    // This function fetches all cars from the server and displays them in a table format.
    // It constructs the table rows dynamically based on the data received from the server.
    fetch('http://localhost:8080/cars/all_cars', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        let output = ``;
        data.forEach(car => {
            output += `
            <div id="cards" class="col-md-4 mb-4">
                <div class="card h-100 border-0 shadow-lg rounded-3 overflow-hidden">
                    <div class="position-relative">
                        <img src="${car.image}"
                            class="card-img-top img-fluid object-fit-cover"
                            alt="Car image"
                            style="height: 200px;"
                            onerror="this.onerror=null; this.src='imgs/car_deals.png';">
                        <span class="badge bg-danger position-absolute top-0 start-0 m-2 rounded-pill px-3 py-2 fs-6">
                            $${car.price}
                        </span>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-dark mb-1">
                            ${car.model}
                        </h5>
                        <p class="card-subtitle text-muted small mb-3">
                            ${car.brand.name} • ${car.color}
                        </p>
                        <ul class="list-group list-group-flush border-top border-bottom my-2">
                            <li class="list-group-item d-flex justify-content-between align-items-center py-2 px-0">
                                <span class="text-secondary"><i class="bi bi-speedometer2 me-2"></i>Mileage:</span>
                                <span class="fw-bold">${car.mileage} km</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center py-2 px-0">
                                <span class="text-secondary"><i class="bi bi-tag me-2"></i>Plate:</span>
                                <span class="fw-bold">${car.plate}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center py-2 px-0">
                                <span class="text-secondary"><i class="bi bi-calendar me-2"></i>Year:</span>
                                <span class="fw-bold">${car.fabrication ?? 'N/A'}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center py-2 px-0">
                                <span class="text-secondary"><i class="bi bi-info-circle me-2"></i>Status:</span>
                                <span class="fw-bold text-success">${car.status}</span>
                            </li>
                        </ul>
                        <div class="d-flex justify-content-center gap-2 mt-auto pt-3">
                            <button class="btn btn-outline-primary flex-grow-1" onclick="editCarLoad(${car.id})">
                                <i class="bi bi-pencil me-1"></i> Edit
                            </button>
                            <button class="btn btn-outline-danger flex-grow-1" onclick="deleteCar(${car.id})">
                                <i class="bi bi-trash me-1"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            `;});
        document.getElementById('showAllCars').innerHTML = output;
    })
    .catch(error => {
        console.error('Error fetching cars:', error);
        document.getElementById('showAllCars').innerHTML = '<div>Error loading cars.</div>';
    });
}

function hideAllCars() {

    // This function hides the table of cars by setting its inner HTML to an empty string.
    document.getElementById('showAllCars').innerHTML = '';
}

async function editCarLoad(carId) {

    // This function is called when the "Edit" button is clicked. It fetches the car data
    // from the server and populates the form fields with the car's current data.
    // It also displays the form for editing the car.
    displayFormUpdate();
    const input = document.getElementById('brand_update');
    if (input.options.length <= 1) {
        // It ensures that the brand selection input is populated with available brands.
        await brandSelect(input, 'all_brands');
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
        document.getElementById('image_update').value = car.image;
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
        image: document.getElementById('image_update').value,
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

function brandSelect(brandInput, filter_brand) {

    // This function fetches all car brands from the server and populates the brand selection input
    // with the available brands. It also adds an "Other" option to allow users to enter a new brand.
    // It returns a promise that resolves when the brands are successfully fetched and added to the input.
    return fetch(`http://localhost:8080/cars/${filter_brand}`, {
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
        if (filter_brand != 'all_brands_available') {
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

document.getElementById('filter_model').addEventListener('change', yearStatusSelect);
function yearStatusSelect() {

    // This function is called when the model selection input changes. It fetches the years and statuses
    // associated with the selected model and populates the year and status selection input.
    const select_year = document.getElementById('filter_year');
    const select_status = document.getElementById('filter_status');    
    select_year.innerHTML = `<option value="" disabled selected hidden>Year</option>`;
    select_status.innerHTML = `<option value="" disabled selected hidden>Status</option>`;
    const model = document.getElementById('filter_model').value;
    fetch(`http://localhost:8080/cars/filter_model/${model}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        const models = new Set();
        const status = new Set();
        data.forEach(car => {
            if (!models.has(car.fabrication)) {
                models.add(car.fabrication);
                const option = document.createElement('option');
                option.value = car.fabrication;
                option.text = car.fabrication;
                select_year.appendChild(option);
            }
            if (!status.has(car.status)) {
                status.add(car.status);
                const option = document.createElement('option');
                option.value = car.status;
                option.text = car.status;
                select_status.appendChild(option);
            }
        });
    });
}

function filterCars(event) {
    
    // This function is called when the filter form is submitted. It collects the filter criteria
    // from the form fields, constructs a query string, and sends a GET request to the server.
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
        let output = ``;
        data.forEach(car => {
                    output += `
            <div id="cards" class="col-md-4 mb-4">
                <div class="card h-100 border-0 shadow-lg rounded-3 overflow-hidden">
                    <div class="position-relative">
                        <img src="${car.image}"
                            class="card-img-top img-fluid object-fit-cover"
                            alt="Car image"
                            style="height: 200px;"
                            onerror="this.onerror=null; this.src='imgs/car_deals.png';">
                        <span class="badge bg-danger position-absolute top-0 start-0 m-2 rounded-pill px-3 py-2 fs-6">
                            $${car.price}
                        </span>
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-dark mb-1">
                            ${car.model}
                        </h5>
                        <p class="card-subtitle text-muted small mb-3">
                            ${car.brand.name} • ${car.color}
                        </p>
                        <ul class="list-group list-group-flush border-top border-bottom my-2">
                            <li class="list-group-item d-flex justify-content-between align-items-center py-2 px-0">
                                <span class="text-secondary"><i class="bi bi-speedometer2 me-2"></i>Mileage:</span>
                                <span class="fw-bold">${car.mileage} km</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center py-2 px-0">
                                <span class="text-secondary"><i class="bi bi-tag me-2"></i>Plate:</span>
                                <span class="fw-bold">${car.plate}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center py-2 px-0">
                                <span class="text-secondary"><i class="bi bi-calendar me-2"></i>Year:</span>
                                <span class="fw-bold">${car.fabrication ?? 'N/A'}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center py-2 px-0">
                                <span class="text-secondary"><i class="bi bi-info-circle me-2"></i>Status:</span>
                                <span class="fw-bold text-success">${car.status}</span>
                            </li>
                        </ul>
                        <div class="d-flex justify-content-center gap-2 mt-auto pt-3">
                            <button class="btn btn-outline-primary flex-grow-1" onclick="editCarLoad(${car.id})">
                                <i class="bi bi-pencil me-1"></i> Edit
                            </button>
                            <button class="btn btn-outline-danger flex-grow-1" onclick="deleteCar(${car.id})">
                                <i class="bi bi-trash me-1"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            `;});
        document.getElementById('showAllCarsFiltered').innerHTML = output;
    })
    .catch(error => {
        console.error('Error filtering cars:', error);
        document.getElementById('showAllCarsFiltered').innerHTML = '<div>Error loading filtered cars.</div>';
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
const allCars = document.querySelector('#showAllCars');
search.addEventListener('input', () => {

    // This function filters the car table based on the search input.
    // It listens for input events on the search field and hides rows that do not match the search criteria.
    const searchValue = search.value.toLowerCase();
    const cars = allCars.querySelectorAll('div#cards');    
    cars.forEach(car => {
        const brandRow = car.querySelector('h5');
        const modelRow = car.querySelector('p');
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