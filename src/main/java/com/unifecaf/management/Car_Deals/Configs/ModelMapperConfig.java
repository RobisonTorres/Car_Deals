package com.unifecaf.management.Car_Deals.Configs;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// ModelMapperConfig.java - Dto Mapper Configuration.
// This configuration class sets up a ModelMapper bean for object mapping (source, target) in the application.
@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}