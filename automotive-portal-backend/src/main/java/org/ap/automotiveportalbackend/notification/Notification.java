package org.ap.automotiveportalbackend.notification;

import jakarta.persistence.Access;
import jakarta.persistence.AccessType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Table(schema = "ap", name = "notification")
@Access(AccessType.FIELD)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Where(clause = "deleted = false")
@SQLDelete(sql = "UPDATE ap.notification SET deleted = true WHERE id =?")
public class Notification {

    @Id
    private UUID id;
    private String content;
    @CreatedDate
    private LocalDateTime createdAt;
    private boolean deleted;
    @Setter
    private boolean read;
    private UUID postId;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Notification(String content, UUID postId, User user) {
        this.id = UUID.randomUUID();
        this.createdAt = LocalDateTime.now();
        this.deleted = false;
        this.content = content;
        this.postId = postId;
        this.user = user;
        this.read = false;
    }

}
