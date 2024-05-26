package org.ap.automotiveportalbackend.notification.service;

import lombok.AllArgsConstructor;
import org.ap.automotiveportalbackend.common.exception.NotFoundException;
import org.ap.automotiveportalbackend.notification.Notification;
import org.ap.automotiveportalbackend.notification.NotificationRepository;
import org.ap.automotiveportalbackend.users.User;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@AllArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    @Transactional
    public void createNotification(String content, UUID postId, User user) {
        notificationRepository.save(new Notification(content, postId, user));
    }

    @Transactional
    public void assignNotificationRead(UUID notificationId) {
        Notification notification = notificationRepository.findById(notificationId).orElseThrow(()->new NotFoundException(String.format("Notification %s not found", notificationId)));
        notification.setRead(true);
        notificationRepository.save(notification);
    }

    @Transactional
    public void deleteAllNotificationByPostId(UUID postId) {
        notificationRepository.deleteAllByPostId(postId);
    }

}
