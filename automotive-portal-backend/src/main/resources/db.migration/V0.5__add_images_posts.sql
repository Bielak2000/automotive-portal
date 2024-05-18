CREATE TABLE ap.images
(
    id               uuid PRIMARY KEY,
    created_at       DATE         NOT NULL,
    modified_at      Date         NOT NULL,
    deleted          boolean      NOT NULL,
    url              VARCHAR(100) NOT NULL,
    post_id          uuid
);

ALTER TABLE ap.images ADD CONSTRAINT fk_post_image FOREIGN KEY (post_id) REFERENCES ap.posts (id);
ALTER TABLE ap.posts ADD CONSTRAINT fk_user_post FOREIGN KEY (user_id) REFERENCES ap.users (id);