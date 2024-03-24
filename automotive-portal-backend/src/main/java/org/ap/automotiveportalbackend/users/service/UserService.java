package org.ap.automotiveportalbackend.users.service;

import lombok.AllArgsConstructor;
import org.ap.automotiveportalbackend.users.dto.UserDTO;
import org.ap.automotiveportalbackend.users.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<UserDTO> getUsers() {
        return userRepository.findAll().stream().map(UserDTO::create).collect(Collectors.toList());
    }

}
