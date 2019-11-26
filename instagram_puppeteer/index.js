const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    devtools: false
  });
  const page = await browser.newPage();
  await page.goto("https://instagram.com/");
  await page.waitFor('a[href="/accounts/login/?source=auth_switcher"]');
  await page.click('a[href="/accounts/login/?source=auth_switcher"]');
  await page.waitFor('input[name="username"]');

  await page.waitFor(300);
  await page.type('input[name="username"]', "alons_ro", { delay: 300 });
  await page.waitFor('input[name="password"]');
  await page.type('input[name="password"]', "Sheccid-12", { delay: 300 });
  await page.click(
    "#react-root > section > main > div > article > div > div:nth-child(1) > div > form > div:nth-child(4) > button"
  );
  //   await browser.close();
  debugger;
})();
