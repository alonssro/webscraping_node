const request = require("request-promise");
const cheerio = require("cheerio");

(async () => {
  console.log("Initial request to get the csrf_token");
  let initialRequest = await request("http://quotes.toscrape.com/login");

  let $ = cheerio.load(initialRequest.body);

  let csrfToken = $('input[name="csrf_token"]').val();

  console.log("POST Request to login on the form");

  let loginRequest = request({
    url: "http://quotes.toscrape.com/login",
    method: "POST",
    gzip: true,
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
      "Accept-Encoding": "gzip, deflate",
      "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
      "Cache-Control": " max-age=0",
      Connection: "keep-alive",
      "Content-Length": "89",
      "Content-Type": "application/x-www-form-urlencoded",
      Host: "quotes.toscrape.com",
      Origin: "http://quotes.toscrape.com",
      Referer: "http://quotes.toscrape.com/login",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
    },
    form: {
      csrf_token: csrfToken,
      username: "",
      password: ""
    },
    resolveWithFullResponse: true
  });

  debugger;
})();
