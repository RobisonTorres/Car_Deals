package com.unifecaf.management.Car_Deals.Repositories;

import com.unifecaf.management.Car_Deals.Models.Photo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositoryPhotos extends JpaRepository <Photo, Integer> {
}
