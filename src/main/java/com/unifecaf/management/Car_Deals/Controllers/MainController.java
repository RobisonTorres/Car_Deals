package com.unifecaf.management.Car_Deals.Controllers;

import com.unifecaf.management.Car_Deals.Dto.BCWrapperDto;
import com.unifecaf.management.Car_Deals.Dto.BrandDto;
import com.unifecaf.management.Car_Deals.Models.Brand;
import com.unifecaf.management.Car_Deals.Models.Car;
import com.unifecaf.management.Car_Deals.Dto.CarDto;
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
public class MainController {

    private final ServicesCarDeals servicesCarDeals;
    private final ModelMapper modelMapper;
    public MainController(ServicesCarDeals servicesCarDeals, ModelMapper modelMapper) {

        this.servicesCarDeals = servicesCarDeals;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/all_cars")
    public List<Car> allCars() {
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
    public ResponseEntity<Car> createCar(@Valid @RequestBody BCWrapperDto bcWrapperDto) {

        Car car = new Car();
        CarDto carDto = bcWrapperDto.getCarDto();
        modelMapper.map(carDto, car);

        Brand brand = new Brand();
        BrandDto brandDto = bcWrapperDto.getBrandDto();
        modelMapper.map(brandDto, brand);

        if (!servicesCarDeals.checkExistingBrand(brand.getName())){
            servicesCarDeals.saveBrand(brand);
        }

        car.setBrand(brand);
        servicesCarDeals.saveCar(car);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update_car/{id}")
    public ResponseEntity<Void> updateCar(@Valid @RequestBody BCWrapperDto bcWrapperDto, @PathVariable Integer id){

        Car car = servicesCarDeals.getCarById(id);
        CarDto carDto = bcWrapperDto.getCarDto();
        modelMapper.map(carDto, car);

        Brand brand = new Brand();
        BrandDto brandDto = bcWrapperDto.getBrandDto();
        modelMapper.map(brandDto, brand);

        if (!servicesCarDeals.checkExistingBrand(brand.getName())){
            servicesCarDeals.saveBrand(brand);
        }

        car.setBrand(brand);
        servicesCarDeals.saveCar(car);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("delete_car/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Integer id) {
        servicesCarDeals.deleteCarById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/all_brands")
    public List<Brand> getAllBrands() {
        return servicesCarDeals.getAllCarsBrands();
    }

    @GetMapping("/filter_brand/{brand}")
    public List<Car> findAllCarsByBrand(@PathVariable Brand brand) {
        return servicesCarDeals.findAllByBrand(brand);
    }

    @GetMapping("/filter_model/{model}")
    public List<Car> findAllCarsByModel(@PathVariable String model) {
        return servicesCarDeals.findAllByModel(model);
    }

    @GetMapping("/filter_cars")
    public List<Car> filterCars(
            @RequestParam Brand brand,
            @RequestParam String model,
            @RequestParam Integer fabrication,
            @RequestParam Car.CarStatus status
    ) {
        return servicesCarDeals.filterCars(brand, model, fabrication, status);
    }

}