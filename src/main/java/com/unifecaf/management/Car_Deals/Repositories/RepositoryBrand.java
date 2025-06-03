package com.unifecaf.management.Car_Deals.Repositories;

import com.unifecaf.management.Car_Deals.Models.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RepositoryBrand extends JpaRepository<Brand, Integer> {

    // Method to find a brand by its name
    // Returns an Optional<Brand> to handle cases where the brand may not exist.
    Optional<Brand> findByName(String name);

    // This Query extracts only Brands from the database with cars available.
    // Thus, the filter will show only relevant Brands to the user.
    @Query("SELECT b FROM Brand b WHERE SIZE(b.cars) > 0 ")
    List<Brand> findBrandsWithCarsAvailable();
}