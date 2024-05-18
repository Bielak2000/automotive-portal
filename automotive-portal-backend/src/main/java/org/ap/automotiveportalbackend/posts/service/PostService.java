package org.ap.automotiveportalbackend.posts.service;

import lombok.AllArgsConstructor;
import org.ap.automotiveportalbackend.posts.Post;
import org.ap.automotiveportalbackend.posts.PostRepository;
import org.ap.automotiveportalbackend.posts.dto.PostDTO;
import org.ap.automotiveportalbackend.posts.dto.PostFormDTO;
import org.ap.automotiveportalbackend.users.User;
import org.ap.automotiveportalbackend.users.UserRepository;
import org.ap.automotiveportalbackend.users.dto.UserDTO;
import org.ap.automotiveportalbackend.users.service.UserService;
import org.ap.automotiveportalbackend.vehicle.dto.VehicleBrandDTO;
import org.ap.automotiveportalbackend.vehicle.dto.VehicleModelDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserService userService;

    @Transactional(readOnly = true)
    public List<PostDTO> getAllPosts() {
        return postRepository.findAll().stream().map(PostDTO::create).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<VehicleBrandDTO> getAllPostVehicleBrands() {
        return postRepository.findAll().stream().map(p -> new VehicleBrandDTO(p.getVehicleBrand())).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<VehicleModelDTO> getAllPostVehicleModels() {
        return postRepository.findAll().stream().map(p -> new VehicleModelDTO(p.getVehicleModel())).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PostDTO> getAllPostsByVehicleBrand(String brand) {
        return postRepository.findAllByVehicleBrandOrderByCreatedAt(brand).stream().map(PostDTO::create).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<PostDTO> getAllPostsByVehicleModel(String model) {
        return postRepository.findAllByVehicleModelOrderByCreatedAt(model).stream().map(PostDTO::create).collect(Collectors.toList());
    }

    @Transactional
    public Post createPost(PostFormDTO postFormDTO, String username) {
        User user = userService.getByUsername(username);
        Post post = new Post(postFormDTO, user);
        postRepository.save(post);
        return post;
    }

}
