package org.ap.automotiveportalbackend.images.dto;

import javax.validation.constraints.NotEmpty;

public record ImageDTO(@NotEmpty String url) {
}
