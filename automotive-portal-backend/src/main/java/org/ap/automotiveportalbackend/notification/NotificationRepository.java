package org.ap.automotiveportalbackend.notification;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface NotificationRepository extends JpaRepository<Notification, UUID> {
    public void deleteAllByPostId(UUID postId);
}
