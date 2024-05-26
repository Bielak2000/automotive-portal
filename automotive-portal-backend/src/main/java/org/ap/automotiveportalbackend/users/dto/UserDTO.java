package org.ap.automotiveportalbackend.users.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.annotation.Nullable;
import lombok.Builder;
import org.ap.automotiveportalbackend.notification.Notification;
import org.ap.automotiveportalbackend.notification.dto.NotificationDTO;
import org.ap.automotiveportalbackend.users.User;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Builder
public record UserDTO(@NotNull UUID id,
                      @NotNull @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime createdAt,
                      @NotNull @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime lastActivityAt,
                      @NotEmpty(message = "Name can't be empty") String name,
                      @NotEmpty(message = "Surname can't be empty") String surname,
                      @NotEmpty(message = "Email can't be emtpy") String email,
                      @Nullable String phoneNumber,
                      List<NotificationDTO> notifications,
                      @Nullable String vehicleBrand,
                      @Nullable String vehicleModel) {
    public static UserDTO create(User user) {
        user.getNotifications().sort(Comparator.comparing(Notification::getCreatedAt).reversed());
        return UserDTO.builder()
                .id(user.getId())
                .createdAt(user.getCreatedAt())
                .lastActivityAt(user.getLastActivityAt())
                .name(user.getName())
                .surname(user.getSurname())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .vehicleBrand(user.getVehicleBrand())
                .vehicleModel(user.getVehicleModel())
                .notifications(user.getNotifications().stream().map(notification -> new NotificationDTO(notification.getId().toString(),
                        notification.getContent(), notification.isRead(),
                        notification.getPostId().toString(), notification.getCreatedAt())).collect(Collectors.toList()))
                .build();
    }
}
