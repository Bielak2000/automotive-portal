package org.ap.automotiveportalbackend.images;

import jakarta.persistence.Access;
import jakarta.persistence.AccessType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.ap.automotiveportalbackend.common.BaseEntity;
import org.ap.automotiveportalbackend.posts.Post;
import org.ap.automotiveportalbackend.users.User;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.util.UUID;

@Entity
@Getter
@Table(schema = "ap", name = "images")
@Access(AccessType.FIELD)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Where(clause = "deleted = false")
@SQLDelete(sql = "UPDATE ap.images SET deleted = true WHERE id =?")
public class Image extends BaseEntity {
    String url;
    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    public Image(String url, Post post, UUID id) {
        super(id);
        this.url = url;
        this.post = post;
    }
}