package com.unifecaf.management.Car_Deals.Repositories;

import com.unifecaf.management.Car_Deals.Models.Brand;
import com.unifecaf.management.Car_Deals.Models.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RepositoryCarDeals extends JpaRepository <Car, Integer> {

    Iterable<Car> findByBrand(Brand brand);
    Iterable<Car> findByModel(String model);

    @Query("SELECT c FROM Car c WHERE " +
            "(:brand IS NULL OR c.brand = :brand) AND " +
            "(:model IS NULL OR c.model = :model) AND " +
            "(:status IS NULL OR c.status = :status)")
    List<Car> findCarsByFilters(
            @Param("brand") Brand brand,
            @Param("model") String model,
            @Param("status") Car.CarStatus status
    );
}