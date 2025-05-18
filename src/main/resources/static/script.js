function createCar(event) {
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
    fetch('http://localhost:8080/cars/all_cars', 
        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
        ).then(response => response.json())
        .then(data => {
            data.forEach(car => {
                const row = `<tr>
                            <td>${car.model}</td>
                            <td>${car.brand}</td>
                            <td>${car.fabrication ?? 'N/A'}</td>
                            <td>${car.color}</td>
                            <td>${car.mileage} km</td>
                            <td>${car.plate}</td>
                            <td>$${car.price}</td>
                            <td>${car.status}</td>
                            <button class="edit-btn" onclick="editCar(event)">Edit</button>
                            </tr>`;

                document.getElementById('carList').insertAdjacentHTML('beforeend', row);
            })
        }).catch(error => {
            console.error('Error:', error);
        });
}

function editCar(event) {
      location.replace("http://localhost:8080/editCarForm.html");
}

showAllCars();