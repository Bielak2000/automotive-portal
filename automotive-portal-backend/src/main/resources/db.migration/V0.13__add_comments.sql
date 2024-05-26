CREATE TABLE ap.comments
(
    id          uuid PRIMARY KEY,
    created_at  DATE          NOT NULL,
    modified_at DATE          NOT NULL,
    deleted     boolean       NOT NULL,
    content     VARCHAR(1000) NOT NULL,
    image_url   VARCHAR(255),
    post_id     uuid          NOT NULL,
    user_id     uuid,
    constraint fk_posts_comments foreign key (post_id) REFERENCES ap.posts (id),
    constraint fk_users_comments foreign key (user_id)  REFERENCES ap.users (id)
);