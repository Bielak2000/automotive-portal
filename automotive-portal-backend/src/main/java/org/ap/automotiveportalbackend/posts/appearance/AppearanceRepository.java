package org.ap.automotiveportalbackend.posts.appearance;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AppearanceRepository extends JpaRepository<Appearance, UUID> {

    public void deleteByAppearanceUserIdAndAppearancePostId(UUID userId, UUID postId);

    public void deleteAllByAppearancePostId(UUID postId);

}
