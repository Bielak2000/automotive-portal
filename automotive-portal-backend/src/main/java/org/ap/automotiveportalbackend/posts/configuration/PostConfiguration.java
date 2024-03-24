package org.ap.automotiveportalbackend.posts.configuration;

import org.ap.automotiveportalbackend.posts.PostRepository;
import org.ap.automotiveportalbackend.posts.service.PostService;
import org.springframework.context.annotation.Bean;

@org.springframework.context.annotation.Configuration
public class PostConfiguration {

    @Bean
    public PostService postService(PostRepository postRepository) {
        return new PostService(postRepository);
    }

}
