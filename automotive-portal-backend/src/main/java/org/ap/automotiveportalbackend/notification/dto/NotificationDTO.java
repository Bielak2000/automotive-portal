package org.ap.automotiveportalbackend.notification.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

public record NotificationDTO(String id, String content, Boolean read, String postId,
                              @NotNull @JsonFormat(pattern = "HH:mm dd-MM-yyyy") LocalDateTime createdAt) {
}
