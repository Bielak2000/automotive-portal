package org.ap.automotiveportalbackend.vehicle.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.ap.automotiveportalbackend.common.exception.BadRequestException;
import org.ap.automotiveportalbackend.vehicle.dto.VehicleBrandDTO;
import org.ap.automotiveportalbackend.vehicle.dto.VehicleBrandResultsDTO;
import org.ap.automotiveportalbackend.vehicle.dto.VehicleModelDTO;
import org.ap.automotiveportalbackend.vehicle.dto.VehicleModelResultsDTO;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
public class VehicleService {

    private final static String ALL_BRANDS_URL = "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?select=make&group_by=make&limit={limit}&offset={offset}";
    private final static String ALL_MODELS_URL = "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?select=model&where=make%3D%27{brand}%27&group_by=model&limit={limit}&offset={offset}";

    private int requestLimit;
    private ObjectMapper mapper;
    private HttpClient client;

    public List<VehicleBrandDTO> getAllBrands() {
        boolean downloadAllRows = true;
        int offsetRows = 0;
        List<VehicleBrandDTO> allBrands = new ArrayList<>();

        while (downloadAllRows) {
            String allBrandsUrl = ALL_BRANDS_URL.replace("{limit}", String.valueOf(requestLimit)).replace("{offset}", String.valueOf(offsetRows));
            HttpRequest request = HttpRequest.newBuilder().uri(URI.create(allBrandsUrl)).build();
            try {
                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                if (response.statusCode() == 200) {
                    String responseBody = response.body();
                    VehicleBrandResultsDTO vehicleBrandResultsDTO = mapper.readValue(responseBody, VehicleBrandResultsDTO.class);
                    allBrands.addAll(vehicleBrandResultsDTO.results());
                    if (vehicleBrandResultsDTO.results().size() == requestLimit) {
                        offsetRows += requestLimit;
                    } else {
                        downloadAllRows = false;
                    }
                } else {
                    throw new BadRequestException("Wrong url to external service");
                }
            } catch (IOException | InterruptedException exception) {
                throw new BadRequestException("Wrong url to external service");
            }
        }
        return allBrands;
    }

    public List<VehicleModelDTO> getModelsByBrand(String brand) {
        boolean downloadAllRows = true;
        int offsetRows = 0;
        List<VehicleModelDTO> modelsByBrand = new ArrayList<>();

        while (downloadAllRows) {
            String modelsByBrandUrl = ALL_MODELS_URL.replace("{brand}", changeSpaceCharacter(brand)).replace("{limit}", String.valueOf(requestLimit)).replace("{offset}", String.valueOf(offsetRows));
            HttpRequest request = HttpRequest.newBuilder().uri(URI.create(modelsByBrandUrl)).build();
            try {
                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                if (response.statusCode() == 200) {
                    String responseBody = response.body();
                    VehicleModelResultsDTO vehicleModelResultsDTO = mapper.readValue(responseBody, VehicleModelResultsDTO.class);
                    modelsByBrand.addAll(vehicleModelResultsDTO.results());
                    if (vehicleModelResultsDTO.results().size() == requestLimit) {
                        offsetRows += requestLimit;
                    } else {
                        downloadAllRows = false;
                    }
                } else {
                    throw new BadRequestException("Wrong url to external service");
                }
            } catch (IOException | InterruptedException exception) {
                throw new BadRequestException("Wrong url to external service");
            }
        }
        return modelsByBrand;
    }

    private String changeSpaceCharacter(String text) {
        return text.replaceAll(" ", "%20");
    }

}
