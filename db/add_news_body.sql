-- Миграция: полный текст новостей со старого сайта.
-- Запуск (нужен root или пользователь с ALTER+UPDATE):
--   mysql -u root -p hkoop < db/add_news_body.sql
-- После перегенерации seed.sql из data/*.json эта колонка обнулится —
-- тексты статей живут в БД, перед reseed делай бэкап (см. ~/site-backups).
ALTER TABLE news ADD COLUMN IF NOT EXISTS body MEDIUMTEXT NULL;
