# Car Deals Manager

## 🚗 Overview

Car Deals Manager is a RestFul API application developed using **Java**, **Spring Boot**, and **Spring Data JDBC**. It enables efficient management of cars and their brands, allowing operations like listing, filtering, searching, creating, updating, and deleting entries. The system is designed for car dealership administrators who need to manage vehicle information effectively.

## ✨ Features
- 🚘 List all available cars.
- ➕ Add a new car.
- 📝 Update car and brand data.
- ❌ Delete cars from the database.
- 🏷️ List all registered car brands.
- 🔍 Search and filter cars by its information.

## 🛠️ Tech Stack & Prerequisites

### Prerequisites
- **Java 17 or higher**
- **Maven** (to build and run the project)

### Tech Stack

- **Spring Boot** – for building the backend
- **Spring Data JDBC** – for interacting with the database
- **H2 Database** – in-memory testing database (can be replaced with a persistent one)
- **ModelMapper** – for mapping DTOs to entities

## 🚀 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Car_Deals_Manager.git
   cd Car_Deals_Manager
   ```

2. **Build the project**
   ```bash
   mvn clean install
   ```

3. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

4. **Access the app web**
   ```
   http://localhost:8080/cars.html
   ```

## 📚 Controller - Some Endpoints

```
| HTTP Method | Endpoint                       | Description                                             |
|-------------|--------------------------------|---------------------------------------------------------|
| GET         | `/cars/all_cars`               | List all cars                                           |
| GET         | `/cars/get_car/{id}`           | Retrieve a specific car by ID                           |
| POST        | `/cars/create_car`             | Create a new car with associated brand info             |
| PUT         | `/cars/update_car/{id}`        | Update a car and its brand by ID                        |
| DELETE      | `/cars/delete_car/{id}`        | Delete a car by ID                                      |
(...)
```