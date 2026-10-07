# БД ХКООП (локально)

- Сервер: MariaDB (MySQL-совместимая), `brew services start|stop mariadb`
- База: `hkoop`, кодировка utf8mb4
- phpMyAdmin: http://127.0.0.1:8081/ (запущен через `php -S 127.0.0.1:8081 -t db/phpmyadmin`)
- Файлы: `db/schema.sql`, `db/seed.sql` (сгенерирован из `data/*.json`)

## Доступы (только локально, не коммитить никуда)

- root / RootLocal2026!
- hkoop / HkoopLocal2026! (все права на базу hkoop)

## Таблицы

news(6), documents(6), partners(13), honor(7), events(3), site_settings(11)

## Залить заново

```bash
mysql -u hkoop -p'HkoopLocal2026!' hkoop < db/schema.sql
python3 /tmp/make_seed.py
mysql -u hkoop -p'HkoopLocal2026!' hkoop < db/seed.sql
```

Сайт пока читает `data/*.json`. Переключение Next.js на MySQL — следующий шаг.
