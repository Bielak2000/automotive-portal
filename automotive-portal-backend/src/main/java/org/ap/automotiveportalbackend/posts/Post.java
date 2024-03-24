package org.ap.automotiveportalbackend.posts;

import jakarta.persistence.Access;
import jakarta.persistence.AccessType;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.ap.automotiveportalbackend.common.BaseEntity;
import org.ap.automotiveportalbackend.posts.dto.PostDTO;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

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
    private UUID vehicleId;
    private UUID userId;

    public Post(PostDTO postDTO) {
        super(UUID.randomUUID());
        this.title = postDTO.title();
        this.content = postDTO.content();
        this.appearance_number = 0;
        this.vehicleId = postDTO.vehicleId();
        this.userId = postDTO.userId();
    }

}
