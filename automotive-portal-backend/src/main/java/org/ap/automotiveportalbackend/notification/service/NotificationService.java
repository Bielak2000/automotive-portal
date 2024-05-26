package org.ap.automotiveportalbackend.notification.service;

import lombok.AllArgsConstructor;
import org.ap.automotiveportalbackend.common.exception.NotFoundException;
import org.ap.automotiveportalbackend.notification.Notification;
import org.ap.automotiveportalbackend.notification.NotificationRepository;
import org.ap.automotiveportalbackend.users.User;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final Integer notificationDayArchiving;

    @Transactional
    public void createNotification(String content, UUID postId, User user, UUID commentId) {
        notificationRepository.save(new Notification(content, postId, user, commentId));
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

    @Transactional
    public void deleteAllNotificationByCommentId(UUID commentId) {
        notificationRepository.deleteAllByCommentId(commentId);
    }

    @Transactional
    public int deleteOldNotifications() {
        return notificationRepository.deleteAllByCreatedAtBefore(LocalDateTime.now().minusDays(notificationDayArchiving));
    }

}
