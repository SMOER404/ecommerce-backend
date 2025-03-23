-- Создаем пользователя, если он не существует
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'postgres') THEN
      CREATE USER postgres WITH PASSWORD 'postgres';
   END IF;
END
$do$;

-- Даем пользователю права на создание баз данных
ALTER USER postgres CREATEDB;

-- Создаем базу данных, если она не существует
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_database 
      WHERE datname = 'poizon_market') THEN
      CREATE DATABASE poizon_market
          WITH 
          OWNER = postgres
          ENCODING = 'UTF8'
          LC_COLLATE = 'en_US.utf8'
          LC_CTYPE = 'en_US.utf8'
          TEMPLATE template0;
   END IF;
END
$do$; 