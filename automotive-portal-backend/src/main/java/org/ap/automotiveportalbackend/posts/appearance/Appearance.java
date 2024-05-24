package org.ap.automotiveportalbackend.posts.appearance;

import jakarta.persistence.Access;
import jakarta.persistence.AccessType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.ap.automotiveportalbackend.common.BaseEntity;
import org.ap.automotiveportalbackend.images.Image;
import org.ap.automotiveportalbackend.posts.PostType;
import org.ap.automotiveportalbackend.posts.dto.PostFormDTO;
import org.ap.automotiveportalbackend.users.User;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Table(schema = "ap", name = "appearance")
@Access(AccessType.FIELD)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Appearance {

    @Id
    @Column(name = "id")
    private UUID id;
    @Column(name = "appearance_user_id")
    private UUID appearanceUserId;
    @Column(name = "appearance_post_id")
    private UUID appearancePostId;

    public Appearance(UUID userId, UUID postId) {
        this.id = UUID.randomUUID();
        this.appearanceUserId = userId;
        this.appearancePostId = postId;
    }

}
