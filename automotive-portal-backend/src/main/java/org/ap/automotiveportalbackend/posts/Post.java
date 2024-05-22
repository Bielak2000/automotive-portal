package org.ap.automotiveportalbackend.posts;

import jakarta.persistence.Access;
import jakarta.persistence.AccessType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.ap.automotiveportalbackend.common.BaseEntity;
import org.ap.automotiveportalbackend.images.Image;
import org.ap.automotiveportalbackend.posts.dto.PostFormDTO;
import org.ap.automotiveportalbackend.users.User;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Table(schema = "ap", name = "posts")
@Access(AccessType.FIELD)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Where(clause = "deleted = false")
@SQLDelete(sql = "UPDATE ap.posts SET deleted = true WHERE id =?")
public class Post extends BaseEntity {

    private String title;
    private String content;
    private int appearance_number;
    private String vehicleBrand;
    private String vehicleModel;
    @Enumerated(EnumType.STRING)
    private PostType postType;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Image> images;

    public Post(PostFormDTO postFormDTO, User user, List<Image> images, UUID postId) {
        super(postId);
        this.images = images;
        this.title = postFormDTO.title();
        this.content = postFormDTO.content();
        this.appearance_number = 0;
        this.postType = postFormDTO.postType();
        this.vehicleBrand = postFormDTO.vehicleBrand();
        this.vehicleModel = postFormDTO.vehicleModel();
        this.user = user;
    }

}
