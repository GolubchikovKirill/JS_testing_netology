import { getCardType, validateLuhn } from "./validate";

function normalizeCardNumber(value) {
  return value.toString().replace(/\D/g, "");
}

function setActiveCard(cardsRoot, cardType) {
  const items = Array.from(cardsRoot.querySelectorAll("[data-card]"));
  for (const el of items) {
    const isActive = el.getAttribute("data-card") === cardType;
    el.classList.toggle("card--active", isActive);
  }
}

function setResult(resultEl, { ok, text }) {
  resultEl.textContent = text;
  resultEl.classList.toggle("result--ok", ok === true);
  resultEl.classList.toggle("result--bad", ok === false);
}

export function bindValidatorDom(rootEl) {
  const cardsRoot = rootEl.querySelector('[data-role="cards"]');
  const form = rootEl.querySelector('[data-role="form"]');
  const input = rootEl.querySelector('[data-role="input"]');
  const result = rootEl.querySelector('[data-role="result"]');

  if (!cardsRoot || !form || !input || !result) {
    throw new Error("Validator DOM: required elements not found");
  }

  const updateCard = () => {
    const digits = normalizeCardNumber(input.value);
    const type = digits.length > 0 ? getCardType(digits) : null;
    setActiveCard(cardsRoot, type);
  };

  input.addEventListener("input", () => {
    updateCard();
    setResult(result, { ok: null, text: "Введите номер карты и нажмите «Проверить»." });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const digits = normalizeCardNumber(input.value);
    const type = digits.length > 0 ? getCardType(digits) : null;
    setActiveCard(cardsRoot, type);

    if (digits.length === 0) {
      setResult(result, { ok: false, text: "Введите номер карты." });
      return;
    }

    const isValid = validateLuhn(digits);
    if (!isValid) {
      setResult(result, { ok: false, text: "Номер карты не прошёл проверку Луна." });
      return;
    }

    const systemText = type ? `Платёжная система: ${type.toUpperCase()}.` : "Платёжная система: неизвестно.";
    setResult(result, { ok: true, text: `Карта валидна. ${systemText}` });
  });

  updateCard();
  setResult(result, { ok: null, text: "Введите номер карты и нажмите «Проверить»." });
}

