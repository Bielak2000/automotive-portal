package org.ap.automotiveportalbackend.comments.service;

import lombok.AllArgsConstructor;
import org.ap.automotiveportalbackend.comments.Comment;
import org.ap.automotiveportalbackend.comments.CommentRepository;
import org.ap.automotiveportalbackend.comments.dto.CommentFormDTO;
import org.ap.automotiveportalbackend.common.exception.BadRequestException;
import org.ap.automotiveportalbackend.common.exception.NotFoundException;
import org.ap.automotiveportalbackend.posts.Post;
import org.ap.automotiveportalbackend.posts.PostRepository;
import org.ap.automotiveportalbackend.users.User;
import org.ap.automotiveportalbackend.users.UserRepository;
import org.apache.commons.io.FileUtils;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static java.nio.file.Files.readAllBytes;

@AllArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final String uploadDirectory;
    private final String commentsDirectory;

    @Transactional
    public void createComment(CommentFormDTO commentFormDTO, MultipartFile imageFile) throws IOException {
        User user = userRepository.findById(commentFormDTO.userId()).orElseThrow(() -> new NotFoundException(String.format("User %s not found", commentFormDTO.userId())));
        Post post = postRepository.findById(commentFormDTO.postId()).orElseThrow(() -> new NotFoundException(String.format("Post %s not found", commentFormDTO.postId())));
        UUID commentId = UUID.randomUUID();
        String imageUrl = null;
        if (imageFile != null) {
            imageUrl = saveCommentImageFile(post.getId().toString(), commentId.toString(), imageFile);
        }
        Comment comment = new Comment(commentId, commentFormDTO.content(), imageUrl, post, user);
        commentRepository.save(comment);
    }

    @Transactional
    public void deleteCommentById(UUID commentId, UUID userId, UUID postId) throws IOException {
        Optional<Comment> comment = commentRepository.findById(commentId);
        if (comment.isPresent()) {
            if (comment.get().getUser().getId().toString().equals(userId.toString())) {
                deleteCommentImage(postId.toString(), comment.get().getId().toString(), comment.get().getImageUrl());
                commentRepository.deleteById(commentId);
            } else {
                throw new BadRequestException(String.format("User %s isn't owner of %s comment", userId.toString(), commentId.toString()));
            }
        } else {
            throw new BadRequestException(String.format("Comment %s not exist", commentId.toString()));
        }
    }

    @Transactional(readOnly = true)
    public Comment getCommentById(UUID commentId) {
        return commentRepository.findById(commentId).orElseThrow(() -> new NotFoundException(String.format("Comment %s not found", commentId)));
    }

    @Transactional(readOnly = true)
    public byte[] getCommentImage(Comment comment) throws IOException {
        if (comment.getImageUrl() != null) {
            Path path = Path.of(createPathToCommentImage(comment.getPost().getId().toString(), comment.getId().toString(), comment.getImageUrl()));
            return readAllBytes(path);
        } else {
            throw new BadRequestException(String.format("Comment %s doesn't have image", comment.getId()));
        }
    }

    private void deleteCommentImage(String postId, String commentId, String imageUrl) throws IOException {
        File file = new File(createPathToCommentImage(postId, commentId, imageUrl));
        file.delete();
        FileUtils.deleteDirectory(new File(createPathToCommentDirectory(postId, commentId)));
    }

    private String createPathToCommentImage(String postId, String commentId, String imageUrl) {
        return uploadDirectory + postId + "/" + commentsDirectory + commentId + "/" + imageUrl;
    }

    private String createPathToCommentDirectory(String postId, String commentId) {
        return uploadDirectory + postId + "/" + commentsDirectory + commentId;
    }

    private String saveCommentImageFile(String postId, String commentId, MultipartFile imageFile) throws IOException {
        String uniqueFileName = commentId + "_" + imageFile.getOriginalFilename();
        Path uploadPath = Path.of(createPathToCommentDirectory(postId, commentId));
        Path filePath = uploadPath.resolve(uniqueFileName);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return uniqueFileName;
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

}
