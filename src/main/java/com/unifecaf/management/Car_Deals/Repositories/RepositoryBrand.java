package com.unifecaf.management.Car_Deals.Repositories;

import com.unifecaf.management.Car_Deals.Models.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RepositoryBrand extends JpaRepository<Brand, Integer> {

    // Method to find a brand by its name
    // Returns an Optional<Brand> to handle cases where the brand may not exist.
    Optional<Brand> findByName(String name);
}