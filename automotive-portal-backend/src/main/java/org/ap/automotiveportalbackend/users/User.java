package org.ap.automotiveportalbackend.users;


import jakarta.persistence.Access;
import jakarta.persistence.AccessType;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.ap.automotiveportalbackend.common.BaseEntity;
import org.ap.automotiveportalbackend.users.dto.UserDTO;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.time.LocalDateTime;
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
    private String phoneNumber;
    private UUID vehicleId;

    public User(UserDTO userDTO) {
        super(UUID.randomUUID());
        this.lastActivityAt = userDTO.lastActivityAt();
        this.name = userDTO.name();
        this.surname = userDTO.surname();
        this.email = userDTO.email();
        this.phoneNumber = userDTO.phoneNumber();
        this.vehicleId = userDTO.vehicleId();
    }

}
