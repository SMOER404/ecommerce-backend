# Документация API POIZON MARKET

## Содержание
1. [Аутентификация](#1-аутентификация)
2. [Пользователи](#2-пользователи)
3. [Товары](#3-товары)
4. [Корзина](#4-корзина)
5. [Заказы](#5-заказы)
6. [Гайдлайн по использованию API](#6-гайдлайн-по-использованию-api)
7. [Swagger-документация](#7-swagger-документация)

## 1. Аутентификация

### Регистрация
```http
POST /api/auth/register
```

#### Параметры запроса
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "Иван",
  "lastName": "Петров"
}
```

#### Ответ
```json
{
  "accessToken": "jwt_token",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "Иван",
    "lastName": "Петров",
    "role": "USER"
  }
}
```

### Вход
```http
POST /api/auth/login
```

#### Параметры запроса
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Ответ
Аналогичен ответу регистрации.

### Обновление токена
```http
GET /api/auth/refresh
```
> **Примечание:** Требует валидный refresh token в cookie.

### Выход
```http
POST /api/auth/logout
```
> **Примечание:** Требует JWT токен в заголовке Authorization.

## 2. Пользователи

### Получение профиля
```http
GET /api/users/profile
```
> **Примечание:** Требует JWT токен.

### Обновление профиля
```http
PUT /api/users/:id
```
> **Примечание:** Требует JWT токен.

#### Параметры запроса
```json
{
  "firstName": "Новое имя",
  "lastName": "Новая фамилия"
}
```

## 3. Товары

### Получение списка товаров
```http
GET /api/products
```

#### Параметры запроса
| Параметр | Тип | Описание | По умолчанию |
|----------|-----|-----------|--------------|
| page | number | Номер страницы | 1 |
| limit | number | Количество товаров на странице | 10 |
| categoryId | string | Фильтр по категории | - |
| brandId | string | Фильтр по бренду | - |
| minPrice | number | Минимальная цена | - |
| maxPrice | number | Максимальная цена | - |
| search | string | Поиск по названию | - |

#### Ответ
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Название товара",
      "description": "Описание",
      "images": ["url1", "url2"],
      "category": {
        "id": "uuid",
        "name": "Категория"
      },
      "brand": {
        "id": "uuid",
        "name": "Бренд",
        "logoUrl": "url"
      },
      "variants": [
        {
          "id": "uuid",
          "price": 1000,
          "stock": 10
        }
      ]
    }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

### Создание товара
```http
POST /api/products
```
> **Примечание:** Требует JWT токен и роль ADMIN.

#### Параметры запроса
- `name`: название товара
- `description`: описание
- `categoryId`: ID категории
- `brandId`: ID бренда
- `images`: массив файлов изображений
- `variants`: массив вариантов товара

## 4. Корзина

### Получение корзины
```http
GET /api/cart
```
> **Примечание:** Требует JWT токен.

### Добавление товара в корзину
```http
POST /api/cart/items
```
> **Примечание:** Требует JWT токен.

#### Параметры запроса
```json
{
  "variantId": "uuid",
  "quantity": 1
}
```

## 5. Заказы

### Создание заказа
```http
POST /api/orders
```
> **Примечание:** Требует JWT токен.

#### Параметры запроса
```json
{
  "items": [
    {
      "variantId": "uuid",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "address": "Адрес",
    "city": "Город",
    "postalCode": "123456"
  }
}
```

## 6. Гайдлайн по использованию API

### Основные принципы

#### 1. Авторизация
- Используйте JWT токен в заголовке `Authorization: Bearer <token>`
- Refresh token автоматически сохраняется в httpOnly cookie
- Токен обновляется автоматически при истечении срока действия

#### 2. Форматы данных
- Все запросы и ответы в формате JSON
- Даты в формате ISO 8601
- Изображения загружаются через multipart/form-data

#### 3. Обработка ошибок
- Все ошибки возвращают статус код и сообщение
- 400: Неверные параметры запроса
- 401: Не авторизован
- 403: Доступ запрещен
- 404: Ресурс не найден
- 500: Внутренняя ошибка сервера

#### 4. Лимиты запросов
- 100 запросов в минуту для авторизованных пользователей
- 20 запросов в минуту для неавторизованных пользователей

### Примеры использования

#### JavaScript/TypeScript
```typescript
// Авторизация
const login = async (email: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

// Получение товаров
const getProducts = async (params: ProductQueryParams) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`/api/products?${queryString}`);
  return response.json();
};
```

#### Python
```python
import requests

def login(email: str, password: str):
    response = requests.post(
        '/api/auth/login',
        json={'email': email, 'password': password}
    )
    return response.json()

def get_products(params: dict):
    response = requests.get('/api/products', params=params)
    return response.json()
```

### Рекомендации по использованию

#### 1. Кэширование
- Кэшируйте результаты GET-запросов
- Используйте ETag для проверки актуальности данных

#### 2. Обработка ошибок
- Реализуйте retry-механизм для временных ошибок
- Логируйте ошибки для отладки

#### 3. Безопасность
- Храните токены в безопасном месте
- Используйте HTTPS для всех запросов
- Не передавайте чувствительные данные в URL

#### 4. Оптимизация
- Используйте пагинацию для больших списков
- Запрашивайте только нужные поля
- Сжимайте изображения перед загрузкой

## 7. Swagger-документация

### Модели данных

#### User (Пользователь)
```typescript
{
  id: string;          // Уникальный идентификатор
  email: string;       // Email пользователя
  password: string;    // Хеш пароля
  firstName: string;   // Имя
  lastName: string;    // Фамилия
  role: UserRole;      // Роль пользователя (USER/ADMIN)
  createdAt: Date;     // Дата создания
  updatedAt: Date;     // Дата обновления
}
```

#### Product (Товар)
```typescript
{
  id: string;          // Уникальный идентификатор
  name: string;        // Название товара
  description: string; // Описание
  images: string[];    // Массив URL изображений
  categoryId: string;  // ID категории
  brandId: string;     // ID бренда
  category: Category;  // Связанная категория
  brand: Brand;        // Связанный бренд
  variants: ProductVariant[]; // Варианты товара
  createdAt: Date;     // Дата создания
  updatedAt: Date;     // Дата обновления
}
```

#### ProductVariant (Вариант товара)
```typescript
{
  id: string;          // Уникальный идентификатор
  productId: string;   // ID товара
  price: number;       // Цена
  stock: number;       // Количество на складе
  product: Product;    // Связанный товар
  cartItems: CartItem[]; // Позиции в корзине
  orderItems: OrderItem[]; // Позиции в заказах
  createdAt: Date;     // Дата создания
  updatedAt: Date;     // Дата обновления
}
```

#### Category (Категория)
```typescript
{
  id: string;          // Уникальный идентификатор
  name: string;        // Название категории
  products: Product[]; // Товары в категории
  createdAt: Date;     // Дата создания
  updatedAt: Date;     // Дата обновления
}
```

#### Brand (Бренд)
```typescript
{
  id: string;          // Уникальный идентификатор
  name: string;        // Название бренда
  logoUrl: string;     // URL логотипа
  products: Product[]; // Товары бренда
  createdAt: Date;     // Дата создания
  updatedAt: Date;     // Дата обновления
}
```

#### CartItem (Позиция корзины)
```typescript
{
  id: string;          // Уникальный идентификатор
  userId: string;      // ID пользователя
  variantId: string;   // ID варианта товара
  quantity: number;    // Количество
  user: User;          // Связанный пользователь
  variant: ProductVariant; // Связанный вариант товара
  createdAt: Date;     // Дата создания
  updatedAt: Date;     // Дата обновления
}
```

#### Order (Заказ)
```typescript
{
  id: string;          // Уникальный идентификатор
  userId: string;      // ID пользователя
  status: OrderStatus; // Статус заказа
  totalAmount: number; // Общая сумма
  shippingAddress: string; // Адрес доставки
  user: User;          // Связанный пользователь
  items: OrderItem[];  // Позиции заказа
  createdAt: Date;     // Дата создания
  updatedAt: Date;     // Дата обновления
}
```

#### OrderItem (Позиция заказа)
```typescript
{
  id: string;          // Уникальный идентификатор
  orderId: string;     // ID заказа
  variantId: string;   // ID варианта товара
  quantity: number;    // Количество
  price: number;       // Цена на момент заказа
  order: Order;        // Связанный заказ
  variant: ProductVariant; // Связанный вариант товара
  createdAt: Date;     // Дата создания
  updatedAt: Date;     // Дата обновления
}
```

### Перечисления

#### UserRole (Роль пользователя)
```typescript
enum UserRole {
  USER = 'USER',   // Обычный пользователь
  ADMIN = 'ADMIN'  // Администратор
}
```

#### OrderStatus (Статус заказа)
```typescript
enum OrderStatus {
  PENDING = 'PENDING',           // Ожидает обработки
  PROCESSING = 'PROCESSING',     // В обработке
  SHIPPED = 'SHIPPED',          // Отправлен
  DELIVERED = 'DELIVERED',      // Доставлен
  CANCELLED = 'CANCELLED',      // Отменен
  REFUNDED = 'REFUNDED'         // Возвращен
}
```

### DTO (Data Transfer Objects)

#### CreateUserDto
```typescript
{
  email: string;       // Email пользователя
  password: string;    // Пароль
  firstName: string;   // Имя
  lastName: string;    // Фамилия
}
```

#### UpdateUserDto
```typescript
{
  firstName?: string;  // Имя (опционально)
  lastName?: string;   // Фамилия (опционально)
}
```

#### CreateProductDto
```typescript
{
  name: string;        // Название товара
  description: string; // Описание
  categoryId: string;  // ID категории
  brandId: string;     // ID бренда
  images: File[];      // Файлы изображений
  variants: CreateProductVariantDto[]; // Варианты товара
}
```

#### CreateProductVariantDto
```typescript
{
  price: number;       // Цена
  stock: number;       // Количество на складе
}
```

#### CreateOrderDto
```typescript
{
  items: {
    variantId: string; // ID варианта товара
    quantity: number;  // Количество
  }[];
  shippingAddress: {
    address: string;   // Адрес
    city: string;      // Город
    postalCode: string; // Почтовый индекс
  };
}
```

### Ответы API

#### ApiResponse
```typescript
{
  success: boolean;    // Успешность операции
  data?: any;         // Данные ответа (опционально)
  error?: string;     // Сообщение об ошибке (опционально)
}
```

#### PaginatedResponse
```typescript
{
  data: any[];        // Массив данных
  meta: {
    total: number;    // Общее количество
    page: number;     // Текущая страница
    limit: number;    // Количество на странице
    totalPages: number; // Всего страниц
  };
}
```

---

> **Примечание:** Для интерактивной документации API посетите `/api/docs` в вашем браузере. 