package com.unifecaf.management.Car_Deals.Dtos;

import jakarta.validation.constraints.*;

// BrandDto.java - Data Transfer Object for Brand.
// This class represents the data structure for a car brand, including validation constraints.
public class BrandDto {

    private Integer id;

    @NotEmpty(message = "name is mandatory")
    @NotBlank(message = "name is mandatory")
    private String name;

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
}