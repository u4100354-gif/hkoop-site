"use client";
export default function ConsultForm() {
  return (
    <form className="consult-form" onSubmit={(e) => e.preventDefault()}>
      <input name="name" autoComplete="name" maxLength={100} placeholder="Ваше имя" aria-label="Имя" />
      <input name="contact" autoComplete="off" maxLength={100} placeholder="Телефон или email" aria-label="Контакт" />
      <textarea name="question" maxLength={2000} placeholder="Вопрос (бесплатная консультация)" rows={4} aria-label="Вопрос" />
      <label className="checkbox">
        <input type="checkbox" required /> Даю согласие на обработку персональных данных для ответа на обращение (оператор — Союз ХКООП)
      </label>
      <div><small>Нажимая «Отправить», вы соглашаетесь с <a href="/policy">политикой конфиденциальности</a>. Демо-форма: данные никуда не отправляются — позвоните 8 (4212) 32-87-18 или напишите ksps-priem@mail.ru.</small></div>
      <button className="btn btn-primary" type="submit">Отправить</button>
    </form>
  );
}
