package org.ap.automotiveportalbackend.notification;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.UUID;

public interface NotificationRepository extends JpaRepository<Notification, UUID> {
    public void deleteAllByPostId(UUID postId);
    public void deleteAllByCommentId(UUID commentId);
    public int deleteAllByCreatedAtBefore(LocalDateTime date);
}
