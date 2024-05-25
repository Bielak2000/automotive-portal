package org.ap.automotiveportalbackend.posts.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.ap.automotiveportalbackend.common.exception.BadRequestException;
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
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@AllArgsConstructor
@Slf4j
public class PostService {

    private final PostRepository postRepository;
    private final UserService userService;
    private final AppearanceService appearanceService;

    // TODO: function require refactoring
    @Transactional(readOnly = true)
    public List<PostDTO> getAllPostsByPageAndFilters(PostPageDTO postPageDTO) {
        Pageable pageable = PageRequest.of(postPageDTO.page(), postPageDTO.size());
        if (postPageDTO.searchValue() != null) {
            if (postPageDTO.sortByAppearanceNumber()) {
                log.info("Get all posts from {} page with {} records by searchValue and sorting by appearanceNumber", postPageDTO.page(), postPageDTO.size());
                List<PostDTO> postDTOS = checkUserIdIsCurrentAndFilter(postRepository.findAllByTitleContainingIgnoreCaseOrderByAppearanceNumberDescCreatedAtDesc(postPageDTO.searchValue(), pageable), postPageDTO);
                return checkVehicleFiltersAreCurrentAndFilter(postDTOS, postPageDTO);
            } else {
                log.info("Get all posts from {} page with {} records by searchValue", postPageDTO.page(), postPageDTO.size());
                List<PostDTO> postDTOS = checkUserIdIsCurrentAndFilter(postRepository.findAllByTitleContainingIgnoreCaseOrderByCreatedAtDesc(postPageDTO.searchValue(), pageable), postPageDTO);
                return checkVehicleFiltersAreCurrentAndFilter(postDTOS, postPageDTO);
            }
        } else {
            if (postPageDTO.sortByAppearanceNumber()) {
                log.info("Get all posts from {} page with {} records sorting by appearanceNumber", postPageDTO.page(), postPageDTO.size());
                List<PostDTO> postDTOS = checkUserIdIsCurrentAndFilter(postRepository.findByOrderByAppearanceNumberDescCreatedAtDesc(pageable), postPageDTO);
                return checkVehicleFiltersAreCurrentAndFilter(postDTOS, postPageDTO);
            } else {
                log.info("Get all posts from {} page with {} records", postPageDTO.page(), postPageDTO.size());
                List<PostDTO> postDTOS = checkUserIdIsCurrentAndFilter(postRepository.findByOrderByCreatedAtDesc(pageable), postPageDTO);
                return checkVehicleFiltersAreCurrentAndFilter(postDTOS, postPageDTO);
            }
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

    @Transactional
    public void deletePostById(UUID postId, UUID userId) {
        Optional<Post> post = postRepository.findById(postId);
        if (post.isPresent()) {
            if (post.get().getUser().getId().toString().equals(userId.toString())) {
                appearanceService.deleteAllAppearanceByPostId(postId);
                postRepository.deleteById(postId);
            } else {
                throw new BadRequestException(String.format("User %s isn't owner of %s post", userId.toString(), postId.toString()));
            }
        } else {
            throw new BadRequestException(String.format("Post %s not exist", postId.toString()));
        }
    }

    private List<PostDTO> checkUserIdIsCurrentAndFilter(List<Post> posts, PostPageDTO postPageDTO) {
        if (postPageDTO.userId() != null) {
            log.info("Get posts for user with id {}", postPageDTO.userId());
            return posts.stream().filter(post -> post.getUser().getId().toString().equals(postPageDTO.userId())).map(this::toPostDTO).collect(Collectors.toList());
        } else {
            return posts.stream().map(this::toPostDTO).collect(Collectors.toList());
        }
    }

    private List<PostDTO> checkVehicleFiltersAreCurrentAndFilter(List<PostDTO> posts, PostPageDTO postPageDTO) {
        if (postPageDTO.vehicleBrand() != null) {
            List<PostDTO> postsByVehicle = posts.stream().filter(post -> post.vehicleBrand().equals(postPageDTO.vehicleBrand())).toList();
            if (postPageDTO.vehicleModel() != null) {
                return postsByVehicle.stream().filter(post -> post.vehicleModel() != null && post.vehicleModel().equals(postPageDTO.vehicleModel())).collect(Collectors.toList());
            } else {
                return postsByVehicle;
            }
        } else {
            return posts;
        }
    }

    private PostDTO toPostDTO(Post post) {
        List<String> images = new ArrayList<>();
        for (Image image : post.getImages()) {
            images.add(image.getUrl());
        }
        return PostDTO.create(post, images);
    }

}
