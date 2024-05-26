package org.ap.automotiveportalbackend.notification;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.ap.automotiveportalbackend.notification.service.NotificationService;
import org.springframework.scheduling.annotation.Scheduled;

@Slf4j
@AllArgsConstructor
public class DeletedOldNotificationJob {

    private NotificationService notificationService;

    @Scheduled(cron = "${ap.deleted.old.notification.cron}")
    private void deleteOldNotifications() {
        int deleteNotificationsNumber = notificationService.deleteOldNotifications();
        log.info("Delete {} old notifications", deleteNotificationsNumber);
    }

}
