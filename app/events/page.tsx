import PageHero from "../../components/PageHero";
import EventsCalendar, { type CalendarEvent } from "../../components/EventsCalendar";
import { q } from "../../lib/db";

export default async function Events() {
  const events = await q<CalendarEvent>("SELECT id,title,DATE_FORMAT(date,'%Y-%m-%d') AS date,type FROM events ORDER BY date DESC,title");
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
