-- Миграция: необязательное время окончания мероприятия.
ALTER TABLE events
  ADD COLUMN IF NOT EXISTS event_end_time TIME NULL DEFAULT NULL AFTER event_time;
