"use client";
import { useState } from "react";

// Реальная отправка: FormSubmit AJAX → письмо на почту пресс-службы.
// Первый запуск требует одноразовой активации адреса (письмо-подтверждение).
const TO = "u4100354@gmail.com";
const ENDPOINT = `https://formsubmit.co/ajax/${TO}`;

type SubmitState = "idle" | "loading" | "ok" | "error";

export default function ConsultForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [errMsg, setErrMsg] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    // honeypot: скрытое поле, роботы его заполняют
    const honey = (form.elements.namedItem("_honey") as HTMLInputElement | null)?.value ?? "";
    if (!name.trim() || !contact.trim() || msg.trim().length < 5) {
      setErrMsg("Заполните имя, контакт и вопрос (не короче 5 символов).");
      setState("error");
      return;
    }
    setState("loading");
    setErrMsg("");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Заявка с сайта ХКООП — ${name}`.slice(0, 100),
          _template: "table",
          _captcha: "false",
          _honey: honey,
          Имя: name,
          Контакт: contact,
          Вопрос: msg,
          Страница: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json().catch(() => null);
      if (data && String(data.success) === "false") throw new Error(data.message || "Сервис отклонил заявку");
      setState("ok");
    } catch (err) {
      setErrMsg(
        err instanceof Error && err.message
          ? `Не удалось отправить: ${err.message}. Позвоните: 8 (4212) 32-87-18 или напишите на ${TO}.`
          : `Не удалось отправить. Позвоните: 8 (4212) 32-87-18 или напишите на ${TO}.`
      );
      setState("error");
    }
  };

  const reset = () => {
    setName("");
    setContact("");
    setMsg("");
    setState("idle");
    setErrMsg("");
  };

  if (state === "ok") {
    return (
      <div className="form-state form-ok" role="status">
        <span className="fs-icon">✓</span>
        <strong>Заявка отправлена</strong>
        <p>Письмо ушло в аппарат Союза на <b>{TO}</b>. Ответим в рабочее время: Пн–Чт 9:00–18:00, Пт 9:00–16:20.</p>
        <button className="btn btn-ghost" onClick={reset}>Отправить ещё одну</button>
      </div>
    );
  }

  return (
    <form className="consult-form" onSubmit={submit} noValidate>
      <label className="field">
        <span className="field-label">Ваше имя *</span>
        <input name="name" autoComplete="name" maxLength={100} value={name} onChange={(e) => { setName(e.target.value); setState("idle"); }} placeholder="Иван Иванович" aria-label="Ваше имя" required />
      </label>
      <label className="field">
        <span className="field-label">Телефон или email *</span>
        <input name="contact" autoComplete="off" maxLength={100} value={contact} onChange={(e) => { setContact(e.target.value); setState("idle"); }} placeholder="+7 ... или mail@..." aria-label="Телефон или email" required />
      </label>
      <label className="field">
        <span className="field-label">Вопрос *</span>
        <textarea name="question" maxLength={2000} value={msg} onChange={(e) => { setMsg(e.target.value); setState("idle"); }} rows={4} placeholder="Опишите ситуацию — по трудовому праву, охране труда, членству" aria-label="Вопрос" required />
      </label>
      {/* honeypot — скрыт от людей */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
      <label className="checkbox">
        <input type="checkbox" required aria-describedby="consent-desc" />
        <span id="consent-desc">
          Даю согласие Союзу «ХКООП» на обработку моих персональных данных (имя, телефон или e-mail, текст вопроса) —для рассмотрения обращения и подготовки ответа, срок: <b>до 1 года</b> или до отзыва. Заявка передаётся через сервис отправки почты, <a href="/policy">политика</a>.
        </span>
      </label>
      <p className="consent-note">Оператор — Союз «ХКООП», отозвать согласие/удалить данные: ksps-priem@mail.ru.</p>
      {state === "error" && (
        <p className="form-error" role="alert">{errMsg}</p>
      )}
      <button className="btn btn-primary" type="submit" disabled={state === "loading"}>
        {state === "loading" ? "Отправляем…" : "Отправить"}
      </button>
    </form>
  );
}
