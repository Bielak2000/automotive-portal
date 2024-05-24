package org.ap.automotiveportalbackend.posts.appearance.configuration;

import org.ap.automotiveportalbackend.posts.appearance.AppearanceRepository;
import org.ap.automotiveportalbackend.posts.appearance.service.AppearanceService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppearanceConfiguration {

    @Bean
    public AppearanceService appearanceService(AppearanceRepository appearanceRepository) {
        return new AppearanceService(appearanceRepository);
    }

}
