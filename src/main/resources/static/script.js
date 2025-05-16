function createCar(event) {
    event.preventDefault();

    const car = {
        model: document.getElementById('model').value,
        brand: document.getElementById('brand').value,
        fabricationDate: parseInt(document.getElementById('fabrication-date').value, 10),
        color: document.getElementById('color').value,
        mileage: parseInt(document.getElementById('mileage').value, 10),
        plate: document.getElementById('plate').value,
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