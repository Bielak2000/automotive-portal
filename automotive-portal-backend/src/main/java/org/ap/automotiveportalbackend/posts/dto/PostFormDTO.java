package org.ap.automotiveportalbackend.posts.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.UUID;

public record PostFormDTO(@NotEmpty(message = "Title can't be empty") String title,
                          @NotEmpty(message = "Content can't be empty") String content,
                          @NotNull(message = "VehicleId can't be null") UUID vehicleId,
                          @NotNull(message = "UserId can't be null") UUID userId) {
}
