create user ac with password 'ac';
alter user ac with SUPERUSER;
create database ac owner ac;
\connect ac;
create extension if not exists "uuid-ossp";