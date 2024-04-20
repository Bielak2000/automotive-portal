package org.ap.automotiveportalbackend.users.service;

import lombok.AllArgsConstructor;
import org.ap.automotiveportalbackend.common.exception.BadRequestException;
import org.ap.automotiveportalbackend.common.exception.NotFoundException;
import org.ap.automotiveportalbackend.users.User;
import org.ap.automotiveportalbackend.users.UserRepository;
import org.ap.automotiveportalbackend.users.dto.UserDTO;
import org.ap.automotiveportalbackend.users.dto.UserFormDTO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {

    PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public List<UserDTO> getUsers() {
        return userRepository.findAll().stream().map(UserDTO::create).collect(Collectors.toList());
    }

    public void createUser(UserFormDTO userFormDTO) throws BadRequestException {
        if (userFormDTO.password().equals(userFormDTO.confirmationPassword())) {
            if (userRepository.findByEmail(userFormDTO.email()).isEmpty()) {
                User user = new User(userFormDTO, passwordEncoder.encode(userFormDTO.password()));
                userRepository.save(user);
            } else {
                throw new BadRequestException("User with this email just exists.");
            }

        } else {
            throw new BadRequestException("Passwords are different.");
        }
    }

    public UserDTO getByEmail(String email) {
        return UserDTO.create(userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException(String.format("User %s not found", email))));
    }

}
