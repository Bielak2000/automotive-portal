package org.ap.automotiveportalbackend.posts.configuration;

import org.ap.automotiveportalbackend.posts.PostRepository;
import org.ap.automotiveportalbackend.posts.service.PostService;
import org.ap.automotiveportalbackend.users.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import org.springframework.web.multipart.support.MultipartFilter;

@org.springframework.context.annotation.Configuration
public class PostConfiguration {

    @Bean
    public PostService postService(PostRepository postRepository, UserService userService) {
        return new PostService(postRepository, userService);
    }

//    @Bean
//    public CommonsMultipartResolver multipartResolver() {
//        CommonsMultipartResolver multipart = new CommonsMultipartResolver();
//        multipart.setMaxUploadSize(3 * 1024 * 1024);
//        return multipart;
//    }

//    @Bean
//    @Order(0)
//    public MultipartFilter multipartFilter() {
//        MultipartFilter multipartFilter = new MultipartFilter();
//        multipartFilter.setMultipartResolverBeanName("multipartResolver");
//        return multipartFilter;
//    }

}
