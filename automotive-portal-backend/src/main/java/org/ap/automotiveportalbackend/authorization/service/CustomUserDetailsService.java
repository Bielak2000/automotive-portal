package org.ap.automotiveportalbackend.authorization.service;

import lombok.AllArgsConstructor;
import org.ap.automotiveportalbackend.users.User;
import org.ap.automotiveportalbackend.users.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            List<String> roles = new ArrayList<>();
            roles.add(user.get().getRole().getRole());
            UserDetails userDetails =
                    org.springframework.security.core.userdetails.User.builder()
                            .username(user.get().getEmail())
                            .password(user.get().getPassword())
                            .roles(roles.toArray(new String[0]))
                            .build();
            return userDetails;
        } else {
            throw new UsernameNotFoundException(String.format("User %s not found.", email));
        }

    }
}
