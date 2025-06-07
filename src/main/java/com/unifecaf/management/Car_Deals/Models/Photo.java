package com.unifecaf.management.Car_Deals.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "photos")
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    String photo;

    @ManyToOne
    @JoinColumn(name = "car_id", nullable = false)
    @JsonBackReference
    private Car car;

    public Photo() {

    }

    public Photo(Integer id, String photo, Car car) {
        this.id = id;
        this.photo = photo;
        this.car = car;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

}