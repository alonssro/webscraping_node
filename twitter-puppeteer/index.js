const twitter = require("./twitter");

(async () => {
  const USERNAME = "";
  const PASSWORD = "";
  await twitter.initialize();

  await twitter.login(USERNAME, PASSWORD);
  await twitter.postTweet("Saludos desde scraper");

  await twitter.end();
})();
