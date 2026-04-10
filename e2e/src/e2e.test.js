const puppetteer = require("puppeteer");

jest.setTimeout(30000);

describe("Credit Card Validator form", () => {
  let browser = null;
  let page = null;
  const baseUrl = "http://localhost:9000";

  beforeAll(async () => {
    browser = await puppetteer.launch({
      headless: true, // Режим без графического интерфейса
      args: ['--no-sandbox', '--disable-setuid-sandbox']
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

    await page.waitForSelector('#card-input', { timeout: 10000 });

    const label = await page.$('label[for="card-input"]');
    expect(label).not.toBeNull();

    const labelText = await page.$eval(
      'label[for="card-input"]',
      (el) => el.textContent,
    );
    expect(labelText).toBe("Номер карты");
  });

  test("should validate a valid card number", async () => {
    await page.goto(baseUrl);

    await page.waitForSelector('#card-input');

    await page.type("#card-input", "4111 1111 1111 1111");
    await page.click('button[type="submit"]');

    const resultText = await page.$eval('[data-role="result"]', (el) => el.textContent);
    expect(resultText).toMatch(/Карта валидна/);
  });
});
