CREATE TABLE IF NOT EXISTS cars (
    id INT PRIMARY KEY AUTO_INCREMENT,
    model VARCHAR(150) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    fabrication INT,
    color VARCHAR(50),
    mileage INT,
    plate VARCHAR(20) UNIQUE,
    price DOUBLE,
    status VARCHAR(50)
);

--INSERT INTO cars (model, brand, fabrication, color, mileage, status, plate, price)
--VALUES ('Corolla', 'Toyota', 2020, 'Preto', 45000, 'AVAILABLE', 'ABC1D23', 85000.00),
--('Civic', 'Honda', 2019, 'Prata', 52000, 'SOLD', 'XYZ4F56', 79000.00),
--('Onix', 'Chevrolet', 2021, 'Branco', 30000, 'UNDER_MAINTENANCE', 'JKL8H91', 68000.00),
--('HB20', 'Hyundai', 2022, 'Azul', 15000, 'AVAILABLE', 'DEF2G78', 72000.00),
--('Gol', 'Volkswagen', 2018, 'Vermelho', 60000, 'SOLD', 'GHI3E45', 50000.00);