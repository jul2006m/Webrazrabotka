# FanFic World 📚

Платформа для чтения и публикации фанфиков с системой авторизации через Supabase.

## 🚀 Возможности

- 📖 Чтение фанфиков с навигацией по главам
- ✍️ Создание и редактирование своих работ (черновики)
- 💬 Комментарии и отзывы (требуется авторизация)
- ❤️ Лайки (требуется авторизация)
- 📊 Голосование за любимых персонажей (требуется авторизация)
- 🌙/☀️ Переключение тёмной/светлой темы
- 💬 Форма обратной связи (встроенная Google Form)

## 🔐 Авторизация

Приложение поддерживает два режима:

### Демо-режим (по умолчанию)
- Работает без настройки Supabase
- Данные хранятся локально в браузере
- Доступна кнопка "Войти как гость"
- Подходит для демонстрации и тестирования

### Supabase (продакшн)
- Полноценная база данных
- Регистрация по email/паролю
- Данные синхронизируются между устройствами
- Безопасное хранение через Row Level Security

## 🛠️ Настройка Supabase

### 1. Создайте проект в Supabase
1. Зарегистрируйтесь на [supabase.com](https://supabase.com)
2. Создайте новый проект
3. Перейдите в **Settings → API**
4. Скопируйте **Project URL** и **anon/public key**

### 2. Настройте переменные окружения
Создайте файл `.env` в корне проекта:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Создайте таблицы в базе данных
Перейдите в **SQL Editor** в панели Supabase и выполните следующий SQL:

```sql
-- Таблица профилей пользователей
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица лайков
CREATE TABLE likes (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  fic_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, fic_id)
);

-- Таблица отзывов
CREATE TABLE reviews (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  fic_id INTEGER NOT NULL,
  author TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица голосов в опросах
CREATE TABLE poll_votes (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  fic_id INTEGER NOT NULL,
  character_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, fic_id)
);

-- Включить RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE poll_votes ENABLE ROW LEVEL SECURITY;

-- Политики RLS
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Likes are viewable by everyone"
  ON likes FOR SELECT USING (true);

CREATE POLICY "Users can insert own likes"
  ON likes FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own likes"
  ON likes FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT USING (true);

CREATE POLICY "Users can insert own reviews"
  ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Poll votes are viewable by everyone"
  ON poll_votes FOR SELECT USING (true);

CREATE POLICY "Users can insert own votes"
  ON poll_votes FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Триггер для автоматического создания профиля при регистрации
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 4. Запустите приложение
```bash
npm install
npm run dev
```

## 📁 Структура проекта

```
src/
├── components/          # React компоненты
│   ├── Header.tsx       # Шапка с навигацией и авторизацией
│   ├── Hero.tsx         # Главный баннер
│   ├── Catalog.tsx      # Каталог фанфиков
│   ├── FicCard.tsx      # Карточка фанфика
│   ├── FanficReader.tsx # Чтение фанфика с главами
│   ├── AddFanficForm.tsx # Форма создания/редактирования
│   ├── AuthModal.tsx    # Модальное окно авторизации
│   ├── FeedbackModal.tsx # Форма обратной связи
│   └── ...
├── contexts/            # React контексты
│   ├── AuthContext.tsx  # Авторизация
│   ├── FanFicsContext.tsx # Данные фанфиков
│   └── ThemeContext.tsx # Тема оформления
├── lib/
│   └── supabase.ts     # Клиент Supabase + SQL схема
└── App.tsx             # Главный компонент
```

## 🔒 Безопасность

- Row Level Security (RLS) защищает данные пользователей
- Каждый пользователь может управлять только своими данными
- Анонимный доступ только для чтения

## 🎨 Технологии

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Supabase (PostgreSQL + Auth)
- Google Forms (обратная связь)

## 📝 Лицензия

MIT
