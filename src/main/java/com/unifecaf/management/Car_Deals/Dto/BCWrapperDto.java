package com.unifecaf.management.Car_Deals.Dto;

public class BCWrapperDto {

    private BrandDto brandDto;
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