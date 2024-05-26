package org.ap.automotiveportalbackend.comments.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.ap.automotiveportalbackend.comments.Comment;
import org.ap.automotiveportalbackend.comments.dto.CommentFormDTO;
import org.ap.automotiveportalbackend.comments.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.Charset;
import java.util.UUID;

import static org.apache.commons.io.FilenameUtils.getExtension;
import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/api/comments")
@AllArgsConstructor
@Slf4j
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/{commentId}")
    public ResponseEntity<byte[]> getImage(@PathVariable("commentId") String commentId) {
        Comment comment = commentService.getCommentById(UUID.fromString(commentId));
        try {
            log.info("Reading image for comment {}.", commentId);
            String decodedImageUrl = URLDecoder.decode(comment.getImageUrl(), Charset.defaultCharset());
            byte[] bytes = commentService.getCommentImage(comment);
            return ok().contentType(commentService.determineFileType(getExtension(decodedImageUrl)))
                    .body(bytes);
        } catch (IOException e) {
            log.error("Could not find the file on the file system for comment {} with url {}.", commentId, comment.getImageUrl());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void createPost(@RequestPart @Valid CommentFormDTO commentFormDTO,
                           @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        commentService.createComment(commentFormDTO, image);
        log.info("Created new comment with {} images to post {}", image == null ? "0" : "1", commentFormDTO.postId());
    }

    @DeleteMapping("/{userId}/{postId}/{commentId}")
    public void deletePost(@PathVariable("commentId") UUID commentId, @PathVariable("userId") UUID userId, @PathVariable("postId") UUID postId) throws IOException {
        commentService.deleteCommentById(commentId, userId, commentId);
        log.info("Deleted comment {}", commentId.toString());
    }

}
