-- This SQL script creates the necessary tables for the car dealership application.

CREATE TABLE IF NOT EXISTS brands (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    UNIQUE (name)
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

INSERT INTO brands (name) VALUES
('Toyota'),('Honda'),('Ford'),('Chevrolet'),('Volkswagen');

INSERT INTO cars (model, fabrication, color, mileage, plate, price, status, brand_id) VALUES
('Corolla', 2019, 'White', 30000, 'ABC1234', 85000.00, 'SECOND_HAND', 1),
('Civic', 2020, 'Black', 25000, 'XYZ5678', 92000.00, 'SECOND_HAND', 2),
('Focus', 2018, 'Blue', 40000, 'DEF9876', 78000.00, 'SECOND_HAND', 3),
('Cruze', 2021, 'Red', 15000, 'GHI3456', 99000.00, 'NEW', 4),
('Golf', 2023, 'Silver', 5000, 'JKL1122', 125000.00, 'NEW', 5);