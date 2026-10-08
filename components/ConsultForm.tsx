"use client";
import { useState } from "react";

const TO = "u4100354@gmail.com";

export default function ConsultForm() {
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [msg, setMsg] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim() || msg.trim().length < 5) {
      setState("error");
      return;
    }
    setState("loading");
    const body = `Имя: ${name}\nКонтакт: ${contact}\n\nВопрос:\n${msg}`;
    const url = `mailto:${TO}?subject=${encodeURIComponent("Заявка с сайта ХКООП")}&body=${encodeURIComponent(body)}`;
    // Открываем почтовый клиент и показываем успех
    window.setTimeout(() => {
      window.location.href = url;
      setState("ok");
    }, 400);
  };

  const reset = () => {
    setName("");
    setContact("");
    setMsg("");
    setState("idle");
  };

  if (state === "ok") {
    return (
      <div className="form-state form-ok" role="status">
        <span className="fs-icon">✓</span>
        <strong>Заявка сформирована</strong>
        <p>Открылся почтовый клиент — отправьте письмо на <b>{TO}</b>. Мы ответим в рабочее время: Пн–Чт 9:00–18:00, Пт 9:00–16:20.</p>
        <button className="btn btn-ghost" onClick={reset}>Отправить ещё одну</button>
      </div>
    );
  }

  return (
    <form className="consult-form" onSubmit={submit} noValidate>
      <label className="field">
        <span className="field-label">Ваше имя *</span>
        <input value={name} onChange={(e) => { setName(e.target.value); setState("idle"); }} placeholder="Иван Иванович" aria-label="Ваше имя" required />
      </label>
      <label className="field">
        <span className="field-label">Телефон или email *</span>
        <input value={contact} onChange={(e) => { setContact(e.target.value); setState("idle"); }} placeholder="+7 ... или mail@..." aria-label="Телефон или email" required />
      </label>
      <label className="field">
        <span className="field-label">Вопрос *</span>
        <textarea value={msg} onChange={(e) => { setMsg(e.target.value); setState("idle"); }} rows={4} placeholder="Опишите ситуацию — по трудовому праву, охране труда, членству" aria-label="Вопрос" required />
      </label>
      <label className="checkbox">
        <input type="checkbox" required /> Даю согласие на обработку персональных данных
      </label>
      {state === "error" && (
        <p className="form-error" role="alert">Заполните имя, контакт и вопрос (не короче 5 символов).</p>
      )}
      <button className="btn btn-primary" type="submit" disabled={state === "loading"}>
        {state === "loading" ? "Отправляем…" : "Отправить"}
      </button>
    </form>
  );
}
