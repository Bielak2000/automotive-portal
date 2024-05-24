ALTER TABLE ap.appearance ADD FOREIGN KEY (appearance_user_id) REFERENCES ap.users(id);
ALTER TABLE ap.appearance ADD FOREIGN KEY (appearance_post_id) REFERENCES ap.posts(id);