# 🎮 Cat Empire Tap - Mini-App

Telegram Mini-App для игры Cat Empire Tap!

## 📁 Файлы

- `index.html` - HTML структура
- `style.css` - CSS стили
- `app.js` - JavaScript логика

## 🚀 Деплой

### Вариант 1: GitHub Pages (бесплатно)

1. Создай репозиторий на GitHub
2. Загрузи папку `webapp` в репозиторий
3. Включи GitHub Pages в настройках репозитория
4. Выбери ветку `main` и папку `/webapp`
5. Скопируй URL: `https://твой-username.github.io/репозиторий/`

### Вариант 2: Vercel (бесплатно)

1. Зайди на [vercel.com](https://vercel.com)
2. Подключи GitHub репозиторий
3. Deploy автоматически
4. Скопируй URL

### Вариант 3: Netlify (бесплатно)

1. Зайди на [netlify.com](https://netlify.com)
2. Drag & drop папку `webapp`
3. Скопируй URL

### Вариант 4: Cloudflare Pages (бесплатно)

1. Зайди на [pages.cloudflare.com](https://pages.cloudflare.com)
2. Подключи GitHub репозиторий
3. Deploy автоматически
4. Скопируй URL

## ⚙️ Настройка бота

После деплоя Mini-App:

1. Скопируй URL где размещен Mini-App
2. Вставь в `.env` файл:
```bash
WEBAPP_URL=https://твой-домен.com/webapp
```

3. Перезапусти бота

4. В боте появится кнопка "🎮 Играть в Mini-App"

## 🔧 Локальная разработка

Для локальной разработки можно использовать:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

Затем открой `http://localhost:8000` в браузере.

## 📱 Тестирование в Telegram

1. Открой бота в Telegram
2. Нажми "🎮 Играть в Mini-App"
3. Mini-App откроется внутри Telegram

## 🎨 Кастомизация

### Изменить цвета

В `style.css` измени переменные:
```css
:root {
    --primary: #FF6B35;      /* Основной цвет */
    --secondary: #4ECDC4;    /* Вторичный цвет */
    --accent: #FFE66D;       /* Акцент */
    --dark: #2C3E50;         /* Тёмный */
}
```

### Добавить улучшения

В `app.js` добавь в массив `UPGRADES`:
```javascript
{
    id: 9,
    name: 'Новое улучшение',
    icon: '⭐',
    category: 'special',
    baseCost: 5000,
    effect: 10,
    maxLevel: 20
}
```

### Добавить главы сюжета

В `app.js` добавь в массив `STORY_CHAPTERS`:
```javascript
{
    chapter: 6,
    title: '🌟 Новая глава',
    scene: 'ASCII арт здесь',
    text: 'Текст главы...',
    requiredTaps: 50000,
    reward: 20000
}
```

## 📊 API бота

Mini-App отправляет данные боту при закрытии через `tg.sendData()`.

Формат данных:
```json
{
    "coins": 12345,
    "totalCoins": 50000,
    "energy": 85,
    "maxEnergy": 150,
    "perTap": 5,
    "passiveIncome": 100,
    "empireLevel": 3,
    "empireTitle": "Кошатник",
    "upgrades": [
        {"id": 1, "level": 10},
        {"id": 4, "level": 5}
    ],
    "storyProgress": 3
}
```

## 🐛 Отладка

Открой консоль браузера (F12) для просмотра логов.

Логи:
- `🐱 Cat Empire Tap загружен!` - приложение загружено
- Ошибки будут показаны красным цветом

## 📝 Лицензия

MIT License