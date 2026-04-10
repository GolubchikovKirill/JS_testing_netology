export function validateLuhn(cardNumber) {
  let sum = 0;
  const digits = cardNumber.toString().replace(/\D/g, "");
  if (digits.length === 0) return false;

  for (let i = 0; i < digits.length; i++) {
    let digit = parseInt(digits[i], 10);
    if ((digits.length - i) % 2 === 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

function normalizeCardNumber(cardNumber) {
  return cardNumber.toString().replace(/\D/g, "");
}

export function getCardType(cardNumber) {
  const digits = normalizeCardNumber(cardNumber);
  if (!digits) return null;

  // Мир: начинается с 2200–2204
  // Упростил проверку, чтобы она срабатывала сразу при вводе начала номера
  if (/^220[0-4]/.test(digits)) return "mir";

  // Visa: начинается с 4
  if (/^4/.test(digits)) return "visa";

  // Mastercard: 51–55 или 2221–2720
  if (/^5[1-5]/.test(digits)) return "mastercard";
  if (/^2(22[1-9]|2[3-9]\d|[3-6]\d{2}|7[0-1]\d|720)/.test(digits)) return "mastercard";

  return null;
}
