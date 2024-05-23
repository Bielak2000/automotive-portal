package org.ap.automotiveportalbackend.posts.controller;

import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.ap.automotiveportalbackend.images.Image;
import org.ap.automotiveportalbackend.images.service.ImageService;
import org.ap.automotiveportalbackend.posts.dto.PostDTO;
import org.ap.automotiveportalbackend.posts.dto.PostFormDTO;
import org.ap.automotiveportalbackend.posts.dto.RequestPostVehicleBrandDTO;
import org.ap.automotiveportalbackend.posts.dto.RequestPostVehicleModelDTO;
import org.ap.automotiveportalbackend.posts.service.PostService;
import org.ap.automotiveportalbackend.vehicle.dto.VehicleBrandDTO;
import org.ap.automotiveportalbackend.vehicle.dto.VehicleModelDTO;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/posts")
@AllArgsConstructor
@Slf4j
public class PostController {

    private final PostService postService;
    private final ImageService imageService;

    @GetMapping
    public List<PostDTO> getAllPosts() {
        log.info("Get all posts ...");
        return postService.getAllPosts();
    }

    @GetMapping("/brands")
    public List<VehicleBrandDTO> getAllPostVehicleBrands() {
        log.info("Get all post vehicles ...");
        return postService.getAllPostVehicleBrands();
    }

    @GetMapping("/models")
    public List<VehicleModelDTO> getAllPostVehicleModels() {
        log.info("Get all post models ...");
        return postService.getAllPostVehicleModels();
    }

    @GetMapping("/brand")
    public List<PostDTO> getAllPostByVehicleBrand(@RequestBody @Valid RequestPostVehicleBrandDTO requestPostVehicleBrandDTO) {
        log.info("Get all posts by brand ...");
        return postService.getAllPostsByVehicleBrand(requestPostVehicleBrandDTO.brand());
    }

    @GetMapping("/model")
    public List<PostDTO> getAllPostByVehicleModel(@RequestBody @Valid RequestPostVehicleModelDTO requestPostVehicleModelDTO) {
        log.info("Get all posts by model ...");
        return postService.getAllPostsByVehicleModel(requestPostVehicleModelDTO.model());
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void createPost(@RequestPart @Valid PostFormDTO postFormDTO,
                           @RequestPart(value = "images", required = false) MultipartFile[] images) {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        UUID postId = UUID.randomUUID();
        List<Image> images1 = new ArrayList<>();
        if (images != null) {
            for (MultipartFile image : images) {
                images1.add(imageService.createImage(image, postId));
            }
        }
        postService.createPost(postFormDTO, username, images1, postId);
        log.info("Created new post by {} with {} images", username, images == null ? "0" : images.length);
    }

}
