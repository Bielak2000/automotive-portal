package org.ap.automotiveportalbackend.notification.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.ap.automotiveportalbackend.notification.service.NotificationService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/notification")
@AllArgsConstructor
@Slf4j
public class NotificationController {

    private final NotificationService notificationService;

    @PutMapping("/{notificationId}")
    public void assignNotificationRead(@PathVariable String notificationId) {
        notificationService.assignNotificationRead(UUID.fromString(notificationId));
    }

}
