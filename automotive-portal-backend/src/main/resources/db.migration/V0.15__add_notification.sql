CREATE TABLE ap.notification
(
    id         uuid PRIMARY KEY,
    created_at timestamp NOT NULL,
    deleted    boolean   NOT NULL,
    post_id    uuid      NOT NULL,
    user_id    uuid,
    constraint fk_posts_comments foreign key (post_id) REFERENCES ap.posts (id),
    constraint fk_users_comments foreign key (user_id) REFERENCES ap.users (id)
);