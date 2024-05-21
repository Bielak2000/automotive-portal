package org.ap.automotiveportalbackend.posts.dto;

import jakarta.annotation.Nullable;
import lombok.Builder;
import org.ap.automotiveportalbackend.posts.Post;
import org.ap.automotiveportalbackend.posts.PostType;
import org.ap.automotiveportalbackend.users.dto.UserDTO;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Builder
public record PostDTO(@NotEmpty(message = "Title can't be empty") String title,
                      @NotEmpty(message = "Content can't be empty") String content,
                      @NotNull(message = "VehicleId can't be null") String vehicleBrand,
                      @NotNull(message = "PostType can't be null") PostType postType,
                      @Nullable String vehicleModel,
                      @NotNull(message = "User can't be null") UserDTO userDTO) {
    public static PostDTO create(Post post) {
        return PostDTO.builder()
                .title(post.getTitle())
                .content(post.getContent())
                .postType(post.getPostType())
                .vehicleBrand(post.getVehicleBrand())
                .vehicleModel(post.getVehicleModel())
                .userDTO(UserDTO.create(post.getUser()))
                .build();
    }
}
