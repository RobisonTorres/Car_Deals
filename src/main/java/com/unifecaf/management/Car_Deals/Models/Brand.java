package com.unifecaf.management.Car_Deals.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

// Brand.java - Entity class representing a car brand.
// This class is mapped to the "brands" table in the database and contains fields for brand ID, name, and a list of associated cars.
@Entity
@Table(name = "brands")
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;

    @OneToMany(mappedBy = "brand")
    @JsonIgnore
    private List<Car> cars = new ArrayList<>();

    public Brand () {

    }

    public Brand(Integer id, String name, List<Car> cars) {
        this.id = id;
        this.name = name;
        this.cars = cars;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Car> getCars() {
        return cars;
    }

    public void setCars(List<Car> cars) {
        this.cars = cars;
    }
}