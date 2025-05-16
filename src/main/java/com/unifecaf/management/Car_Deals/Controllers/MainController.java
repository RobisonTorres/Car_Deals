package com.unifecaf.management.Car_Deals.Controllers;

import com.unifecaf.management.Car_Deals.Models.Car;
import com.unifecaf.management.Car_Deals.Services.ServicesCarDeals;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/cars")
@CrossOrigin(origins = "*")
public class MainController {

    private final ServicesCarDeals servicesCarDeals;

    public MainController(ServicesCarDeals servicesCarDeals) {

        this.servicesCarDeals = servicesCarDeals;
    }

    @GetMapping("/all_cars")
    public Iterable<Car> allCars() {
        return servicesCarDeals.getAllCars();
    }

    @GetMapping("/car/{id}")
    public Car getById(@PathVariable Integer id) {
        Car car = servicesCarDeals.getCarById(id);
        if (car == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return car;
        }

    @PostMapping("/create_car")
    public Car createCar(@RequestBody Car car) throws Exception {
        return servicesCarDeals.saveNewCar(car, null);
    }

    @DeleteMapping("delete_car/{id}")
    public void deleteCar(@PathVariable Integer id) {
        servicesCarDeals.deleteCarById(id);
    }

}