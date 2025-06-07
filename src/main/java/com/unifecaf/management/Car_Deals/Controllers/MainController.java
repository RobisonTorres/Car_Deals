package com.unifecaf.management.Car_Deals.Controllers;

import com.unifecaf.management.Car_Deals.Dtos.BCWrapperDto;
import com.unifecaf.management.Car_Deals.Dtos.BrandDto;
import com.unifecaf.management.Car_Deals.Dtos.PhotoDto;
import com.unifecaf.management.Car_Deals.Dtos.CarDto;
import com.unifecaf.management.Car_Deals.Models.Brand;
import com.unifecaf.management.Car_Deals.Models.Car;
import com.unifecaf.management.Car_Deals.Models.Photo;
import com.unifecaf.management.Car_Deals.Services.ServicesCarDeals;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@RestController
@RequestMapping("/cars")
@CrossOrigin(origins = "*")  // Configure CORS to allow requests.
// MainController.java - Controller for Car Deals Management.
// This controller handles HTTP requests related to car deals, including CRUD operations for cars and brands.
public class MainController {

    private final ServicesCarDeals servicesCarDeals;
    private final ModelMapper modelMapper;
    public MainController(ServicesCarDeals servicesCarDeals, ModelMapper modelMapper) {

        this.servicesCarDeals = servicesCarDeals;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/all_cars")
    public List<Car> allCars() {
        // Fetches all cars from the service layer.
        return servicesCarDeals.getAllCars();
    }

    @GetMapping("/get_car/{id}")
    public Car getById(@PathVariable Integer id) {
        // Retrieves a car by its ID. If the car is not found, it throws a 404 Not Found exception.
        Car car = servicesCarDeals.getCarById(id);
        if (car == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return car;
    }

    @PostMapping("/create_car")
    public ResponseEntity<Car> createCar(@Valid @RequestBody BCWrapperDto bcWrapperDto) {
        // Creates a new car and its associated brand. If the brand does not exist, it saves it.
        CarDto carDto = bcWrapperDto.getCarDto();
        Car car = modelMapper.map(carDto, Car.class);

        BrandDto brandDto = bcWrapperDto.getBrandDto();
        Brand brand = modelMapper.map(brandDto, Brand.class);
        
        // Check if the brand already exists in the database.
        // If it does, associate the existing brand with the car; otherwise, save the new brand.
        Brand checkBrand = servicesCarDeals.checkExistingBrand(brand.getName());
        car.setBrand(checkBrand == null ? brand : checkBrand);
        if (checkBrand == null) servicesCarDeals.saveBrand(brand);

        servicesCarDeals.saveCar(car);

        // Save the photos associated with the car.
        // Each photo is mapped from the DTO to the Photo entity and associated with the car.
        List<PhotoDto> photos = bcWrapperDto.getPhotoDtos();
        for (PhotoDto p: photos) {
            Photo photo = modelMapper.map(p, Photo.class);
            photo.setCar(car);
            servicesCarDeals.savePhoto(photo);
        }

        return ResponseEntity.ok().build();
    }

    @PutMapping("/update_car/{id}")
    public ResponseEntity<Void> updateCar(@Valid @RequestBody BCWrapperDto bcWrapperDto, @PathVariable Integer id){
        // Updates an existing car and its associated brand. If the brand does not exist, it saves it.
        Car car = servicesCarDeals.getCarById(id);
        CarDto carDto = bcWrapperDto.getCarDto();
        modelMapper.map(carDto, car);

        BrandDto brandDto = bcWrapperDto.getBrandDto();
        Brand brand = modelMapper.map(brandDto, Brand.class);
        Brand checkBrand = servicesCarDeals.checkExistingBrand(brand.getName());

        car.setBrand(checkBrand == null ? brand : checkBrand);
        if (checkBrand == null) servicesCarDeals.saveBrand(brand);

        servicesCarDeals.saveCar(car);

        // Update the photos associated with the car.
        // Each photo is mapped from the DTO to the Photo entity and associated with the car.
        // Existing photos are updated, and new photos are saved.
        List<PhotoDto> photos = bcWrapperDto.getPhotoDtos();
        for (PhotoDto p: photos) {
            Photo photo = servicesCarDeals.getPhotoById(p.getId());
            modelMapper.map(p, photo);
            photo.setCar(car);
            servicesCarDeals.savePhoto(photo);
        }

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("delete_car/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Integer id) {
        // Deletes a car by its ID.
        servicesCarDeals.deleteCarById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/all_brands")
    public List<Brand> getAllBrand() {
        // Fetches all brands from the database.
        return servicesCarDeals.getAllBrands();
    }

    @GetMapping("/all_brands_available")
    public List<Brand> getAllBrandWithCarsAvailable() {
        // Fetches all brands from the database with cars available.
        return servicesCarDeals.getAllCarsBrands();
    }

    @GetMapping("/filter_brand/{brand}")
    public List<Car> findAllCarsByBrand(@PathVariable Brand brand) {
        // Retrieves all cars by brand.
        return servicesCarDeals.findAllByBrand(brand);
    }

    @GetMapping("/filter_model/{model}")
    public List<Car> findAllCarsByModel(@PathVariable String model) {
        // Retrieves all cars by model.
        return servicesCarDeals.findAllByModel(model);
    }

    @GetMapping("/filter_cars")
    public List<Car> filterCars(
            @RequestParam Brand brand,
            @RequestParam String model,
            @RequestParam Integer fabrication,
            @RequestParam Car.CarStatus status
    ) {
        // Filters cars based on brand, model, fabrication year, and status.
        return servicesCarDeals.filterCars(brand, model, fabrication, status);
    }
}