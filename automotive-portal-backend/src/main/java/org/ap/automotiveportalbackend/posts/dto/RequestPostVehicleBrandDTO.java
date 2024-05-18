package org.ap.automotiveportalbackend.posts.dto;

import javax.validation.constraints.NotNull;

public record RequestPostVehicleBrandDTO(@NotNull(message = "Brand can't be null") String brand) {
}
