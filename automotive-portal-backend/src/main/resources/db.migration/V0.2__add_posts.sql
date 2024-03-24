CREATE TABLE ap.posts
(
    id                uuid PRIMARY KEY,
    created_at        DATE          NOT NULL,
    modified_at       DATE          NOT NULL,
    title             VARCHAR(255)  NOT NULL,
    content           VARCHAR(1000) NOT NULL,
    phone_number      VARCHAR(12),
    appearance_number INTEGER,
    vehicle_id        uuid          NOT NULL,
    user_id           uuid
);