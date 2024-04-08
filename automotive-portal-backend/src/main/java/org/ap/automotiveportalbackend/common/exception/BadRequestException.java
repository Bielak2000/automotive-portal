package org.ap.automotiveportalbackend.common.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
@Slf4j
public class BadRequestException extends Exception {
    private String message;

    public BadRequestException(String message) {
        this.message = message;
        log.info(this.message);
    }
}
