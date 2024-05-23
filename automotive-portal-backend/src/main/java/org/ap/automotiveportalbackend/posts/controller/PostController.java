package org.ap.automotiveportalbackend.posts.controller;

import jakarta.annotation.Nullable;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.ap.automotiveportalbackend.images.Image;
import org.ap.automotiveportalbackend.images.service.ImageService;
import org.ap.automotiveportalbackend.posts.dto.PostDTO;
import org.ap.automotiveportalbackend.posts.dto.PostFormDTO;
import org.ap.automotiveportalbackend.posts.dto.PostPageDTO;
import org.ap.automotiveportalbackend.posts.dto.RequestPostVehicleBrandDTO;
import org.ap.automotiveportalbackend.posts.dto.RequestPostVehicleModelDTO;
import org.apache.commons.io.IOUtils;
import org.ap.automotiveportalbackend.posts.service.PostService;
import org.ap.automotiveportalbackend.vehicle.dto.VehicleBrandDTO;
import org.ap.automotiveportalbackend.vehicle.dto.VehicleModelDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.io.IOException;
import java.io.InputStream;
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

    @PostMapping("/pageable")
    public List<PostDTO> getPosts(@RequestBody @Valid PostPageDTO postPageDTO) {
        log.info("Get all posts from {} page with {} records", postPageDTO.page(), postPageDTO.size());
        return postService.getAllPostsByPage(postPageDTO);
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

    @Autowired
    private final ResourceLoader resourceLoader;

//    public PostController(ResourceLoader resourceLoader, PostService postService, ImageService imageService) {
//        this.resourceLoader = resourceLoader;
//        this.postService = postService;
//        this.imageService = imageService;
//    }

    @GetMapping("/image-response-entity")
    public ResponseEntity<byte[]> getImageAsResponseEntity() throws IOException {
        HttpHeaders headers = new HttpHeaders();
        Resource resource = resourceLoader.getResource("/home/kacperbielak/ac/982fbc0f-0c47-4269-ab04-14556d191b66/d0b5a107-3954-4e16-a9a3-60c23a306856_Screenshot from 2024-05-11 15-26-01.png");
        InputStream in = resource.getInputStream();
        byte[] media = IOUtils.toByteArray(in);
        headers.setCacheControl(CacheControl.noCache().getHeaderValue());
        headers.setContentType(MediaType.IMAGE_JPEG);

        return new ResponseEntity<>(media, headers, HttpStatus.OK);
    }

//    @RequestMapping(value = "/image-manual-response", method = RequestMethod.GET)
//    public void getImageAsByteArray(HttpServletResponse response) throws IOException {
//        InputStream in = servletContext.getResourceAsStream("/home/kacperbielak/ac/982fbc0f-0c47-4269-ab04-14556d191b66/d0b5a107-3954-4e16-a9a3-60c23a306856_Screenshot from 2024-05-11 15-26-01.png");
//        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
//        IOUtils.copy(in, response.getOutputStream());
//    }

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
