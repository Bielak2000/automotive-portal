ALTER TABLE ap.notification drop constraint fk_posts_comments;
ALTER TABLE ap.notification ADD COLUMN userName varchar(255) not null;
ALTER TABLE ap.notification ADD COLUMN userSurname varchar(255) not null;