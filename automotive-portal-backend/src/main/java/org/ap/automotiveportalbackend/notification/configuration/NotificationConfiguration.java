package org.ap.automotiveportalbackend.notification.configuration;

import org.ap.automotiveportalbackend.notification.DeletedOldNotificationJob;
import org.ap.automotiveportalbackend.notification.NotificationRepository;
import org.ap.automotiveportalbackend.notification.service.NotificationService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class NotificationConfiguration {

    @Value("${ap.archiving.time.notification.days}")
    private Integer notificationDayArchiving;

    @Bean
    public NotificationService notificationService(NotificationRepository notificationRepository) {
        return new NotificationService(notificationRepository, notificationDayArchiving);
    }

    @Bean
    public DeletedOldNotificationJob deletedOldNotificationJob(NotificationService notificationService) {
        return new DeletedOldNotificationJob(notificationService);
    }

}
