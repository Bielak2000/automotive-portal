package org.ap.automotiveportalbackend.users.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.ap.automotiveportalbackend.common.exception.BadRequestException;
import org.ap.automotiveportalbackend.users.dto.ChangePasswordDTO;
import org.ap.automotiveportalbackend.users.dto.UserDTO;
import org.ap.automotiveportalbackend.users.dto.UserFormDTO;
import org.ap.automotiveportalbackend.users.dto.UserUpdateDTO;
import org.ap.automotiveportalbackend.users.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<UserDTO> getAllUsers() {
        log.info("Get all users ...");
        return userService.getUsers();
    }

    @PostMapping("/register")
    @ResponseStatus(code = HttpStatus.CREATED)
    public void createUser(@RequestBody @Valid UserFormDTO userFormDTO) throws BadRequestException {
        userService.createUser(userFormDTO);
        log.info("Created new user {}", userFormDTO.email());
    }

    @PutMapping()
    @ResponseStatus(code = HttpStatus.CREATED)
    public void updateUser(@RequestBody @Valid UserUpdateDTO userUpdateDTO) throws BadRequestException {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        userService.updateUser(username, userUpdateDTO);
        log.info("Update user {}", userUpdateDTO.email());
    }

    @PutMapping("change-password")
    @ResponseStatus(code = HttpStatus.CREATED)
    public ResponseEntity<Void> changeUserPassword(@RequestBody @Valid ChangePasswordDTO changePasswordDTO) {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        try {
            userService.changeUserPassword(username, changePasswordDTO);
        } catch (BadRequestException ex) {
            return ResponseEntity.badRequest().build();
        }
        log.info("Changed password for {}", username);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/details")
    public UserDTO getUserByEmail() {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        log.info("Get details user by email: {}", username);
        return userService.getByEmail(username);
    }
}
