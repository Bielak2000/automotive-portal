package org.ap.automotiveportalbackend.comments;

import jakarta.persistence.Access;
import jakarta.persistence.AccessType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.ap.automotiveportalbackend.common.BaseEntity;
import org.ap.automotiveportalbackend.posts.Post;
import org.ap.automotiveportalbackend.users.User;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.util.UUID;

@Entity
@Getter
@Table(schema = "ap", name = "comments")
@Access(AccessType.FIELD)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Where(clause = "deleted = false")
@SQLDelete(sql = "UPDATE ap.comments SET deleted = true WHERE id =?")
public class Comment extends BaseEntity {

    private String content;
    private String imageUrl;
    @Setter
    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;
    @Setter
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Comment(UUID commentId, String content, String imageUrl, Post post, User user) {
        super(commentId);
        this.content = content;
        this.imageUrl = imageUrl;
        this.post = post;
        this.user = user;
    }

}
