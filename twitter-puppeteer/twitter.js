const puppeteer = require("puppeteer");

const BASE_URL = "https://twitter.com/";
const LOGIN_URL = "https://twitter.com/login";
const USERNAME_URL = username => `https://twitter.com/${username}`;

let browser = null;
let page = null;

const twitter = {
  initialize: async () => {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: {
        width: 1290,
        height: 920
      }
    });
    page = await browser.newPage();
    await page.goto(BASE_URL);
  },

  login: async (username, password) => {
    await page.goto(LOGIN_URL);
    await page.waitFor('input[name="session[username_or_email]"]');
    await page.type('input[name="session[username_or_email]"]', username, {
      delay: 20
    });
    await page.type(
      'input[name="session[password]"][class="js-password-field"]',
      password,
      { delay: 20 }
    );
    await page.click('button[type="submit"]');
    await page.waitFor(".public-DraftStyleDefault-ltr");
  },

  end: async () => {
    await browser.close();
  },

  postTweet: async message => {
    await page.goto(BASE_URL);
    await page.waitFor(".public-DraftStyleDefault-ltr");
    await page.click(".public-DraftStyleDefault-ltr");
    await page.waitFor(500);
    await page.keyboard.type(message, { delay: 50 });
    await page.click('div[data-testid="tweetButtonInline"]');
  },

  getUser: async username => {
    let url = await page.url();
    if (url != USERNAME_URL(username)) {
      await page.goto(BASE_URL);
    }
  }
};

module.exports = twitter;
