package org.ap.automotiveportalbackend.posts;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {
}