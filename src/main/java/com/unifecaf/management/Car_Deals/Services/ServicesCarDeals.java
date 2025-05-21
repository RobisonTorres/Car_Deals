package com.unifecaf.management.Car_Deals.Services;

import com.unifecaf.management.Car_Deals.Models.Car;
import com.unifecaf.management.Car_Deals.Repositories.RepositoryCarDeals;
import org.springframework.stereotype.Service;

@Service
public class ServicesCarDeals {

    private final RepositoryCarDeals repositoryCarDeals;

    public ServicesCarDeals(RepositoryCarDeals repositoryCarDeals) {

        this.repositoryCarDeals = repositoryCarDeals;
    }

    public Car getCarById(Integer id) {
        // This function retrieves a Car object by ID.
        return repositoryCarDeals.findById(id).orElse(null);
    }

    public Iterable<Car> getAllCars() {
        // This function retrieves all Cars stored in the database.
        return repositoryCarDeals.findAll();
    }

    public Car saveCar(Car car) {
        // This function saves a new Car object in the database.
        return repositoryCarDeals.save(car);
    }

    public void deleteCarById(Integer id) {
        // This function deletes a Car by id.
        repositoryCarDeals.deleteById(id);
    }
}