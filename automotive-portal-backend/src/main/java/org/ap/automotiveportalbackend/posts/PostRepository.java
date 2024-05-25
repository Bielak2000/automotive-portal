package org.ap.automotiveportalbackend.posts;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {
    public List<Post> findByOrderByCreatedAtDesc(Pageable pageable);

    public List<Post> findAllByTitleContainingIgnoreCaseOrderByCreatedAtDesc(String content, Pageable pageable);

    public List<Post> findByOrderByAppearanceNumberDescCreatedAtDesc(Pageable pageable);

    public List<Post> findAllByTitleContainingIgnoreCaseOrderByAppearanceNumberDescCreatedAtDesc(String content, Pageable pageable);
}
