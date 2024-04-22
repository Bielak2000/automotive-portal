create schema if not exists ap;

CREATE TABLE ap.users
(
    id               uuid PRIMARY KEY,
    created_at       DATE         NOT NULL,
    modified_at      DATE         NOT NULL,
    last_activity_at DATE         NOT NULL,
    deleted          boolean      NOT NULL,
    role             VARCHAR(100) NOT NULL,
    password         VARCHAR(200) NOT NULL,
    name             VARCHAR(100) NOT NULL,
    surname          VARCHAR(100) NOT NULL,
    email            VARCHAR(100) NOT NULL,
    phone_number     VARCHAR(12),
    vehicle_id       bigint
);