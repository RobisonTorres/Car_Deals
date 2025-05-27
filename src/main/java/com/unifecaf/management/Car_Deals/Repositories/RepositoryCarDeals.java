package com.unifecaf.management.Car_Deals.Repositories;

import com.unifecaf.management.Car_Deals.Models.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositoryCarDeals extends JpaRepository <Car, Integer> {
}