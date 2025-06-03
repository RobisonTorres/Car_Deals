package com.unifecaf.management.Car_Deals.Dtos;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
// CarDto.java - Data Transfer Object for Car.
// This class represents the data structure for a car, including validation constraints.
public class CarDto {

    @Valid

    private String image;

    @NotEmpty(message = "model is mandatory")
    @NotBlank(message = "model is mandatory")
    private String model;

    @NotNull(message = "fabrication year is mandatory")
    private Integer fabrication;

    @NotEmpty(message = "color is mandatory")
    @NotBlank(message = "color is mandatory")
    private String color;

    @NotNull(message = "mileage is mandatory")
    private Integer mileage;

    @NotEmpty(message = "plate is mandatory")
    @NotBlank(message = "plate is mandatory")
    private String plate;

    @NotNull(message = "price is mandatory")
    private Double price;

    @NotEmpty(message = "status is mandatory")
    @NotBlank(message = "status is mandatory")
    private String status;

    private Integer brand_id;

    public @Valid String getImage() {
        return image;
    }

    public void setImage(@Valid String image) {
        this.image = image;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Integer getFabrication() {
        return fabrication;
    }

    public void setFabrication(Integer fabrication) {
        this.fabrication = fabrication;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Integer getMileage() {
        return mileage;
    }

    public void setMileage(Integer mileage) {
        this.mileage = mileage;
    }

    public String getPlate() {
        return plate;
    }

    public void setPlate(String plate) {
        this.plate = plate;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getBrand_id() {
        return brand_id;
    }

    public void setBrand_id(Integer brand_id) {
        this.brand_id = brand_id;
    }

}