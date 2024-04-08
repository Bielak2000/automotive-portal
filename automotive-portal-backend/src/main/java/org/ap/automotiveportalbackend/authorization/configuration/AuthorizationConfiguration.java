package org.ap.automotiveportalbackend.authorization.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.ap.automotiveportalbackend.authorization.service.CustomUserDetailsService;
import org.ap.automotiveportalbackend.authorization.token.JwtAuthorizationFilter;
import org.ap.automotiveportalbackend.authorization.token.JwtUtil;
import org.ap.automotiveportalbackend.users.UserRepository;
import org.ap.automotiveportalbackend.users.service.UserService;
import org.springframework.context.annotation.Bean;

@org.springframework.context.annotation.Configuration
public class AuthorizationConfiguration {

    @Bean
    public JwtUtil jwtUtil() {
        return new JwtUtil();
    }

    @Bean
    public CustomUserDetailsService customUserDetailsService(UserRepository userRepository) {
        return new CustomUserDetailsService(userRepository);
    }

    @Bean
    public JwtAuthorizationFilter jwtAuthorizationFilter(JwtUtil jwtUtil, CustomUserDetailsService customUserDetailsService) {
        return new JwtAuthorizationFilter(jwtUtil, new ObjectMapper(), customUserDetailsService);
    }

}
