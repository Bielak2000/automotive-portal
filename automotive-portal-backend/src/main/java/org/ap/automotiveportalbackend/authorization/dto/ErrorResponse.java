package org.ap.automotiveportalbackend.authorization.dto;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
public class ErrorResponse {

    HttpStatus httpStatus;
    String message;

}
