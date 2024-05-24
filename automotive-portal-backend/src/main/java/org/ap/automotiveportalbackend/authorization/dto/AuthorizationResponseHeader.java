package org.ap.automotiveportalbackend.authorization.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@AllArgsConstructor
@Getter
public class AuthorizationResponseHeader {

    private String email;
    private String token;
    private UUID userId;

}
