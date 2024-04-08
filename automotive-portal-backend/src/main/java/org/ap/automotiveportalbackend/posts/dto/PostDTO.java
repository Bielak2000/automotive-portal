package org.ap.automotiveportalbackend.posts.dto;

import lombok.Builder;
import org.ap.automotiveportalbackend.posts.Post;
import org.ap.automotiveportalbackend.users.dto.UserDTO;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Builder
public record PostDTO(@NotEmpty(message = "Title can't be empty") String title,
                      @NotEmpty(message = "Content can't be empty") String content,
                      @NotNull(message = "VehicleId can't be null") UUID vehicleId,
                      @NotNull(message = "User can't be null") UserDTO userDTO) {
    public static PostDTO create(Post post) {
        return PostDTO.builder()
                .title(post.getTitle())
                .content(post.getContent())
                .vehicleId(post.getVehicleId())
                .userDTO(UserDTO.create(post.getUser()))
                .build();
    }
}
