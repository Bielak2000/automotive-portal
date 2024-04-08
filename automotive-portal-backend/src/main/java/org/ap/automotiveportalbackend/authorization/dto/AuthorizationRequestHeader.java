package org.ap.automotiveportalbackend.authorization.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AuthorizationRequestHeader {

    private String email;
    private String password;

}
