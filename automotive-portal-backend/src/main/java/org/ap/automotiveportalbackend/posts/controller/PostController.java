package org.ap.automotiveportalbackend.posts.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.ap.automotiveportalbackend.images.Image;
import org.ap.automotiveportalbackend.images.service.ImageService;
import org.ap.automotiveportalbackend.posts.dto.BoostPostDTO;
import org.ap.automotiveportalbackend.posts.dto.PostDTO;
import org.ap.automotiveportalbackend.posts.dto.PostFormDTO;
import org.ap.automotiveportalbackend.posts.dto.PostPageDTO;
import org.ap.automotiveportalbackend.posts.service.PostService;
import org.ap.automotiveportalbackend.vehicle.dto.VehicleBrandDTO;
import org.ap.automotiveportalbackend.vehicle.dto.VehicleModelDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.Charset;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static java.nio.file.Files.readAllBytes;
import static org.apache.commons.io.FilenameUtils.getExtension;
import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/api/posts")
@AllArgsConstructor
@Slf4j
public class PostController {

    private final PostService postService;
    private final ImageService imageService;

    @PostMapping("/pageable")
    public List<PostDTO> getPosts(@RequestBody @Valid PostPageDTO postPageDTO) {
        return postService.getAllPostsByPageAndFilters(postPageDTO);
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

    @GetMapping("/{postId}/{imageUrl}")
    public ResponseEntity<byte[]> getImage(@PathVariable("postId") String postId, @PathVariable("imageUrl") String imageUrl) {
        String decodedImageUrl = URLDecoder.decode(imageUrl, Charset.defaultCharset());
        Path path = imageService.createPathToImage(postId, imageUrl);
        try {
            log.info("Reading file {}.", imageUrl);
            byte[] bytes = readAllBytes(path);
            return ok().contentType(imageService.determineFileType(getExtension(decodedImageUrl)))
                    .body(bytes);
        } catch (IOException e) {
            log.error("Could not find the file on the file system. Path: {}", path.toAbsolutePath());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/boost")
    public void boostPost(@RequestBody BoostPostDTO boostPostDTO) {
        postService.boostPost(boostPostDTO);
        if (boostPostDTO.boost()) {
            log.info("Boosted for {} by {}", boostPostDTO.postId().toString(), boostPostDTO.userId().toString());
        } else {
            log.info("Delete boosted for {} by {}", boostPostDTO.postId().toString(), boostPostDTO.userId().toString());
        }
    }

    @GetMapping("/{postId}")
    public PostDTO getPostById(@PathVariable("postId") UUID postId) {
        log.info("Download post with {} id", postId.toString());
        return postService.getPostById(postId);
    }

//    @GetMapping("/brand")
//    public List<PostDTO> getAllPostByVehicleBrand(@RequestBody @Valid RequestPostVehicleBrandDTO requestPostVehicleBrandDTO) {
//        log.info("Get all posts by brand ...");
//        return postService.getAllPostsByVehicleBrand(requestPostVehicleBrandDTO.brand());
//    }
//
//    @GetMapping("/model")
//    public List<PostDTO> getAllPostByVehicleModel(@RequestBody @Valid RequestPostVehicleModelDTO requestPostVehicleModelDTO) {
//        log.info("Get all posts by model ...");
//        return postService.getAllPostsByVehicleModel(requestPostVehicleModelDTO.model());
//    }

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
