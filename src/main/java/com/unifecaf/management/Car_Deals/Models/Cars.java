package com.unifecaf.management.Car_Deals.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cars")
public class Cars {

    @Id
    Integer id;
    String model;
    String brand;

    public Cars() {}

    public Cars(Integer id, String model, String brand) {
        this.id = id;
        this.model = model;
        this.brand = brand;
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
}