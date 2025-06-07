package com.unifecaf.management.Car_Deals.Dtos;

// PhotoDto.java - Data Transfer Object for Photo entity.
// This class is used to transfer photo data between the client and server without exposing the entire Photo entity.
public class PhotoDto {

    Integer id;
    String photo;

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

}