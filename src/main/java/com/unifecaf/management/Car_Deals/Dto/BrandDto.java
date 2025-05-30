package com.unifecaf.management.Car_Deals.Dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

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