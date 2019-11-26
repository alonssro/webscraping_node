const puppeteer = require("puppeteer");

let browser = null;
let page = null;

const BASE_URL = "https://amazon.com.mx";

const amazon = {
  initialize: async () => {
    console.log("Puppeteer initialization...");
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    page.on("console", message => {
      console.log(message.text());
    });

    await page.goto(BASE_URL, { waitUntil: "networkidle2" });
    console.log("Puppeteer initialization complete...");
  },
  end: async () => {
    console.log("Ending browser...");
    browser.close();
    console.log("Broser closed...");
  },
  getProductDetails: async link => {
    console.log(`Going to the product page.. ${link}`);
    await page.goto(link, { waitUntil: "networkidle2" });

    let details = await page.evaluate(() => {
      let title = document.querySelector("#productTitle").innerText;
      let manufacturer = document.querySelector("#bylineInfo").innerText;
      let price = document.querySelector(
        "#priceblock_ourprice, #priceblock_dealprice"
      ).innerText;
      let rating = document.querySelector("#acrPopover").getAttribute("title");
      let totalRatings = document.querySelector("#acrCustomerReviewText")
        .innerText;

      console.log("test");
      console.log("another test message");
      return {
        title,
        manufacturer,
        price,
        rating,
        totalRatings
      };
    });
    return details;
  }
};
module.exports = amazon;
