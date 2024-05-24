package org.ap.automotiveportalbackend.posts.appearance.service;

import lombok.AllArgsConstructor;
import org.ap.automotiveportalbackend.posts.appearance.Appearance;
import org.ap.automotiveportalbackend.posts.appearance.AppearanceRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@AllArgsConstructor
public class AppearanceService {

    private final AppearanceRepository appearanceRepository;

    @Transactional
    public void createAppearancePost(UUID userId, UUID postId) {
        appearanceRepository.save(new Appearance(userId, postId));
    }

    @Transactional
    public void deleteAppearancePost(UUID userId, UUID postId) {
        appearanceRepository.deleteByAppearanceUserIdAndAppearancePostId(userId, postId);
    }
}
