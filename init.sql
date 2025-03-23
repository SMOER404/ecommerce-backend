-- Создаем пользователя
CREATE USER poizonmarket_user WITH PASSWORD 'poizonmarket_user';

-- Создаем базу данных
CREATE DATABASE poizon_market;
CREATE DATABASE poizon_market_test;

-- Даем права пользователю на базы данных
GRANT ALL PRIVILEGES ON DATABASE poizon_market TO poizonmarket_user;
GRANT ALL PRIVILEGES ON DATABASE poizon_market_test TO poizonmarket_user;

-- Устанавливаем владельца баз данных
ALTER DATABASE poizon_market OWNER TO poizonmarket_user;
ALTER DATABASE poizon_market_test OWNER TO poizonmarket_user; 