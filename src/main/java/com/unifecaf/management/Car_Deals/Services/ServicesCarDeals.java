package com.unifecaf.management.Car_Deals.Services;

import com.unifecaf.management.Car_Deals.Models.Brand;
import com.unifecaf.management.Car_Deals.Models.Car;
import com.unifecaf.management.Car_Deals.Models.Photo;
import com.unifecaf.management.Car_Deals.Repositories.RepositoryBrand;
import com.unifecaf.management.Car_Deals.Repositories.RepositoryCarDeals;
import com.unifecaf.management.Car_Deals.Repositories.RepositoryPhotos;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ServicesCarDeals {

    // Dependence injection for RepositoryCarDeals and RepositoryBrand.
    private final RepositoryCarDeals repositoryCarDeals;
    private final RepositoryBrand repositoryBrand;
    private final RepositoryPhotos repositoryPhotos;

    public ServicesCarDeals(RepositoryCarDeals repositoryCarDeals,
                            RepositoryBrand repositoryBrand,
                            RepositoryPhotos repositoryPhotos) {

        this.repositoryCarDeals = repositoryCarDeals;
        this.repositoryBrand = repositoryBrand;
        this.repositoryPhotos = repositoryPhotos;
    }

    public Car getCarById(Integer id) {
        // This function retrieves a Car object by ID.
        return repositoryCarDeals.findById(id).orElse(null);
    }

    public List<Car> getAllCars() {
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

    public List<Brand> getAllBrands() {
        // This function retrieves all Brands stored in the database.
        return repositoryBrand.findAll();
    }

    public List<Brand> getAllCarsBrands() {
        // This function retrieves all Brands with cars available stored in the database.
        return repositoryBrand.findBrandsWithCarsAvailable();
    }

    public Brand checkExistingBrand(String brand) {
        // This function checks if a brand exists in the database.
        // It returns the Brand object if it exists, otherwise returns null.
        return repositoryBrand.findByName(brand);
    }

    public Brand saveBrand(Brand brand) {
        // This function saves a new Brand object in the database.
        return repositoryBrand.save(brand);
    }

    public List<Car> findAllByBrand(Brand brand) {
        // This function retrieves all Cars by a specific brand.
        return repositoryCarDeals.findByBrand(brand);
    }

    public List<Car> findAllByModel(String model) {
        // This function retrieves all Cars by a specific model.
        return repositoryCarDeals.findByModel(model);
    }

    public List<Car> filterCars(Brand brand, String model, Integer fabrication, Car.CarStatus status) {
        // This function filters Cars based on brand, model, and status.
        // It returns a list of Cars that match the given criteria.
        return repositoryCarDeals.findCarsByFilters(brand, model, fabrication, status);
    }

    public Photo savePhoto(Photo photo) {
        // This function...
        return repositoryPhotos.save(photo);
    }

    public Photo getPhotoById(Integer id) {
        return repositoryPhotos.findById(id).orElse(null);
    }
}