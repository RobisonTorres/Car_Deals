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