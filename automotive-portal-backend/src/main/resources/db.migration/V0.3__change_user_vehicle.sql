ALTER TABLE ap.users DROP COLUMN vehicle_id;
ALTER TABLE ap.users ADD COLUMN vehicle_brand varchar(100);
ALTER TABLE ap.users ADD COLUMN vehicle_model varchar(100);