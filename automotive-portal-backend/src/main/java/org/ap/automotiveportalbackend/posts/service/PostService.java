package org.ap.automotiveportalbackend.posts.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.ap.automotiveportalbackend.common.exception.BadRequestException;
import org.ap.automotiveportalbackend.common.exception.NotFoundException;
import org.ap.automotiveportalbackend.images.Image;
import org.ap.automotiveportalbackend.images.service.ImageService;
import org.ap.automotiveportalbackend.notification.service.NotificationService;
import org.ap.automotiveportalbackend.posts.Post;
import org.ap.automotiveportalbackend.posts.PostRepository;
import org.ap.automotiveportalbackend.posts.PostType;
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

import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
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
    private final ImageService imageService;
    private final NotificationService notificationService;

    // TODO: function require refactoring
    @Transactional(readOnly = true)
    public List<PostDTO> getAllPostsByPageAndFilters(PostPageDTO postPageDTO) {
        Pageable pageable = PageRequest.of(postPageDTO.page(), postPageDTO.size());
        List<PostDTO> findPosts;
        log.info("Get all posts from {} page with {} records", postPageDTO.page(), postPageDTO.size());
        if (postPageDTO.searchValue() != null) {
            if (postPageDTO.userId() != null) {
                User user = userService.getUserById(UUID.fromString(postPageDTO.userId()));
                if (postPageDTO.postType() != null) {
                    if (postPageDTO.vehicleBrand() != null) {
                        if (postPageDTO.vehicleModel() != null) {
                            findPosts = postRepository.findAllByUserAndTitleContainingIgnoreCaseAndPostTypeAndVehicleBrandAndVehicleModelOrderByModifiedAtDesc(
                                    user, postPageDTO.searchValue(), PostType.valueOf(postPageDTO.postType()), postPageDTO.vehicleBrand(), postPageDTO.vehicleModel(), pageable
                            ).stream().map(this::toPostDTO).collect(Collectors.toList());
                        } else {
                            findPosts = postRepository.findAllByUserAndTitleContainingIgnoreCaseAndPostTypeAndVehicleBrandOrderByModifiedAtDesc(
                                    user, postPageDTO.searchValue(), PostType.valueOf(postPageDTO.postType()), postPageDTO.vehicleBrand(), pageable
                            ).stream().map(this::toPostDTO).collect(Collectors.toList());
                        }
                    } else {
                        findPosts = postRepository.findAllByUserAndTitleContainingIgnoreCaseAndPostTypeOrderByModifiedAtDesc(
                                user, postPageDTO.searchValue(), PostType.valueOf(postPageDTO.postType()), pageable
                        ).stream().map(this::toPostDTO).collect(Collectors.toList());
                    }
                } else {
                    if (postPageDTO.vehicleBrand() != null) {
                        if (postPageDTO.vehicleModel() != null) {
                            findPosts = postRepository.findAllByUserAndTitleContainingIgnoreCaseAndVehicleBrandAndVehicleModelOrderByModifiedAtDesc(
                                    user, postPageDTO.searchValue(), postPageDTO.vehicleBrand(), postPageDTO.vehicleModel(), pageable
                            ).stream().map(this::toPostDTO).collect(Collectors.toList());
                        } else {
                            findPosts = postRepository.findAllByUserAndTitleContainingIgnoreCaseAndVehicleBrandOrderByModifiedAtDesc(
                                    user, postPageDTO.searchValue(), postPageDTO.vehicleBrand(), pageable
                            ).stream().map(this::toPostDTO).collect(Collectors.toList());
                        }
                    } else {
                        findPosts = postRepository.findAllByUserAndTitleContainingIgnoreCaseOrderByModifiedAtDesc(
                                user, postPageDTO.searchValue(), pageable
                        ).stream().map(this::toPostDTO).collect(Collectors.toList());
                    }
                }
            } else {
                if (postPageDTO.postType() != null) {
                    if (postPageDTO.vehicleBrand() != null) {
                        if (postPageDTO.vehicleModel() != null) {
                            findPosts = postRepository.findAllByTitleContainingIgnoreCaseAndPostTypeAndVehicleBrandAndVehicleModelOrderByModifiedAtDesc(
                                    postPageDTO.searchValue(), PostType.valueOf(postPageDTO.postType()), postPageDTO.vehicleBrand(), postPageDTO.vehicleModel(), pageable
                            ).stream().map(this::toPostDTO).collect(Collectors.toList());
                        } else {
                            findPosts = postRepository.findAllByTitleContainingIgnoreCaseAndPostTypeAndVehicleBrandOrderByModifiedAtDesc(
                                    postPageDTO.searchValue(), PostType.valueOf(postPageDTO.postType()), postPageDTO.vehicleBrand(), pageable
                            ).stream().map(this::toPostDTO).collect(Collectors.toList());
                        }
                    } else {
                        findPosts = postRepository.findAllByTitleContainingIgnoreCaseAndPostTypeOrderByModifiedAtDesc(
                                postPageDTO.searchValue(), PostType.valueOf(postPageDTO.postType()), pageable
                        ).stream().map(this::toPostDTO).collect(Collectors.toList());
                    }
                } else {
                    if (postPageDTO.vehicleBrand() != null) {
                        if (postPageDTO.vehicleModel() != null) {
                            findPosts = postRepository.findAllByTitleContainingIgnoreCaseAndVehicleBrandAndVehicleModelOrderByModifiedAtDesc(
                                    postPageDTO.searchValue(), postPageDTO.vehicleBrand(), postPageDTO.vehicleModel(), pageable
                            ).stream().map(this::toPostDTO).collect(Collectors.toList());
                        } else {
                            findPosts = postRepository.findAllByTitleContainingIgnoreCaseAndVehicleBrandOrderByModifiedAtDesc(
                                    postPageDTO.searchValue(), postPageDTO.vehicleBrand(), pageable
                            ).stream().map(this::toPostDTO).collect(Collectors.toList());
                        }
                    } else {
                        findPosts = postRepository.findAllByTitleContainingIgnoreCaseOrderByModifiedAtDesc(
                                postPageDTO.searchValue(), pageable
                        ).stream().map(this::toPostDTO).collect(Collectors.toList());
                    }
                }
            }
//                List<PostDTO> postDTOS = checkUserIdIsCurrentAndFilter(postRepository.findAllByTitleContainingIgnoreCaseOrderByAppearanceNumberDescModifiedAtDesc(postPageDTO.searchValue(), pageable), postPageDTO);
//                List<PostDTO> postDTOSFilterByPostType = checkPostTypeIsCurrentAndFilter(postDTOS, postPageDTO);
//                return checkVehicleFiltersAreCurrentAndFilter(postDTOSFilterByPostType, postPageDTO);
        } else {


            if (postPageDTO.userId() != null) {
                User user = userService.getUserById(UUID.fromString(postPageDTO.userId()));
                if (postPageDTO.postType() != null) {
                    if (postPageDTO.vehicleBrand() != null) {
                        if (postPageDTO.vehicleModel() != null) {
                            findPosts = postRepository.findAllByUserAndPostTypeAndVehicleBrandAndVehicleModelOrderByModifiedAtDesc(
                                    user, PostType.valueOf(postPageDTO.postType()), postPageDTO.vehicleBrand(), postPageDTO.vehicleModel(), pageable
                            ).stream().map(this::toPostDTO).collect(Collectors.toList());
                        } else {
                            findPosts = postRepository.findAllByUserAndPostTypeAndVehicleBrandOrderByModifiedAtDesc(
                                    user, PostType.valueOf(postPageDTO.postType()), postPageDTO.vehicleBrand(), pageable
                            ).stream().map(this::toPostDTO).collect(Collectors.toList());
                        }
                    } else {
                        findPosts = postRepository.findAllByUserAndPostTypeOrderByModifiedAtDesc(
                                user, PostType.valueOf(postPageDTO.postType()), pageable
                        ).stream().map(this::toPostDTO).collect(Collectors.toList());
                    }
                } else {
                    if (postPageDTO.vehicleBrand() != null) {
                        if (postPageDTO.vehicleModel() != null) {
                            findPosts = postRepository.findAllByUserAndVehicleBrandAndVehicleModelOrderByModifiedAtDesc(
                                    user, postPageDTO.vehicleBrand(), postPageDTO.vehicleModel(), pageable
                            ).stream().map(this::toPostDTO).collect(Collectors.toList());
                        } else {
                            findPosts = postRepository.findAllByUserAndVehicleBrandOrderByModifiedAtDesc(
                                    user, postPageDTO.vehicleBrand(), pageable
                            ).stream().map(this::toPostDTO).collect(Collectors.toList());
                        }
                    } else {
                        findPosts = postRepository.findAllByUserOrderByModifiedAtDesc(
                                user, pageable
                        ).stream().map(this::toPostDTO).collect(Collectors.toList());
                    }
                }
            } else {
                if (postPageDTO.postType() != null) {
                    if (postPageDTO.vehicleBrand() != null) {
                        if (postPageDTO.vehicleModel() != null) {
                            findPosts = postRepository.findAllByPostTypeAndVehicleBrandAndVehicleModelOrderByModifiedAtDesc(
                                    PostType.valueOf(postPageDTO.postType()), postPageDTO.vehicleBrand(), postPageDTO.vehicleModel(), pageable
                            ).stream().map(this::toPostDTO).collect(Collectors.toList());
                        } else {
                            findPosts = postRepository.findAllByPostTypeAndVehicleBrandOrderByModifiedAtDesc(
                                    PostType.valueOf(postPageDTO.postType()), postPageDTO.vehicleBrand(), pageable
                            ).stream().map(this::toPostDTO).collect(Collectors.toList());
                        }
                    } else {
                        findPosts = postRepository.findAllByPostTypeOrderByModifiedAtDesc(
                                PostType.valueOf(postPageDTO.postType()), pageable
                        ).stream().map(this::toPostDTO).collect(Collectors.toList());
                    }
                } else {
                    if (postPageDTO.vehicleBrand() != null) {
                        if (postPageDTO.vehicleModel() != null) {
                            findPosts = postRepository.findAllByVehicleBrandAndVehicleModelOrderByModifiedAtDesc(
                                    postPageDTO.vehicleBrand(), postPageDTO.vehicleModel(), pageable
                            ).stream().map(this::toPostDTO).collect(Collectors.toList());
                        } else {
                            findPosts = postRepository.findAllByVehicleBrandOrderByModifiedAtDesc(
                                    postPageDTO.vehicleBrand(), pageable
                            ).stream().map(this::toPostDTO).collect(Collectors.toList());
                        }
                    } else {
                        findPosts = postRepository.findAll(
                                pageable
                        ).stream().map(this::toPostDTO).collect(Collectors.toList());
                        findPosts.sort(Comparator.comparing(PostDTO::modifiedAt).reversed());
                    }
                }
            }
        }
        if (postPageDTO.sortByAppearanceNumber()) {
            findPosts.sort(Comparator.comparing(PostDTO::appearanceNumber).reversed());
        }
        return findPosts;
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
    public void updatePost(PostFormDTO postFormDTO, List<Image> images, Post post) {
        for (Image currentImage : post.getImages()) {
            boolean remove = true;
            for (Image image : images) {
                if (image.getUrl().equals(currentImage.getUrl())) {
                    remove = false;
                }
            }
            if (remove) {
                imageService.deleteImageById(currentImage.getId());
            }
        }
        post.update(postFormDTO, images);
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

    @Transactional(readOnly = true)
    public Post getPostEntityById(UUID postId) {
        return postRepository.findById(postId).orElseThrow(() -> new NotFoundException(String.format("Post %s not found", postId.toString())));
    }

    @Transactional
    public void deletePostById(UUID postId, UUID userId) throws IOException {
        Optional<Post> post = postRepository.findById(postId);
        if (post.isPresent()) {
            if (post.get().getUser().getId().toString().equals(userId.toString())) {
                appearanceService.deleteAllAppearanceByPostId(postId);
                imageService.removeImages(post.get().getImages().stream().map(Image::getUrl).collect(Collectors.toList()), post.get());
                notificationService.deleteAllNotificationByPostId(postId);
                postRepository.deleteById(postId);
            } else {
                throw new BadRequestException(String.format("User %s isn't owner of %s post", userId.toString(), postId.toString()));
            }
        } else {
            throw new BadRequestException(String.format("Post %s not exist", postId.toString()));
        }
    }

//    private List<Post> sortByAppearanceNumber(List<Post> posts) {
//        return posts.sort(Comparator.comparing(Post::getAppearanceNumber).reversed());
//    }

//    private List<PostDTO> checkUserIdIsCurrentAndFilter(List<Post> posts, PostPageDTO postPageDTO) {
//        if (postPageDTO.userId() != null) {
//            log.info("Get posts for user with id {}", postPageDTO.userId());
//            return posts.stream().filter(post -> post.getUser().getId().toString().equals(postPageDTO.userId())).map(this::toPostDTO).collect(Collectors.toList());
//        } else {
//            return posts.stream().map(this::toPostDTO).collect(Collectors.toList());
//        }
//    }
//
//    private List<PostDTO> checkPostTypeIsCurrentAndFilter(List<PostDTO> posts, PostPageDTO postPageDTO) {
//        if (postPageDTO.postType() != null) {
//            return posts.stream().filter(post -> post.postType().name().equals(postPageDTO.postType())).collect(Collectors.toList());
//        } else {
//            return posts;
//        }
//    }
//
//    private List<PostDTO> checkVehicleFiltersAreCurrentAndFilter(List<PostDTO> posts, PostPageDTO postPageDTO) {
//        if (postPageDTO.vehicleBrand() != null) {
//            List<PostDTO> postsByVehicle = posts.stream().filter(post -> post.vehicleBrand().equals(postPageDTO.vehicleBrand())).toList();
//            if (postPageDTO.vehicleModel() != null) {
//                return postsByVehicle.stream().filter(post -> post.vehicleModel() != null && post.vehicleModel().equals(postPageDTO.vehicleModel())).collect(Collectors.toList());
//            } else {
//                return postsByVehicle;
//            }
//        } else {
//            return posts;
//        }
//    }

    public PostDTO toPostDTO(Post post) {
        List<String> images = new ArrayList<>();
        for (Image image : post.getImages()) {
            images.add(image.getUrl());
        }
        return PostDTO.create(post, images);
    }

}
