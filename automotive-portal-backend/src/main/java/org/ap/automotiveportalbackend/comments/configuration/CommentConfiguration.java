package org.ap.automotiveportalbackend.comments.configuration;

import org.ap.automotiveportalbackend.comments.CommentRepository;
import org.ap.automotiveportalbackend.comments.service.CommentService;
import org.ap.automotiveportalbackend.notification.service.NotificationService;
import org.ap.automotiveportalbackend.posts.PostRepository;
import org.ap.automotiveportalbackend.users.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

@org.springframework.context.annotation.Configuration
public class CommentConfiguration {

    @Value("${ap.upload.image.directory}")
    private String uploadDirectory;
    @Value("${ap.upload.comments.directory}")
    private String commentsDirectory;

    @Bean
    public CommentService commentService(NotificationService notificationService, CommentRepository commentRepository, UserRepository userRepository, PostRepository postRepository) {
        return new CommentService(notificationService, commentRepository, userRepository, postRepository, uploadDirectory, commentsDirectory);
    }

}
