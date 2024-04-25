package org.ap.automotiveportalbackend.vehicle.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.ap.automotiveportalbackend.vehicle.service.VehicleService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

import java.net.http.HttpClient;

@org.springframework.context.annotation.Configuration
public class VehicleConfiguration {

    @Value("${vehicle.request.limit}")
    private int requestLimit;

    @Bean
    public VehicleService vehicleService() {
        return new VehicleService(requestLimit, new ObjectMapper(), HttpClient.newHttpClient());
    }

}
