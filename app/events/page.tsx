import PageHero from "../../components/PageHero";
import EventsCalendar, { type CalendarEvent } from "../../components/EventsCalendar";
import { q } from "../../lib/db";

async function loadEvents(): Promise<CalendarEvent[]> {
  try {
    return await q<CalendarEvent>("SELECT id,title,DATE_FORMAT(date,'%Y-%m-%d') AS date,TIME_FORMAT(event_time,'%H:%i') AS event_time,TIME_FORMAT(event_end_time,'%H:%i') AS event_end_time,type FROM events ORDER BY date DESC,title");
  } catch (error) {
    // До применения миграции старый локальный экземпляр продолжает показывать календарь без выдуманного времени.
    if ((error as { code?: string })?.code !== "ER_BAD_FIELD_ERROR") throw error;
    try {
      return await q<CalendarEvent>("SELECT id,title,DATE_FORMAT(date,'%Y-%m-%d') AS date,TIME_FORMAT(event_time,'%H:%i') AS event_time,NULL AS event_end_time,type FROM events ORDER BY date DESC,title");
    } catch (legacyError) {
      if ((legacyError as { code?: string })?.code !== "ER_BAD_FIELD_ERROR") throw legacyError;
      return q<CalendarEvent>("SELECT id,title,DATE_FORMAT(date,'%Y-%m-%d') AS date,NULL AS event_time,NULL AS event_end_time,type FROM events ORDER BY date DESC,title");
    }
  }
}

export default async function Events() {
  const events = await loadEvents();
  const initialMonth = events[0]?.date.slice(0, 7) || new Date().toISOString().slice(0, 7);
  return (
    <>
      <PageHero eyebrow="ХКООП · календарь" title="Мероприятия" sub="Анонсы и события: форумы, мониторинги, горячие линии." />
      <section className="section">
        <EventsCalendar items={events} initialMonth={initialMonth} />
      </section>
    </>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Мероприятия — ХКООП",
  description: "Календарь мероприятий и анонсы Хабаровского Профобъединения.",
};
