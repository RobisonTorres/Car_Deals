package com.unifecaf.management.Car_Deals.Controllers;

import com.unifecaf.management.Car_Deals.Models.Cars;
import com.unifecaf.management.Car_Deals.Repositories.RepositoryCarDeals;
import com.unifecaf.management.Car_Deals.Services.ServicesCarDeals;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    private final ServicesCarDeals servicesCarDeals;

    public MainController(ServicesCarDeals servicesCarDeals) {
        this.servicesCarDeals = servicesCarDeals;
    }

    @GetMapping("/")
    public String mainRoute() {

        return "Hello World";
    }

    @GetMapping("/allCars")
    public Iterable<Cars> allCars() {

        return servicesCarDeals.getAllCars();
    }
}