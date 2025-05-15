package com.unifecaf.management.Car_Deals.Services;

import com.unifecaf.management.Car_Deals.Models.Cars;
import com.unifecaf.management.Car_Deals.Repositories.RepositoryCarDeals;
import org.springframework.stereotype.Service;

@Service
public class ServicesCarDeals {

    private final RepositoryCarDeals repositoryCarDeals;

    public ServicesCarDeals(RepositoryCarDeals repositoryCarDeals) {
        this.repositoryCarDeals = repositoryCarDeals;
    }

    public Iterable<Cars> getAllCars() {

        return repositoryCarDeals.findAll();
    }
}