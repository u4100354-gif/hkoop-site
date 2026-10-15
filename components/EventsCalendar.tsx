"use client";

import { useMemo, useState } from "react";

export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  event_time?: string | null;
  event_end_time?: string | null;
  type: string;
};

const TYPE_LABELS: Record<string, string> = {
  consultation: "Горячая линия",
  forum: "Форум",
  monitoring: "Мониторинг",
};

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function dateFromIso(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}

function monthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function isoDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function eventCountLabel(count: number) {
  const lastTwo = count % 100;
  const last = count % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return "событий";
  if (last === 1) return "событие";
  if (last >= 2 && last <= 4) return "события";
  return "событий";
}

function labelDate(value: string, options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" }) {
  return new Intl.DateTimeFormat("ru-RU", options).format(dateFromIso(value));
}

function eventTimeLabel(event: CalendarEvent) {
  if (event.event_time && event.event_end_time) return `${event.event_time}–${event.event_end_time} · Хабаровск`;
  if (event.event_time) return `${event.event_time} · Хабаровск`;
  if (event.event_end_time) return `до ${event.event_end_time} · Хабаровск`;
  return "Время не указано";
}

function EventTime({ event }: { event: CalendarEvent }) {
  return event.event_time || event.event_end_time
    ? <time className="events-item-time" dateTime={event.event_time ? `${event.date}T${event.event_time}` : undefined}>{eventTimeLabel(event)}</time>
    : <span className="events-item-time">{eventTimeLabel(event)}</span>;
}

export default function EventsCalendar({ items, initialMonth }: { items: CalendarEvent[]; initialMonth: string }) {
  const sortedItems = useMemo(() => [...items].sort((a, b) =>
    b.date.localeCompare(a.date) || (a.event_time || "99:99").localeCompare(b.event_time || "99:99")
  ), [items]);
  const [month, setMonth] = useState(() => sortedItems[0]?.date.slice(0, 7) || initialMonth);
  const [selectedDate, setSelectedDate] = useState(() => sortedItems[0]?.date || `${initialMonth}-01`);
  const [type, setType] = useState("all");
  const [view, setView] = useState<"calendar" | "list">("calendar");

  const [year, monthNumber] = month.split("-").map(Number);
  const monthIndex = monthNumber - 1;
  const monthDate = new Date(year, monthIndex, 1, 12);
  const monthLabel = new Intl.DateTimeFormat("ru-RU", { month: "long", year: "numeric" }).format(monthDate);
  const availableTypes = [...new Set(sortedItems.map((event) => event.type))].sort((a, b) => (TYPE_LABELS[a] || a).localeCompare(TYPE_LABELS[b] || b, "ru"));
  const filteredItems = sortedItems.filter((event) => type === "all" || event.type === type);
  const monthEvents = filteredItems.filter((event) => event.date.startsWith(month));
  const selectedEvents = filteredItems.filter((event) => event.date === selectedDate);

  const firstWeekday = (new Date(year, monthIndex, 1, 12).getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0, 12).getDate();
  const cells: Array<{ date: string; day: number } | null> = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => ({ date: isoDate(year, monthIndex, i + 1), day: i + 1 })),
  ];
  while (cells.length % 7) cells.push(null);

  const shiftMonth = (amount: number) => {
    const next = new Date(year, monthIndex + amount, 1, 12);
    const key = monthKey(next);
    setMonth(key);
    setSelectedDate(`${key}-01`);
  };

  return (
    <div className="events-calendar">
      <div className="events-toolbar">
        <div className="events-month-nav" aria-label="Переключение месяца">
          <button type="button" className="events-icon-btn" onClick={() => shiftMonth(-1)} aria-label="Предыдущий месяц">←</button>
          <h2>{monthLabel}</h2>
          <button type="button" className="events-icon-btn" onClick={() => shiftMonth(1)} aria-label="Следующий месяц">→</button>
        </div>
        <label className="events-filter">Тип события
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">Все типы</option>
            {availableTypes.map((value) => <option key={value} value={value}>{TYPE_LABELS[value] || value}</option>)}
          </select>
        </label>
        <div className="events-view-toggle" role="group" aria-label="Вид календаря">
          <button type="button" aria-pressed={view === "calendar"} className={view === "calendar" ? "active" : ""} onClick={() => setView("calendar")}>Календарь</button>
          <button type="button" aria-pressed={view === "list"} className={view === "list" ? "active" : ""} onClick={() => setView("list")}>Список</button>
        </div>
      </div>

      <p className="events-result" aria-live="polite">{monthEvents.length ? `В ${monthLabel} — ${monthEvents.length} ${eventCountLabel(monthEvents.length)}` : `В ${monthLabel} событий нет`}</p>

      {view === "calendar" ? (
        <div className="events-layout">
          <div className="events-calendar-panel">
            <div className="events-weekdays" aria-hidden="true">{WEEKDAYS.map((day) => <span key={day}>{day}</span>)}</div>
            <div className="events-days">
              {cells.map((cell, index) => {
                if (!cell) return <span className="events-day events-day-empty" key={`empty-${index}`} aria-hidden="true" />;
                const dayEvents = monthEvents.filter((event) => event.date === cell.date);
                const selected = selectedDate === cell.date;
                const accessibleLabel = `${cell.day} ${labelDate(cell.date, { month: "long" })}${dayEvents.length ? ` — ${dayEvents.map((event) => `${event.event_time || event.event_end_time ? `${eventTimeLabel(event)}, ` : ""}${event.title}`).join("; ")}` : " — событий нет"}`;
                return (
                  <button type="button" key={cell.date} className={`events-day${selected ? " selected" : ""}${dayEvents.length ? " has-events" : ""}`} aria-label={accessibleLabel} aria-pressed={selected} onClick={() => setSelectedDate(cell.date)}>
                    <span className="events-day-number">{cell.day}</span>
                    {dayEvents.length > 0 && <span className="events-day-count">{dayEvents.length} {eventCountLabel(dayEvents.length)}</span>}
                    {dayEvents.length > 0 && <span className="events-day-dot" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          </div>

          <section className="events-agenda" aria-labelledby="events-agenda-title">
            <div className="events-agenda-head">
              <div>
                <p className="events-kicker">Выбранная дата</p>
                <h2 id="events-agenda-title">{labelDate(selectedDate, { day: "numeric", month: "long", year: "numeric" })}</h2>
              </div>
              <span className="events-agenda-count">{selectedEvents.length}</span>
            </div>
            {selectedEvents.length ? selectedEvents.map((event) => (
              <article className="events-item" key={event.id}>
                <div className="events-item-meta"><span className="events-item-type">{TYPE_LABELS[event.type] || event.type}</span><EventTime event={event} /></div>
                <h3>{event.title}</h3>
              </article>
            )) : <div className="events-empty-day"><strong>Событий нет</strong><p>На выбранную дату мероприятий не запланировано.</p></div>}
          </section>
        </div>
      ) : (
        <section className="events-list" aria-label={`События за ${monthLabel}`}>
          {monthEvents.length ? monthEvents.map((event) => (
            <article className="events-list-item" key={event.id}>
              <div className="events-list-date"><strong>{dateFromIso(event.date).getDate()}</strong><span>{labelDate(event.date, { month: "short" })}</span></div>
              <div className="events-list-content"><div className="events-item-meta"><span className="events-item-type">{TYPE_LABELS[event.type] || event.type}</span><EventTime event={event} /></div><h2>{event.title}</h2></div>
              <button type="button" className="events-select-link" onClick={() => { setSelectedDate(event.date); setView("calendar"); }}>В календаре →</button>
            </article>
          )) : <div className="events-empty-day"><strong>В этом месяце событий нет</strong><p>Перейдите к другому месяцу или измените фильтр.</p></div>}
        </section>
      )}

      {sortedItems.length === 0 && <p className="events-empty-state">Анонсов пока нет. Новые мероприятия появятся здесь после публикации.</p>}
    </div>
  );
}
