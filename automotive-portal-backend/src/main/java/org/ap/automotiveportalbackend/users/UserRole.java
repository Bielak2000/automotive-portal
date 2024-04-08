package org.ap.automotiveportalbackend.users;

public enum UserRole {
    USER_ROLE("USER");

    private String role;

    private UserRole(String user) {
        this.role = user;
    }

    public String getRole() {
        return role;
    }
}
