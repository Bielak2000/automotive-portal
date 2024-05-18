ALTER TABLE ap.posts DROP COLUMN vehicle_id;
ALTER TABLE ap.posts ADD COLUMN vehicle_brand varchar(100) not null default 'unknown';
ALTER TABLE ap.posts ADD COLUMN vehicle_model varchar(100);