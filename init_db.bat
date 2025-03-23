@echo off
echo Перезапускаю службу PostgreSQL...
net stop postgresql-x64-16
net start postgresql-x64-16

echo Устанавливаю пароль для пользователя postgres...
"C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -c "ALTER USER postgres WITH PASSWORD 'postgres';"

echo Создаю базы данных и пользователя...
"C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -f "%~dp0init.sql"

echo Готово!
pause 