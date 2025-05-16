package com.unifecaf.management.Car_Deals.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String model;
    private String brand;
    private Integer fabrication_date;
    private String color;
    private Integer mileage;
    private String plate;
    private byte[] photo;

    @Enumerated(EnumType.STRING)
    private CarStatus status;

    public Car() {

    }

    public Car(Integer id, String model, String brand, Integer fabrication_date, String color, Integer mileage, String plate, byte[] photo, CarStatus status) {
        this.id = id;
        this.model = model;
        this.brand = brand;
        this.fabrication_date = fabrication_date;
        this.color = color;
        this.mileage = mileage;
        this.plate = plate;
        this.photo = photo;
        this.status = status;
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

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Integer getFabrication_date() {
        return fabrication_date;
    }

    public void setFabrication_date(Integer fabrication_date) {
        this.fabrication_date = fabrication_date;
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

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public CarStatus getStatus() {
        return status;
    }

    public void setStatus(CarStatus status) {
        this.status = status;
    }

    public enum CarStatus {
        AVAILABLE, SOLD, UNDER_MAINTENANCE
    }
}