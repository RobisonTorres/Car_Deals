package com.unifecaf.management.Car_Deals.Dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

// BCWrapperDto.java - Wrapper DTO for Brand and Car.
// This class serves as a container for BrandDto and CarDto, ensuring that both are provided and valid.''
public class BCWrapperDto {

    @Valid
    @NotNull(message = "brandDto is required")
    private BrandDto brandDto;

    @Valid
    @NotNull(message = "carDto is required")
    private CarDto carDto;

    public BrandDto getBrandDto() {
        return brandDto;
    }

    public void setBrandDto(BrandDto brandDto) {
        this.brandDto = brandDto;
    }

    public CarDto getCarDto() {
        return carDto;
    }

    public void setCarDto(CarDto carDto) {
        this.carDto = carDto;
    }

}