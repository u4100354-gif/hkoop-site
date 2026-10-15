-- Миграция: каталог членских организаций и координационных советов (15.10.2026)
-- Карточка на сайте: название → председатель → телефон → email → адрес.
-- Фильтры страницы /organizations: district (район/муниципалитет) и sphere (сфера/отрасль).
CREATE TABLE IF NOT EXISTS organizations (
  id VARCHAR(128) PRIMARY KEY,
  name VARCHAR(300) NOT NULL,
  kind VARCHAR(32) NOT NULL DEFAULT 'org',      -- org = членская организация, council = координационный совет
  district VARCHAR(128) NOT NULL DEFAULT '',    -- район/муниципалитет
  sphere VARCHAR(128) NOT NULL DEFAULT '',      -- сфера/отрасль
  chair VARCHAR(255) NOT NULL DEFAULT '',       -- председатель
  phone VARCHAR(64) NOT NULL DEFAULT '',
  email VARCHAR(255) NOT NULL DEFAULT '',
  address VARCHAR(300) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
