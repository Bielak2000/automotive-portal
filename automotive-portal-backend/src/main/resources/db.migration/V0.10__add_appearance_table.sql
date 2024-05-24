CREATE TABLE ap.appearance
(
    id      uuid PRIMARY KEY,
    appearance_user_id uuid not null,
    appearance_post_id uuid not null
);