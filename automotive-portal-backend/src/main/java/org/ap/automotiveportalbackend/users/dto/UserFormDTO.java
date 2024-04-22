package org.ap.automotiveportalbackend.users.dto;

import jakarta.annotation.Nullable;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import java.util.UUID;

public record UserFormDTO(@NotEmpty(message = "Name can't be empty") String name,
                          @NotEmpty(message = "Password can't be empty") String password,
                          @NotEmpty(message = "Confirmation password can't be empty") String confirmationPassword,
                          @NotEmpty(message = "Surname can't be empty") String surname,
                          @NotEmpty(message = "Email can't be emtpy") @Email String email,

                          @Nullable @Pattern(regexp = "^[0-9]{9}|$") String phoneNumber,
                          @Nullable Long vehicleId) {
}
