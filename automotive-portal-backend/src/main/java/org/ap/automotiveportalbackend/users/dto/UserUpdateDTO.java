package org.ap.automotiveportalbackend.users.dto;

import jakarta.annotation.Nullable;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

public record UserUpdateDTO(@NotEmpty(message = "Name can't be empty") String name,
                            @NotEmpty(message = "Surname can't be empty") String surname,
                            @NotEmpty(message = "Email can't be emtpy") @Email String email,

                            @Nullable @Pattern(regexp = "^[0-9]{9}|$") String phoneNumber,
                            @Nullable String vehicleBrand,
                            @Nullable String vehicleModel) {
}
