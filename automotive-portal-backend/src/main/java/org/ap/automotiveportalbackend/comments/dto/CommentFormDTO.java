package org.ap.automotiveportalbackend.comments.dto;

import javax.validation.constraints.NotNull;
import java.util.UUID;

public record CommentFormDTO(@NotNull String content, @NotNull UUID userId, @NotNull UUID postId) {
}
