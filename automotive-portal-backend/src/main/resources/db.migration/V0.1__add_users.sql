create schema if not exists ap;

CREATE TABLE ap.users
(
    id           uuid PRIMARY KEY,
    created_at   DATE NOT NULL,
    modified_at  DATE NOT NULL,
    name         VARCHAR(100) NOT NULL,
    surname      VARCHAR(100) NOT NULL,
    email        VARCHAR(100) NOT NULL,
    phone_number VARCHAR(12),
    vehicle_id   uuid
);