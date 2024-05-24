package org.ap.automotiveportalbackend.images.service;

import lombok.AllArgsConstructor;
import org.ap.automotiveportalbackend.common.exception.NotFoundException;
import org.ap.automotiveportalbackend.images.Image;
import org.ap.automotiveportalbackend.images.ImageRepository;
import org.ap.automotiveportalbackend.images.dto.ImageDTO;
import org.ap.automotiveportalbackend.posts.Post;
import org.ap.automotiveportalbackend.posts.service.PostService;
import org.springframework.http.MediaType;
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

    public Image createImage(MultipartFile imageFile, UUID postId) {
        UUID imageId = UUID.randomUUID();
        try {
            String imageUrl = saveImageFile(postId.toString(), imageId.toString(), imageFile);
            return new Image(imageUrl, imageId);
        } catch (IOException ex) {
            throw new NotFoundException(String.format("Can't create directory for %s post", postId.toString()));
        }
    }

    public Path createPathToImage(String postId, String imageUrl) {
        return Path.of(uploadDirectory + postId + "/" + imageUrl);
    }

    public MediaType determineFileType(String extension) {
        switch (extension) {
            case "jpg":
            case "jpeg":
                return MediaType.IMAGE_JPEG;
            default:
                return MediaType.IMAGE_PNG;
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
