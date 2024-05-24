package org.ap.automotiveportalbackend.users.service;

import lombok.AllArgsConstructor;
import org.ap.automotiveportalbackend.common.exception.BadRequestException;
import org.ap.automotiveportalbackend.common.exception.NotFoundException;
import org.ap.automotiveportalbackend.users.User;
import org.ap.automotiveportalbackend.users.UserRepository;
import org.ap.automotiveportalbackend.users.dto.ChangePasswordDTO;
import org.ap.automotiveportalbackend.users.dto.UserDTO;
import org.ap.automotiveportalbackend.users.dto.UserFormDTO;
import org.ap.automotiveportalbackend.users.dto.UserUpdateDTO;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@AllArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
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

    public void updateLastActivityUser(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            user.get().setLastActivityAt(LocalDateTime.now());
            userRepository.save(user.get());
        } else {
            throw new BadRequestException("User with this email just exists.");
        }
    }

    public UUID getUserIdByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            return user.get().getId();
        } else {
            throw new NotFoundException("User with this email not found.");
        }
    }

    public void updateUser(String email, UserUpdateDTO userUpdateDTO) throws BadRequestException {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            user.get().update(userUpdateDTO);
            userRepository.save(user.get());
        } else {
            throw new BadRequestException("User with this email just exists.");
        }
    }

    public void changeUserPassword(String email, ChangePasswordDTO changePasswordDTO) throws BadRequestException {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            if(passwordEncoder.matches(changePasswordDTO.oldPassword(), user.get().getPassword())) {
                if (changePasswordDTO.newPassword().equals(changePasswordDTO.confirmationPassword())) {
                    user.get().setPassword(passwordEncoder.encode(changePasswordDTO.newPassword()));
                    userRepository.save(user.get());
                } else {
                    throw new BadRequestException("The password are not the same.");
                }
            } else {
                throw new BadRequestException("The wrong old password.");
            }

        } else {
            throw new BadRequestException("User with this email just exists.");
        }
    }

    public UserDTO getByEmail(String email) {
        return UserDTO.create(userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException(String.format("User %s not found", email))));
    }

    public User getByUsername(String username) {
        return userRepository.findByEmail(username).orElseThrow(()->new NotFoundException(String.format("User %s not found", username)));
    }

}
