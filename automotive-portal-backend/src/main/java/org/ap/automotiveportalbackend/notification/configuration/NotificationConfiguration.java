package org.ap.automotiveportalbackend.notification.configuration;

import org.ap.automotiveportalbackend.notification.NotificationRepository;
import org.ap.automotiveportalbackend.notification.service.NotificationService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class NotificationConfiguration {

    @Bean
    public NotificationService notificationService(NotificationRepository notificationRepository) {
        return new NotificationService(notificationRepository);
    }

}
