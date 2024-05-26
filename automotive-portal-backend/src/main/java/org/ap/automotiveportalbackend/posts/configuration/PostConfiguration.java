package org.ap.automotiveportalbackend.posts.configuration;

import org.ap.automotiveportalbackend.images.service.ImageService;
import org.ap.automotiveportalbackend.notification.service.NotificationService;
import org.ap.automotiveportalbackend.posts.PostRepository;
import org.ap.automotiveportalbackend.posts.appearance.service.AppearanceService;
import org.ap.automotiveportalbackend.posts.service.PostService;
import org.ap.automotiveportalbackend.users.service.UserService;
import org.springframework.context.annotation.Bean;

@org.springframework.context.annotation.Configuration
public class PostConfiguration {

    @Bean
    public PostService postService(PostRepository postRepository, UserService userService, AppearanceService appearanceService, ImageService imageService, NotificationService notificationService) {
        return new PostService(postRepository, userService, appearanceService, imageService, notificationService);
    }

}
