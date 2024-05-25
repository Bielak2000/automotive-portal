package org.ap.automotiveportalbackend.posts.service;

import lombok.AllArgsConstructor;
import org.ap.automotiveportalbackend.common.exception.NotFoundException;
import org.ap.automotiveportalbackend.images.Image;
import org.ap.automotiveportalbackend.posts.Post;
import org.ap.automotiveportalbackend.posts.PostRepository;
import org.ap.automotiveportalbackend.posts.appearance.service.AppearanceService;
import org.ap.automotiveportalbackend.posts.dto.BoostPostDTO;
import org.ap.automotiveportalbackend.posts.dto.PostDTO;
import org.ap.automotiveportalbackend.posts.dto.PostFormDTO;
import org.ap.automotiveportalbackend.posts.dto.PostPageDTO;
import org.ap.automotiveportalbackend.users.User;
import org.ap.automotiveportalbackend.users.service.UserService;
import org.ap.automotiveportalbackend.vehicle.dto.VehicleBrandDTO;
import org.ap.automotiveportalbackend.vehicle.dto.VehicleModelDTO;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@AllArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserService userService;
    private final AppearanceService appearanceService;

    @Transactional(readOnly = true)
    public List<PostDTO> getAllPostsByPageAndSearch(PostPageDTO postPageDTO) {
        Pageable pageable = PageRequest.of(postPageDTO.page(), postPageDTO.size());
        if (postPageDTO.searchValue() != null) {
            return postRepository.findAllByTitleContainingOrderByCreatedAtDesc(postPageDTO.searchValue(), pageable).stream().map(this::toPostDTO).collect(Collectors.toList());
        } else {
            return postRepository.findByOrderByCreatedAtDesc(pageable).stream().map(this::toPostDTO).collect(Collectors.toList());
        }
    }

    @Transactional(readOnly = true)
    public List<VehicleBrandDTO> getAllPostVehicleBrands() {
        return postRepository.findAll().stream().map(p -> new VehicleBrandDTO(p.getVehicleBrand())).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<VehicleModelDTO> getAllPostVehicleModels() {
        return postRepository.findAll().stream().map(p -> new VehicleModelDTO(p.getVehicleModel())).collect(Collectors.toList());
    }

//    @Transactional(readOnly = true)
//    public List<PostDTO> getAllPostsByVehicleBrand(String brand) {
//        return postRepository.findAllByVehicleBrandOrderByCreatedAt(brand).stream().map(PostDTO::create).collect(Collectors.toList());
//    }
//
//    @Transactional(readOnly = true)
//    public List<PostDTO> getAllPostsByVehicleModel(String model) {
//        return postRepository.findAllByVehicleModelOrderByCreatedAt(model).stream().map(PostDTO::create).collect(Collectors.toList());
//    }

    @Transactional
    public void createPost(PostFormDTO postFormDTO, String username, List<Image> images, UUID postId) {
        User user = userService.getByUsername(username);
        Post post = new Post(postFormDTO, user, images, postId);
        for (Image image : images) {
            image.setPost(post);
        }
        postRepository.save(post);
    }

    @Transactional
    public void boostPost(BoostPostDTO boostPostDTO) {
        Post post = postRepository.findById(boostPostDTO.postId()).orElseThrow(() -> new NotFoundException(String.format("Post %s not found", boostPostDTO.postId().toString())));
        if (boostPostDTO.boost()) {
            appearanceService.createAppearancePost(boostPostDTO.userId(), boostPostDTO.postId());
            post.addAppearanceNumber();
            postRepository.save(post);
        } else {
            appearanceService.deleteAppearancePost(boostPostDTO.userId(), boostPostDTO.postId());
            post.removeAppearanceNumber();
            postRepository.save(post);
        }
    }

    @Transactional(readOnly = true)
    public PostDTO getPostById(UUID postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new NotFoundException(String.format("Post %s not found", postId.toString())));
        return toPostDTO(post);
    }

    private PostDTO toPostDTO(Post post) {
        List<String> images = new ArrayList<>();
        for (Image image : post.getImages()) {
            images.add(image.getUrl());
        }
        return PostDTO.create(post, images);
    }

}
