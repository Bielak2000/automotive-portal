package org.ap.automotiveportalbackend.images.service;

import lombok.AllArgsConstructor;
import org.ap.automotiveportalbackend.images.Image;
import org.ap.automotiveportalbackend.images.ImageRepository;
import org.ap.automotiveportalbackend.images.dto.ImageDTO;
import org.ap.automotiveportalbackend.posts.Post;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
public class ImageService {

    private final ImageRepository imageRepository;

    @Transactional(readOnly = true)
    public List<ImageDTO> getAllImageByPost(Post post) {
        return imageRepository.findAllByPost(post).stream().map(image -> new ImageDTO(image.getUrl())).collect(Collectors.toList());
    }

    @Transactional
    public void createImage(String imageUrl, Post post) {
        Image image = new Image(imageUrl, post);
        imageRepository.save(image);
    }

}
