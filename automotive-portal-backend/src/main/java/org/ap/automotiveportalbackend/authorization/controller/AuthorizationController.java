package org.ap.automotiveportalbackend.authorization.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.ap.automotiveportalbackend.authorization.dto.AuthorizationRequestHeader;
import org.ap.automotiveportalbackend.authorization.dto.AuthorizationResponseHeader;
import org.ap.automotiveportalbackend.authorization.dto.ErrorResponse;
import org.ap.automotiveportalbackend.authorization.token.JwtUtil;
import org.ap.automotiveportalbackend.users.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
@Slf4j
public class AuthorizationController {

    private final AuthenticationManager authenticationManager;
    private JwtUtil jwtUtil;

    @ResponseBody
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity login(@RequestBody AuthorizationRequestHeader authorizationRequestHeader) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authorizationRequestHeader.getEmail(), authorizationRequestHeader.getPassword())
            );
            String email = authentication.getName();
            User user = new User(email, "");
            String token = jwtUtil.createToken(user);
            AuthorizationResponseHeader authorizationResponseHeader = new AuthorizationResponseHeader(email, token);
            return ResponseEntity.ok(authorizationResponseHeader);
        } catch (BadCredentialsException e) {
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.UNAUTHORIZED, "Invalid username or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST, e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
}
