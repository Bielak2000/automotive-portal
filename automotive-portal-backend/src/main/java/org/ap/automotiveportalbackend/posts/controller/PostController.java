package org.ap.automotiveportalbackend.posts.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.ap.automotiveportalbackend.posts.dto.PostDTO;
import org.ap.automotiveportalbackend.posts.service.PostService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/posts")
@AllArgsConstructor
@Slf4j
public class PostController {

    private final PostService postService;

    @GetMapping
    public List<PostDTO> getAllPosts() {
        log.info("Get all posts ...");
        return postService.getAllPosts();
    }

}
