package org.ap.automotiveportalbackend.images.configuration;

import org.ap.automotiveportalbackend.images.ImageRepository;
import org.ap.automotiveportalbackend.images.service.ImageService;
import org.ap.automotiveportalbackend.posts.service.PostService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ImageConfiguration {

    @Value("${ac.upload.image.directory}")
    private String uploadDirectory;

    @Bean
    public ImageService imageService(ImageRepository imageRepository, PostService postService) {
        return new ImageService(uploadDirectory, imageRepository, postService);
    }

}