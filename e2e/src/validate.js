export function validateLuhn(cardNumber) {
  let sum = 0;
  const digits = cardNumber.toString().replace(/\D/g, "");

  for (let i = 0; i < digits.length; i++) {
    let digit = parseInt(digits[i], 10);

    if ((digits.length - i) % 2 === 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }

  return sum > 0 && sum % 10 === 0;
}

function normalizeCardNumber(cardNumber) {
  return cardNumber.toString().replace(/\D/g, "");
}

export function getCardType(cardNumber) {
  const digits = normalizeCardNumber(cardNumber);

  // Visa: 4...
  if (/^4\d{12}(\d{3})?(\d{3})?$/.test(digits)) return "visa";

  // Mastercard: 51–55 или 2221–2720
  if (/^5[1-5]\d{14}$/.test(digits)) return "mastercard";
  if (/^2(2(2[1-9]|[3-9]\d)|[3-6]\d{2}|7(0\d|1\d|20))\d{12}$/.test(digits))
    return "mastercard";

  // Мир: 2200–2204 (по BIN)
  if (/^220[0-4]\d{12,15}$/.test(digits)) return "mir";

  // Остальные (не обязательны для ДЗ, но полезно)
  if (/^3[47]\d{13}$/.test(digits)) return "amex";
  if (/^(6011\d{12}|65\d{14}|64[4-9]\d{13})$/.test(digits)) return "discover";
  if (/^35(2[89]|[3-8]\d)\d{12}$/.test(digits)) return "jcb";

  return null;
}
