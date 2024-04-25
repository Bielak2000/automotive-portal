package org.ap.automotiveportalbackend.vehicle.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.ap.automotiveportalbackend.vehicle.dto.VehicleBrandDTO;
import org.ap.automotiveportalbackend.vehicle.dto.VehicleModelDTO;
import org.ap.automotiveportalbackend.vehicle.service.VehicleService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotEmpty;
import java.util.List;

@RestController
@RequestMapping("api/vehicle")
@AllArgsConstructor
@Slf4j
public class VehicleController {

    private final VehicleService vehicleService;

    @GetMapping("/brands")
    public List<VehicleBrandDTO> getAllBrands() {
        log.info("Get all brands ...");
        return vehicleService.getAllBrands();
    }

    @GetMapping("/models/{brand}")
    public List<VehicleModelDTO> getModelsByBrand(@PathVariable("brand") @NotEmpty String brand) {
        log.info("Get all models for {} ...", brand);
        return vehicleService.getModelsByBrand(brand);
    }

}
