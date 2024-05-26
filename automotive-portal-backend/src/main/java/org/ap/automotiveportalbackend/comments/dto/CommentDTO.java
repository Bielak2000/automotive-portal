package org.ap.automotiveportalbackend.comments.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.ap.automotiveportalbackend.users.dto.UserDTO;

import java.time.LocalDateTime;

public record CommentDTO(String content, String imageUrl, String userName, String userLastName, @JsonFormat(pattern = "HH:mm dd-MM-yyyy") LocalDateTime createdAt) {
}
