package org.ap.automotiveportalbackend.posts.dto;

import javax.validation.constraints.NotNull;
import java.util.UUID;

public record BoostPostDTO(@NotNull UUID postId, @NotNull UUID userId, @NotNull Boolean boost) {
}
