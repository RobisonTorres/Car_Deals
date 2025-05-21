package com.unifecaf.management.Car_Deals.Dto;

import com.unifecaf.management.Car_Deals.Models.Car;
import jakarta.persistence.*;

public class CarDto {

    @Id
    private Integer id;
    private String model;
    private String brand;
    private Integer fabrication;
    private String color;
    private Integer mileage;
    private String plate;
    private Double price;

    @Enumerated(EnumType.STRING)
    private Car.CarStatus status;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
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

    public Car.CarStatus getStatus() {
        return status;
    }

    public void setStatus(Car.CarStatus status) {
        this.status = status;
    }
}