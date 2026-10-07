export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <strong>Контакты</strong>
          <div>ksps-priem@mail.ru</div>
          <div>8 (4212) 32-87-18 · факс: 32-47-02</div>
          <div>Пн-Чт: 9:00–18:00 · Пт: 9:00–16:20</div>
          <div>680000, г. Хабаровск, ул. Муравьева-Амурского, 4</div>
        </div>
        <div>
          <strong>Разделы</strong>
          <div><a href="/news">Новости</a> · <a href="/events">Мероприятия</a></div>
          <div><a href="/organizations">Членские организации</a></div>
          <div><a href="/honor">Книга Почёта</a> · <a href="/partners">Партнёры</a></div>
          <div><a href="/about">О нас</a> · <a href="/activity">Деятельность</a></div>
        </div>
        <div>
          <strong>Мы в соцсетях</strong>
          <div><a href="https://vk.com/habprof_27">VK</a></div>
          <div><a href="https://t.me/habprof">Telegram</a></div>
          <div><a href="https://max.ru/id2702080071_biz">MAX</a></div>
        </div>
      </div>
      <div className="container" style={{ marginTop: 12 }}>
        Союз «Хабаровское краевое объединение организаций профсоюзов» · Локальный прототип
      </div>
    </footer>
  );
}
