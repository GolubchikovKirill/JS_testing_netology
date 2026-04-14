import visaSvg from "./assets/visa.svg";
import mastercardSvg from "./assets/mastercard.svg";
import mirSvg from "./assets/mir.svg";

export function renderValidatorWidget() {
  const root = document.createElement("section");
  root.className = "widget";
  root.innerHTML = `
    <h1 class="widget__title">Credit Card Validator</h1>

    <ul class="cards" data-role="cards" aria-label="Платёжные системы">
      <li class="card" data-card="visa" title="Visa"><img src="${visaSvg}" alt="Visa" /></li>
      <li class="card" data-card="mastercard" title="Mastercard"><img src="${mastercardSvg}" alt="Mastercard" /></li>
      <li class="card" data-card="mir" title="Мир"><img src="${mirSvg}" alt="Mir" /></li>
    </ul>

    <form class="form" data-role="form" novalidate>
      <div class="field">
        <label for="card-input">Номер карты</label>
        <input id="card-input" data-role="input" type="text" inputmode="numeric" autocomplete="cc-number" placeholder="Например: 2200 1234 5678 9012" />
      </div>
      <button type="submit">Проверить</button>
    </form>

    <div class="result" data-role="result" aria-live="polite"></div>
    <div class="hint">Поддерживаются пробелы и дефисы в номере карты.</div>
  `;

  return root;
}

