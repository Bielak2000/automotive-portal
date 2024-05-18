package org.ap.automotiveportalbackend.images.service;

import lombok.AllArgsConstructor;
import org.ap.automotiveportalbackend.common.exception.NotFoundException;
import org.ap.automotiveportalbackend.images.Image;
import org.ap.automotiveportalbackend.images.ImageRepository;
import org.ap.automotiveportalbackend.images.dto.ImageDTO;
import org.ap.automotiveportalbackend.posts.Post;
import org.ap.automotiveportalbackend.posts.service.PostService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@AllArgsConstructor
public class ImageService {

    private final String uploadDirectory;
    private final ImageRepository imageRepository;
    private final PostService postService;

    @Transactional(readOnly = true)
    public List<ImageDTO> getAllImageByPost(Post post) {
        return imageRepository.findAllByPost(post).stream().map(image -> new ImageDTO(image.getUrl())).collect(Collectors.toList());
    }

    @Transactional
    public void createImage(MultipartFile imageFile, Post post) {
        UUID imageId = UUID.randomUUID();
        try {
            String imageUrl = saveImageFile(post.getId().toString(), imageId.toString(), imageFile);
            Image image = new Image(imageUrl, post, imageId);
            imageRepository.save(image);
            postService.addImageToPost(post, image);
        } catch (IOException ex) {
            throw new NotFoundException(String.format("Can't create directory for %s post", post.getId().toString()));
        }
    }

    private String saveImageFile(String postId, String imageId, MultipartFile imageFile) throws IOException {
        String uniqueFileName = imageId + "_" + imageFile.getOriginalFilename();

        Path uploadPath = Path.of(uploadDirectory + postId);
        Path filePath = uploadPath.resolve(uniqueFileName);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return uniqueFileName;
    }

}
