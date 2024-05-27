package org.ap.automotiveportalbackend.posts.dto;

import jakarta.annotation.Nullable;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public record PostPageDTO(@NotNull @Min(0) Integer page, @NotNull @Min(1) Integer size, @Nullable String searchValue,
                          @NotNull Boolean sortByAppearanceNumber,
                          @Nullable String userId,
                          @Nullable String vehicleBrand,
                          @Nullable String vehicleModel,
                          @Nullable String postType) {
}
