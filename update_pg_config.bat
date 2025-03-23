@echo off
echo Копирую файл конфигурации...
copy /Y "%~dp0pg_hba.conf" "C:\Program Files\PostgreSQL\16\data\pg_hba.conf"

echo Перезапускаю PostgreSQL...
net stop postgresql-x64-16
net start postgresql-x64-16

echo Готово!
pause 