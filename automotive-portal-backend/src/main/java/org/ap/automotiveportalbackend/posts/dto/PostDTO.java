package org.ap.automotiveportalbackend.posts.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.annotation.Nullable;
import lombok.Builder;
import org.ap.automotiveportalbackend.comments.Comment;
import org.ap.automotiveportalbackend.comments.dto.CommentDTO;
import org.ap.automotiveportalbackend.posts.Post;
import org.ap.automotiveportalbackend.posts.PostType;
import org.ap.automotiveportalbackend.users.dto.UserDTO;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Builder
public record PostDTO(@NotEmpty(message = "Id can't be emtpy") String postId,
                      @NotEmpty(message = "Title can't be empty") String title,
                      @NotEmpty(message = "Content can't be empty") String content,
                      @NotNull(message = "VehicleId can't be null") String vehicleBrand,
                      @NotNull(message = "PostType can't be null") PostType postType,
                      @Nullable String vehicleModel,
                      @NotNull(message = "AppearanceNumber can't be null") Integer appearanceNumber,
                      @NotNull @JsonFormat(pattern = "HH:mm dd-MM-yyyy") LocalDateTime modifiedAt,
                      @NotNull(message = "User can't be null") UserDTO userDTO,
                      List<String> appearanceUserIds,
                      List<CommentDTO> comments,
                      @Nullable List<String> images) {
    public static PostDTO create(Post post, List<String> images) {
        post.getComments().sort(Comparator.comparing(Comment::getCreatedAt).reversed());
        return PostDTO.builder()
                .postId(post.getId().toString())
                .title(post.getTitle())
                .content(post.getContent())
                .postType(post.getPostType())
                .vehicleBrand(post.getVehicleBrand())
                .vehicleModel(post.getVehicleModel())
                .appearanceNumber(post.getAppearanceNumber())
                .modifiedAt(post.getModifiedAt())
                .userDTO(UserDTO.create(post.getUser()))
                .appearanceUserIds(
                        post.getBoostingUsers().stream().map(user -> user.getId().toString()).collect(Collectors.toList()))
                .images(images)
                .comments(post.getComments().stream().map(comment -> new CommentDTO(
                                comment.getId().toString(), comment.getContent(), comment.getImageUrl(), comment.getUser().getName(), comment.getUser().getSurname(), comment.getCreatedAt()))
                        .collect(Collectors.toList()))
                .build();
    }
}
