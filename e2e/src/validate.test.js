import { getCardType, validateLuhn } from "./validate";

describe("validateLuhn", () => {
  test.each([
    ["4111 1111 1111 1111", true], // Visa test number
    ["5555 5555 5555 4444", true], // Mastercard test number
    ["2200 1234 5678 9012", false], // looks like MIR but invalid by Luhn
    ["4111 1111 1111 1112", false],
    ["", false],
    ["abcd", false],
  ])("'%s' => %s", (num, expected) => {
    expect(validateLuhn(num)).toBe(expected);
  });
});

describe("getCardType", () => {
  test.each([
    ["4111 1111 1111 1111", "visa"],
    ["5555 5555 5555 4444", "mastercard"],
    ["2221 0000 0000 0009", "mastercard"],
    ["2200 0000 0000 0000", "mir"],
    ["2204 9999 9999 9999", "mir"],
    ["3000 0000 0000 04", null],
  ])("'%s' => %s", (num, expected) => {
    expect(getCardType(num)).toBe(expected);
  });
});

