package org.ap.automotiveportalbackend.posts;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {
    public List<Post> findByOrderByModifiedAtDesc(Pageable pageable);

    public List<Post> findAllByTitleContainingIgnoreCaseOrderByModifiedAtDesc(String content, Pageable pageable);

    public List<Post> findByOrderByAppearanceNumberDescModifiedAtDesc(Pageable pageable);

    public List<Post> findAllByTitleContainingIgnoreCaseOrderByAppearanceNumberDescModifiedAtDesc(String content, Pageable pageable);
}
