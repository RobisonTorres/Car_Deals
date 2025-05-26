package com.unifecaf.management.Car_Deals.Controllers;

import com.unifecaf.management.Car_Deals.Models.Brand;
import com.unifecaf.management.Car_Deals.Models.BrandCarWrapper;
import com.unifecaf.management.Car_Deals.Models.Car;
import com.unifecaf.management.Car_Deals.Dto.CarDto;
import com.unifecaf.management.Car_Deals.Services.ServicesCarDeals;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/cars")
@CrossOrigin(origins = "*")
public class MainController {

    private final ServicesCarDeals servicesCarDeals;
    private final ModelMapper modelMapper;
    public MainController(ServicesCarDeals servicesCarDeals, ModelMapper modelMapper) {

        this.servicesCarDeals = servicesCarDeals;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/all_cars")
    public Iterable<Car> allCars() {
        return servicesCarDeals.getAllCars();
    }

    @GetMapping("/get_car/{id}")
    public Car getById(@PathVariable Integer id) {
        Car car = servicesCarDeals.getCarById(id);
        if (car == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return car;
        }

    @PostMapping("/create_car")
    public ResponseEntity<Car> createCar(@RequestBody BrandCarWrapper brandCarWrapper) {

        Brand brand = brandCarWrapper.getBrand();
        String brand_name = brand.getName();
        Brand newBrand = new Brand();
        newBrand.setName(brand_name);

        Car car = brandCarWrapper.getCar();

        if (!servicesCarDeals.checkExistingBrand(brand_name)){
            servicesCarDeals.saveBrand(newBrand);
            car.setBrand(newBrand);
        }

        servicesCarDeals.saveCar(car);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update_car/{id}")
    public ResponseEntity<Void> updateCar(@RequestBody CarDto carInfo, @PathVariable Integer id){

        Car car = servicesCarDeals.getCarById(id);
        modelMapper.map(carInfo, car);
        servicesCarDeals.saveCar(car);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("delete_car/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Integer id) {
        servicesCarDeals.deleteCarById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("all_brands")
    public Iterable<Brand> getAllBrands() {
        return servicesCarDeals.getAllCarsBrands();
    }
}