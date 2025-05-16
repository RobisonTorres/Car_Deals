CREATE TABLE IF NOT EXISTS cars (
    id INT PRIMARY KEY AUTO_INCREMENT,
    model VARCHAR(150) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    fabrication_date INT,
    color VARCHAR(50),
    mileage INT,
    photo LONGBLOB,
    status VARCHAR(50),
    plate VARCHAR(20) UNIQUE
);

--INSERT INTO cars (model, brand, fabrication_date, color, mileage, photo, status, plate)
--VALUES ('Corolla', 'Toyota', 2020, 'Preto', 45000, NULL, 'AVAILABLE', 'ABC1D23'),
--('Civic', 'Honda', 2019, 'Prata', 52000, NULL, 'SOLD', 'XYZ4F56'),
--('Onix', 'Chevrolet', 2021, 'Branco', 30000, NULL, 'UNDER_MAINTENANCE', 'JKL8H91'),
--('HB20', 'Hyundai', 2022, 'Azul', 15000, NULL, 'AVAILABLE', 'DEF2G78'),
--('Gol', 'Volkswagen', 2018, 'Vermelho', 60000, NULL, 'SOLD', 'GHI3E45');