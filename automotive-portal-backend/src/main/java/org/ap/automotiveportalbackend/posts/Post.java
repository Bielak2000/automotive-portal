package org.ap.automotiveportalbackend.posts;

import jakarta.persistence.Access;
import jakarta.persistence.AccessType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.ap.automotiveportalbackend.common.BaseEntity;
import org.ap.automotiveportalbackend.images.Image;
import org.ap.automotiveportalbackend.posts.dto.PostFormDTO;
import org.ap.automotiveportalbackend.users.User;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.util.ArrayList;
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
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @OneToMany(mappedBy = "post")
    private List<Image> images;

    public Post(PostFormDTO postFormDTO, User user) {
        super(UUID.randomUUID());
        this.images = new ArrayList<>();
        this.title = postFormDTO.title();
        this.content = postFormDTO.content();
        this.appearance_number = 0;
        this.vehicleBrand = postFormDTO.vehicleBrand();
        this.vehicleModel = postFormDTO.vehicleModel();
        this.user = user;
    }

}
