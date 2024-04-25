package org.ap.automotiveportalbackend.users.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.annotation.Nullable;
import lombok.Builder;
import org.ap.automotiveportalbackend.users.User;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;

@Builder
public record UserDTO(@NotNull @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime createdAt,
                      @NotNull @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime lastActivityAt,
                      @NotEmpty(message = "Name can't be empty") String name,
                      @NotEmpty(message = "Surname can't be empty") String surname,
                      @NotEmpty(message = "Email can't be emtpy") String email,
                      @Nullable String vehicleBrand,
                      @Nullable String vehicleModel) {
    public static UserDTO create(User user) {
        return UserDTO.builder()
                .createdAt(user.getCreatedAt())
                .lastActivityAt(user.getLastActivityAt())
                .name(user.getName())
                .surname(user.getSurname())
                .email(user.getEmail())
                .vehicleBrand(user.getVehicleBrand())
                .vehicleBrand(user.getVehicleModel())
                .build();
    }
}
