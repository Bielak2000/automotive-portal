package org.ap.automotiveportalbackend.users;


import jakarta.persistence.Access;
import jakarta.persistence.AccessType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.ap.automotiveportalbackend.common.BaseEntity;
import org.ap.automotiveportalbackend.posts.Post;
import org.ap.automotiveportalbackend.users.dto.UserFormDTO;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
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
    private LocalDateTime lastActivityAt;
    private String surname;
    private String email;
    @Enumerated(EnumType.STRING)
    private UserRole role;
    private String password;
    private String phoneNumber;
    private Long vehicleId;
    @OneToMany(mappedBy = "user")
    private List<Post> posts;

    public User(UserFormDTO userFormDTO, String password) {
        super(UUID.randomUUID());
        this.lastActivityAt = LocalDateTime.now();
        this.name = userFormDTO.name();
        this.role = UserRole.USER_ROLE;
        this.password = password;
        this.surname = userFormDTO.surname();
        this.email = userFormDTO.email();
        this.phoneNumber = userFormDTO.phoneNumber();
        this.vehicleId = userFormDTO.vehicleId();
        this.posts = new ArrayList<>();
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
