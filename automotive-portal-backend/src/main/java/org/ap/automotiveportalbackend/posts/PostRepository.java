package org.ap.automotiveportalbackend.posts;

import org.ap.automotiveportalbackend.users.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {
//    public List<Post> findByOrderByModifiedAtDesc(Pageable pageable);
//
//    public List<Post> findAllByTitleContainingIgnoreCaseOrderByModifiedAtDesc(String content, Pageable pageable);
//
//    public List<Post> findByOrderByAppearanceNumberDescModifiedAtDesc(Pageable pageable);
//
//    public List<Post> findAllByTitleContainingIgnoreCaseOrderByAppearanceNumberDescModifiedAtDesc(String content, Pageable pageable);

    public List<Post> findAllByOrderByModifiedAtDesc(Pageable pageable);

    public List<Post> findAllByOrderByAppearanceNumberDescModifiedAtDesc(Pageable pageable);

    public List<Post> findAllByUserAndTitleContainingIgnoreCaseAndPostTypeAndVehicleBrandAndVehicleModelOrderByModifiedAtDesc(
            User user, String title, PostType postType, String vehicleBrand, String vehicleModel, Pageable pageable
    );

    public List<Post> findAllByUserAndTitleContainingIgnoreCaseAndPostTypeAndVehicleBrandAndVehicleModelOrderByAppearanceNumberDescModifiedAtDesc(
            User user, String title, PostType postType, String vehicleBrand, String vehicleModel, Pageable pageable
    );

    public List<Post> findAllByUserAndTitleContainingIgnoreCaseAndPostTypeAndVehicleBrandOrderByModifiedAtDesc(
            User user, String title, PostType postType, String vehicleBrand, Pageable pageable
    );

    public List<Post> findAllByUserAndTitleContainingIgnoreCaseAndPostTypeAndVehicleBrandOrderByAppearanceNumberDescModifiedAtDesc(
            User user, String title, PostType postType, String vehicleBrand, Pageable pageable
    );

    public List<Post> findAllByUserAndTitleContainingIgnoreCaseAndPostTypeOrderByModifiedAtDesc(
            User user, String title, PostType postType, Pageable pageable
    );

    public List<Post> findAllByUserAndTitleContainingIgnoreCaseAndPostTypeOrderByAppearanceNumberDescModifiedAtDesc(
            User user, String title, PostType postType, Pageable pageable
    );

    public List<Post> findAllByUserAndTitleContainingIgnoreCaseAndVehicleBrandAndVehicleModelOrderByModifiedAtDesc(
            User user, String title, String vehicleBrand, String vehicleModel, Pageable pageable
    );

    public List<Post> findAllByUserAndTitleContainingIgnoreCaseAndVehicleBrandAndVehicleModelOrderByAppearanceNumberDescModifiedAtDesc(
            User user, String title, String vehicleBrand, String vehicleModel, Pageable pageable
    );

    public List<Post> findAllByUserAndTitleContainingIgnoreCaseAndVehicleBrandOrderByModifiedAtDesc(
            User user, String title, String vehicleBrand, Pageable pageable
    );

    public List<Post> findAllByUserAndTitleContainingIgnoreCaseAndVehicleBrandOrderByAppearanceNumberDescModifiedAtDesc(
            User user, String title, String vehicleBrand, Pageable pageable
    );

    public List<Post> findAllByUserAndTitleContainingIgnoreCaseOrderByModifiedAtDesc(
            User user, String title, Pageable pageable
    );

    public List<Post> findAllByUserAndTitleContainingIgnoreCaseOrderByAppearanceNumberDescModifiedAtDesc(
            User user, String title, Pageable pageable
    );

    // user id null
    public List<Post> findAllByTitleContainingIgnoreCaseAndPostTypeAndVehicleBrandAndVehicleModelOrderByModifiedAtDesc(
            String title, PostType postType, String vehicleBrand, String vehicleModel, Pageable pageable
    );

    public List<Post> findAllByTitleContainingIgnoreCaseAndPostTypeAndVehicleBrandAndVehicleModelOrderByAppearanceNumberDescModifiedAtDesc(
            String title, PostType postType, String vehicleBrand, String vehicleModel, Pageable pageable
    );

    public List<Post> findAllByTitleContainingIgnoreCaseAndPostTypeAndVehicleBrandOrderByModifiedAtDesc(
            String title, PostType postType, String vehicleBrand, Pageable pageable
    );

    public List<Post> findAllByTitleContainingIgnoreCaseAndPostTypeAndVehicleBrandOrderByAppearanceNumberDescModifiedAtDesc(
            String title, PostType postType, String vehicleBrand, Pageable pageable
    );

    public List<Post> findAllByTitleContainingIgnoreCaseAndPostTypeOrderByModifiedAtDesc(
            String title, PostType postType, Pageable pageable
    );

    public List<Post> findAllByTitleContainingIgnoreCaseAndPostTypeOrderByAppearanceNumberDescModifiedAtDesc(
            String title, PostType postType, Pageable pageable
    );

    public List<Post> findAllByTitleContainingIgnoreCaseAndVehicleBrandAndVehicleModelOrderByModifiedAtDesc(
            String title, String vehicleBrand, String vehicleModel, Pageable pageable
    );

    public List<Post> findAllByTitleContainingIgnoreCaseAndVehicleBrandAndVehicleModelOrderByAppearanceNumberDescModifiedAtDesc(
            String title, String vehicleBrand, String vehicleModel, Pageable pageable
    );

    public List<Post> findAllByTitleContainingIgnoreCaseAndVehicleBrandOrderByModifiedAtDesc(
            String title, String vehicleBrand, Pageable pageable
    );

    public List<Post> findAllByTitleContainingIgnoreCaseAndVehicleBrandOrderByAppearanceNumberDescModifiedAtDesc(
            String title, String vehicleBrand, Pageable pageable
    );

    public List<Post> findAllByTitleContainingIgnoreCaseOrderByModifiedAtDesc(
            String title, Pageable pageable
    );

    public List<Post> findAllByTitleContainingIgnoreCaseOrderByAppearanceNumberDescModifiedAtDesc(
            String title, Pageable pageable
    );

    // title null

    public List<Post> findAllByUserAndPostTypeAndVehicleBrandAndVehicleModelOrderByModifiedAtDesc(
            User user, PostType postType, String vehicleBrand, String vehicleModel, Pageable pageable
    );

    public List<Post> findAllByUserAndPostTypeAndVehicleBrandAndVehicleModelOrderByAppearanceNumberDescModifiedAtDesc(
            User user, PostType postType, String vehicleBrand, String vehicleModel, Pageable pageable
    );

    public List<Post> findAllByUserAndPostTypeAndVehicleBrandOrderByModifiedAtDesc(
            User user, PostType postType, String vehicleBrand, Pageable pageable
    );

    public List<Post> findAllByUserAndPostTypeAndVehicleBrandOrderByAppearanceNumberDescModifiedAtDesc(
            User user, PostType postType, String vehicleBrand, Pageable pageable
    );

    public List<Post> findAllByUserAndPostTypeOrderByModifiedAtDesc(
            User user, PostType postType, Pageable pageable
    );

    public List<Post> findAllByUserAndPostTypeOrderByAppearanceNumberDescModifiedAtDesc(
            User user, PostType postType, Pageable pageable
    );

    public List<Post> findAllByUserAndVehicleBrandAndVehicleModelOrderByModifiedAtDesc(
            User user, String vehicleBrand, String vehicleModel, Pageable pageable
    );

    public List<Post> findAllByUserAndVehicleBrandAndVehicleModelOrderByAppearanceNumberDescModifiedAtDesc(
            User user, String vehicleBrand, String vehicleModel, Pageable pageable
    );

    public List<Post> findAllByUserAndVehicleBrandOrderByModifiedAtDesc(
            User user, String vehicleBrand, Pageable pageable
    );

    public List<Post> findAllByUserAndVehicleBrandOrderByAppearanceNumberDescModifiedAtDesc(
            User user, String vehicleBrand, Pageable pageable
    );

    public List<Post> findAllByUserOrderByModifiedAtDesc(
            User user, Pageable pageable
    );

    public List<Post> findAllByUserOrderByAppearanceNumberDescModifiedAtDesc(
            User user, Pageable pageable
    );

    // user id null
    public List<Post> findAllByPostTypeAndVehicleBrandAndVehicleModelOrderByModifiedAtDesc(
            PostType postType, String vehicleBrand, String vehicleModel, Pageable pageable
    );

    public List<Post> findAllByPostTypeAndVehicleBrandAndVehicleModelOrderByAppearanceNumberDescModifiedAtDesc(
            PostType postType, String vehicleBrand, String vehicleModel, Pageable pageable
    );

    public List<Post> findAllByPostTypeAndVehicleBrandOrderByModifiedAtDesc(
            PostType postType, String vehicleBrand, Pageable pageable
    );

    public List<Post> findAllByPostTypeAndVehicleBrandOrderByAppearanceNumberDescModifiedAtDesc(
            PostType postType, String vehicleBrand, Pageable pageable
    );

    public List<Post> findAllByPostTypeOrderByModifiedAtDesc(
            PostType postType, Pageable pageable
    );

    public List<Post> findAllByPostTypeOrderByAppearanceNumberDescModifiedAtDesc(
            PostType postType, Pageable pageable
    );

    public List<Post> findAllByVehicleBrandAndVehicleModelOrderByModifiedAtDesc(
            String vehicleBrand, String vehicleModel, Pageable pageable
    );

    public List<Post> findAllByVehicleBrandAndVehicleModelOrderByAppearanceNumberDescModifiedAtDesc(
            String vehicleBrand, String vehicleModel, Pageable pageable
    );

    public List<Post> findAllByVehicleBrandOrderByModifiedAtDesc(
            String vehicleBrand, Pageable pageable
    );

    public List<Post> findAllByVehicleBrandOrderByAppearanceNumberDescModifiedAtDesc(
            String vehicleBrand, Pageable pageable
    );

}
