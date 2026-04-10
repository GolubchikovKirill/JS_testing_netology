const puppetteer = require("puppeteer");

jest.setTimeout(30000); // default puppeteer timeout

describe("Credit Card Validator form", () => {
  let browser = null;
  let page = null;
  const baseUrl = "http://localhost:9000";

  beforeAll(async () => {
    browser = await puppetteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']  // for runs deploy git hub pages
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  test("should have label element for card input", async () => {
    await page.goto(baseUrl);

    // Проверяем наличие label
    const label = await page.$('label[for="card-input"]');
    expect(label).not.toBeNull();

    // Проверяем текст label
    const labelText = await page.$eval(
      'label[for="card-input"]',
      (el) => el.textContent,
    );
    expect(labelText).toBe("Номер карты");
  });

  test("should validate a valid card number", async () => {
    await page.goto(baseUrl);

    await page.type("#card-input", "4111 1111 1111 1111");
    await page.click('button[type="submit"]');

    const resultText = await page.$eval('[data-role="result"]', (el) => el.textContent);
    expect(resultText).toMatch(/Карта валидна/);
  });

  test("should reject an invalid card number", async () => {
    await page.goto(baseUrl);

    await page.type("#card-input", "4111 1111 1111 1112");
    await page.click('button[type="submit"]');

    const resultText = await page.$eval('[data-role="result"]', (el) => el.textContent);
    expect(resultText).toMatch(/не прош(ё|е)л проверку Луна/i);
  });
});
