-- This SQL script creates the necessary tables for the car dealership application.

CREATE TABLE IF NOT EXISTS brands (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS cars (
    id INT PRIMARY KEY AUTO_INCREMENT,
    model VARCHAR(150) NOT NULL,
    fabrication INT,
    color VARCHAR(50),
    mileage INT,
    plate VARCHAR(20) UNIQUE,
    price DECIMAL(10,2),
    status VARCHAR(20),
    brand_id INT NOT NULL,
    FOREIGN KEY (brand_id) REFERENCES brands(id)
);

CREATE TABLE IF NOT EXISTS photos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    photo VARCHAR(2083),
    car_id INT NOT NULL,
    FOREIGN KEY (car_id) REFERENCES cars(id)
);
/*
-- Insert initial brand data
INSERT INTO brands (name) VALUES
('Toyota'),
('Honda'),
('Ford'),
('Chevrolet'),
('Volkswagen');

-- Insert initial car data
INSERT INTO cars (image, model, fabrication, color, mileage, plate, price, status, brand_id) VALUES
('imgs/toyota_corolla.jpg', 'Corolla', 2019, 'White', 30000, 'ABC1234', 85000.00, 'SECOND_HAND', 1),
('imgs/honda_civic.jpg', 'Civic', 2020, 'Black', 25000, 'XYZ5678', 92000.00, 'SECOND_HAND', 2),
('imgs/ford_focus.jpg', 'Focus', 2018, 'Blue', 40000, 'DEF9876', 78000.00, 'SECOND_HAND', 3),
('imgs/chevrolet_cruze.jpg', 'Cruze', 2021, 'Red', 15000, 'GHI3456', 99000.00, 'NEW', 4),
('imgs/vw_golf.jpg', 'Golf', 2023, 'Silver', 5000, 'JKL1122', 125000.00, 'NEW', 5);
*/