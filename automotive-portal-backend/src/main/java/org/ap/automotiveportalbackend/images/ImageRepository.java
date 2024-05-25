package org.ap.automotiveportalbackend.images;

import org.ap.automotiveportalbackend.posts.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ImageRepository extends JpaRepository<Image, UUID> {
    public List<Image> findAllByPost(Post post);
    public void deleteAllByPost(Post post);
}
