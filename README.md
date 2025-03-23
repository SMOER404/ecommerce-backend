# PoizonMarket Backend

Backend API для интернет-магазина PoizonMarket.

## Требования

- Node.js (v14 или выше)
- PostgreSQL (v12 или выше)
- npm или yarn

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/yourusername/poizonmarket.git
cd poizonmarket/server
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте базу данных и пользователя:
```sql
CREATE DATABASE "poizonmarket-db";
CREATE USER "poizonmarket-user" WITH PASSWORD 'poizonmarket-user';
GRANT ALL PRIVILEGES ON DATABASE "poizonmarket-db" TO "poizonmarket-user";
```

4. Создайте файл .env на основе .env.example:
```bash
cp .env.example .env
```

5. Настройте переменные окружения в .env файле.

## Запуск

### Разработка
```bash
npm run start:dev
```

### Продакшн
```bash
npm run build
npm run start:prod
```

## API Документация

После запуска сервера, Swagger документация доступна по адресу:
```
http://localhost:3001/api
```

## Тестирование

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

## Логирование

Логи сохраняются в директории `logs/`:
- `error.log` - логи ошибок
- `combined.log` - все логи

## Безопасность

- Все запросы ограничены rate limiting (10 запросов в минуту)
- Входные данные валидируются
- Используется JWT для аутентификации
- Пароли хешируются с помощью bcrypt 