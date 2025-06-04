package com.unifecaf.management.Car_Deals.Repositories;

import com.unifecaf.management.Car_Deals.Models.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface RepositoryBrand extends JpaRepository<Brand, Integer> {

    // Method to find a brand by its name.
    // This method is used to check if a brand already exists in the database.
    Brand findByName(String name);

    // This Query extracts only Brands from the database with cars available.
    // Thus, the filter will show only relevant Brands to the user.
    @Query("SELECT b FROM Brand b WHERE SIZE(b.cars) > 0 ")
    List<Brand> findBrandsWithCarsAvailable();
}