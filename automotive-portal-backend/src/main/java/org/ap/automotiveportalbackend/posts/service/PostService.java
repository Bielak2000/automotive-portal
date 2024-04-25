package org.ap.automotiveportalbackend.posts.service;

import lombok.AllArgsConstructor;
import org.ap.automotiveportalbackend.posts.PostRepository;
import org.ap.automotiveportalbackend.posts.dto.PostDTO;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
public class PostService {
    private final PostRepository postRepository;

    public List<PostDTO> getAllPosts() {
        return postRepository.findAll().stream().map(PostDTO::create).collect(Collectors.toList());
    }

}
