package org.ap.automotiveportalbackend.authorization.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AuthorizationResponseHeader {

    private String email;
    private String token;

}
