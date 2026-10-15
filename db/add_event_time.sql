-- Миграция: необязательное локальное время начала мероприятия.
ALTER TABLE events
  ADD COLUMN IF NOT EXISTS event_time TIME NULL DEFAULT NULL AFTER date;
