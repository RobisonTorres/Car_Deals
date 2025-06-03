package com.unifecaf.management.Car_Deals;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CarDealsApplication {

	public static void main(String[] args) {

		SpringApplication.run(CarDealsApplication.class, args);
	}

	@Bean
	CommandLineRunner initialization () {
		return args -> {

			System.out.println();
			System.out.println("Access the app here: http://localhost:8080/cars.html");
		};
	}
}