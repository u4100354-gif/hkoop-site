# БД ХКООП (локально)

- Сервер: MariaDB (MySQL-совместимая), `brew services start|stop mariadb`
- База: `hkoop`, кодировка utf8mb4
- phpMyAdmin: http://127.0.0.1:8081/ (запущен через `php -S 127.0.0.1:8081 -t db/phpmyadmin`)
- Файлы: `db/schema.sql`, `db/seed.sql` (сгенерирован из `data/*.json`)

## Доступы (только локально: паролей в файлах нет)

- root / пароль хранится локально в `.env.local` под ключом `ROOT_DB_PASS` (не коммитить и не отправлять в чат)
- hkoop / пароль из `.env.local` (`DB_PASS`), права только SELECT на базу hkoop

## Таблицы

news, documents, partners(13), honor, events(3), site_settings, organizations (после применения `add_organizations.sql`).

## Первичная установка / схема

```bash
mysql -u hkoop -p hkoop < db/schema.sql
python3 /tmp/make_seed.py
mysql -u hkoop -p hkoop < db/seed.sql
```
 (пароль спросит интерактивно; хранить только в `.env.local`). Пользователь `hkoop` не имеет DDL-прав; первичную схему и миграции применяет владелец БД с привилегированным аккаунтом.

## Реестр членских организаций

Один раз из корня репозитория применить `/opt/homebrew/opt/mariadb/bin/mariadb -u root -p hkoop < db/add_organizations.sql` (пароль спросит интерактивно). Страница `/organizations` и раздел админки используют эту таблицу; до миграции публичная страница показывает пустое состояние с контактами аппарата, без выдуманных данных.

## Время мероприятий

Для хранения времени начала и окончания применить `/opt/homebrew/opt/mariadb/bin/mariadb -u root -p hkoop < db/add_event_time.sql` и `/opt/homebrew/opt/mariadb/bin/mariadb -u root -p hkoop < db/add_event_end_time.sql`. У новых и редактируемых событий админка требует подтверждённые начало и окончание по Хабаровску; старые записи остаются без времени, пока оно не будет уточнено.

Next.js и локальная админка читают/обновляют MariaDB через настройки `.env.local`. Секреты в репозиторий не добавлять.
