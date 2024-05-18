package org.ap.automotiveportalbackend.images.configuration;

import org.ap.automotiveportalbackend.images.ImageRepository;
import org.ap.automotiveportalbackend.images.service.ImageService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ImageConfiguration {

    @Bean
    public ImageService imageService(ImageRepository imageRepository) {
        return new ImageService(imageRepository);
    }

}
