package org.ap.automotiveportalbackend.posts.dto;

import javax.validation.constraints.NotNull;

public record RequestPostVehicleModelDTO(@NotNull(message = "Model can't be null") String model, @NotNull(message = "Brand can't be null") String brand) {
}
