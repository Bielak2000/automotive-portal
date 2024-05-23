package org.ap.automotiveportalbackend.posts.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public record PostPageDTO(@NotNull @Min(0) Integer page, @NotNull @Min(1) Integer size) {
}
