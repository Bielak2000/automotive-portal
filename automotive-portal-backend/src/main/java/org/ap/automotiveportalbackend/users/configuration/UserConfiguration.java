package org.ap.automotiveportalbackend.users.configuration;

import org.ap.automotiveportalbackend.users.UserRepository;
import org.ap.automotiveportalbackend.users.service.UserService;
import org.springframework.context.annotation.Bean;

@org.springframework.context.annotation.Configuration
public class UserConfiguration {

    @Bean
    public UserService userService(UserRepository userRepository) {
        return new UserService(userRepository);
    }

}
