package org.ap.automotiveportalbackend.posts.dto;

import jakarta.annotation.Nullable;
import org.ap.automotiveportalbackend.posts.PostType;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.UUID;

public record PostFormDTO(@NotEmpty(message = "Title can't be empty") String title,
                          @NotEmpty(message = "Content can't be empty") String content,
                          @NotEmpty(message = "VehicleBrand can't be null") String vehicleBrand,
                          @NotNull(message = "PostType can't be null") PostType postType,
                          @Nullable String vehicleModel) {
}
