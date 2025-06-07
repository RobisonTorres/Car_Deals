package com.unifecaf.management.Car_Deals.Models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

// Car.java - Entity class representing a car.
// This class is mapped to the "cars" table in the database and contains fields for car ID, model, fabrication year, color, mileage, plate, price, status, and associated brand.
@Entity
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String model;
    private Integer fabrication;
    private String color;
    private Integer mileage;
    private String plate;
    private Double price;
    @Enumerated(EnumType.STRING)
    private CarStatus status;

    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;

    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Photo> photos = new ArrayList<>();

    public Car() {

    }

    public Car(Integer id, String model, Integer fabrication, String color, Integer mileage, String plate, Double price, CarStatus status, Brand brand, List<Photo> photos) {
        this.id = id;
        this.model = model;
        this.fabrication = fabrication;
        this.color = color;
        this.mileage = mileage;
        this.plate = plate;
        this.price = price;
        this.status = status;
        this.brand = brand;
        this.photos = photos;
    }

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

    public CarStatus getStatus() {
        return status;
    }

    public void setStatus(CarStatus status) {
        this.status = status;
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    public List<Photo> getPhotos() {
        return photos;
    }

    public void setPhotos(List<Photo> photos) {
        this.photos = photos;
    }

    public enum CarStatus {
        NEW, SECOND_HAND
    }
}