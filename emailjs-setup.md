# Настройка EmailJS для формы обратной связи

## 📧 Получение сообщений на почту

Чтобы получать сообщения с формы "Связаться со мной" на ваш email, выполните следующие шаги:

### 1. Регистрация в EmailJS

1. Перейдите на [emailjs.com](https://www.emailjs.com/)
2. Создайте бесплатный аккаунт
3. Подтвердите email

### 2. Настройка Email Service

1. В панели EmailJS перейдите в раздел **Email Services**
2. Нажмите **Add New Service**
3. Выберите **Gmail** (или другой email провайдер)
4. Подключите ваш Gmail аккаунт (mikoshi365@gmail.com)
5. Скопируйте **Service ID** (например: `service_gmail123`)

### 3. Создание Email Template

1. Перейдите в раздел **Email Templates**
2. Нажмите **Create New Template**
3. Используйте следующий шаблон:

```
Subject: Новое сообщение с сайта-портфолио

От: {{from_name}}
Email: {{from_email}}
Тема: {{subject}}

Сообщение:
{{message}}

---
Отправлено через форму на сайте Микоши Максим
Время: {{reply_to}}
```

4. Скопируйте **Template ID** (например: `template_contact123`)

### 4. Получение Public Key

1. Перейдите в раздел **Account**
2. Скопируйте **Public Key** (например: `user_publickey123`)

### 5. Обновление кода

Откройте файл `script.js` и замените следующие значения:

```javascript
// Строка 83
emailjs.init("YOUR_PUBLIC_KEY"); // Замените на ваш Public Key

// Строки 113-114
'YOUR_SERVICE_ID', // Замените на ваш Service ID
'YOUR_TEMPLATE_ID', // Замените на ваш Template ID
```

### 6. Альтернативный способ - Telegram Bot

Если не хотите использовать EmailJS, можно настроить отправку в Telegram:

1. Создайте бота через [@BotFather](https://t.me/botfather)
2. Получите токен бота
3. Найдите ваш Chat ID через [@userinfobot](https://t.me/userinfobot)
4. Замените функцию отправки в `script.js`

### 7. Тестирование

После настройки:
1. Откройте сайт
2. Заполните форму в разделе "Контакты"
3. Нажмите "Отправить сообщение"
4. Проверьте почту

## 🔧 Готовые настройки

Для быстрой настройки используйте эти значения:

```javascript
// В script.js замените:
emailjs.init("user_abcdefghijk123456789"); // Ваш Public Key
// И в функции отправки:
'service_gmail', // Ваш Service ID
'template_portfolio' // Ваш Template ID
```

## 📱 Уведомления в Telegram (опционально)

Для получения уведомлений в Telegram добавьте этот код:

```javascript
// Дополнительная отправка в Telegram
const telegramToken = 'YOUR_BOT_TOKEN';
const chatId = 'YOUR_CHAT_ID';

fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        chat_id: chatId,
        text: `📨 Новое сообщение с сайта:\n\n👤 От: ${formData.from_name}\n📧 Email: ${formData.from_email}\n📝 Тема: ${formData.subject}\n\n💬 Сообщение:\n${formData.message}`
    })
});
```

## ✅ Проверка настройки

1. Заполните и отправьте тестовое сообщение
2. Проверьте папку "Входящие" в Gmail
3. Если не приходит - проверьте "Спам"
4. В консоли браузера не должно быть ошибок EmailJS

---

**Важно:** Не публикуйте секретные ключи в открытом репозитории! 