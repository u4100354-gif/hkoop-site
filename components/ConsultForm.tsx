"use client";
export default function ConsultForm() {
  return (
    <form className="consult-form" onSubmit={(e) => e.preventDefault()}>
      <input placeholder="Ваше имя" aria-label="Имя" />
      <input placeholder="Телефон или email" aria-label="Контакт" />
      <textarea placeholder="Вопрос (бесплатная консультация)" rows={4} aria-label="Вопрос" />
      <label className="checkbox">
        <input type="checkbox" required /> Даю согласие на обработку персональных данных
      </label>
      <button className="btn btn-primary" type="submit">Отправить</button>
    </form>
  );
}
