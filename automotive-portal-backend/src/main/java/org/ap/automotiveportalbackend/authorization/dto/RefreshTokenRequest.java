package org.ap.automotiveportalbackend.authorization.dto;

import lombok.Getter;

@Getter
public class RefreshTokenRequest {

    private final String oldToken;

    public RefreshTokenRequest(String header) {
        if(!header.contains("Bearer")) oldToken = "";
        else {
            oldToken = header.substring(7);
        }
    }
}
