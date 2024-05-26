package org.ap.automotiveportalbackend.users;


import jakarta.persistence.Access;
import jakarta.persistence.AccessType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.ap.automotiveportalbackend.comments.Comment;
import org.ap.automotiveportalbackend.common.BaseEntity;
import org.ap.automotiveportalbackend.notification.Notification;
import org.ap.automotiveportalbackend.posts.Post;
import org.ap.automotiveportalbackend.users.dto.UserFormDTO;
import org.ap.automotiveportalbackend.users.dto.UserUpdateDTO;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Table(schema = "ap", name = "users")
@Access(AccessType.FIELD)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Where(clause = "deleted = false")
@SQLDelete(sql = "UPDATE ap.users SET deleted = true WHERE id =?")
public class User extends BaseEntity {

    private String name;
    @Setter
    private LocalDateTime lastActivityAt;
    private String surname;
    private String email;
    @Enumerated(EnumType.STRING)
    private UserRole role;
    @Setter
    private String password;
    private String phoneNumber;
    private String vehicleBrand;
    private String vehicleModel;
    @OneToMany(mappedBy = "user")
    private List<Post> posts;
    @ManyToMany
    @JoinTable(
            schema = "ap",
            name = "appearance",
            joinColumns = @JoinColumn(name = "appearance_user_id"),
            inverseJoinColumns = @JoinColumn(name = "appearance_post_id"))
    Set<Post> boostedPosts;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Comment> comments;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Notification> notifications;

    public User(UserFormDTO userFormDTO, String password) {
        super(UUID.randomUUID());
        this.lastActivityAt = LocalDateTime.now();
        this.name = userFormDTO.name();
        this.role = UserRole.USER_ROLE;
        this.password = password;
        this.surname = userFormDTO.surname();
        this.email = userFormDTO.email();
        this.phoneNumber = userFormDTO.phoneNumber();
        this.vehicleBrand = userFormDTO.vehicleBrand();
        this.vehicleModel = userFormDTO.vehicleModel();
        this.posts = new ArrayList<>();
        this.boostedPosts = new HashSet<>();
        this.comments = new ArrayList<>();
        this.notifications = new ArrayList<>();
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public void update(UserUpdateDTO userUpdateDTO) {
        this.name = userUpdateDTO.name();
        this.surname = userUpdateDTO.surname();
        this.email = userUpdateDTO.email();
        this.phoneNumber = userUpdateDTO.phoneNumber();
        this.vehicleBrand = userUpdateDTO.vehicleBrand();
        this.vehicleModel = userUpdateDTO.vehicleModel();
    }

}
