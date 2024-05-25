package org.ap.automotiveportalbackend.posts;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {
    public List<Post> findAllByVehicleBrandOrderByCreatedAt(String brand);

    public List<Post> findAllByVehicleModelOrderByCreatedAt(String model);

    public List<Post> findByOrderByCreatedAtDesc(Pageable pageable);

    public List<Post> findAllByTitleContainingOrderByCreatedAtDesc(String content, Pageable pageable);
}
