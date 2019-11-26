const requestPromise = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const request = require("request");

const URLS = [
  {
    url:
      "https://www.imdb.com/title/tt4520988/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=0062e30c-97c7-4773-984d-fe269da4042f&pf_rd_r=3GMGWZW3RWNR0KBVZ0J2&pf_rd_s=center-2&pf_rd_t=15061&pf_rd_i=homepage&ref_=hm_vd_f2_anna_lk3",
    id: "frozen_2"
  },
  {
    url:
      "https://www.imdb.com/title/tt2527336/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=b2c397d9-293c-4623-bdbc-4da455e7169a&pf_rd_r=M0JM6TY2GRNAKQYH4Y5R&pf_rd_s=center-3&pf_rd_t=15061&pf_rd_i=homepage&ref_=hm_vd_dt_rj_lk3",
    id: "last_jedis"
  }
];
(async () => {
  let moviesData = [];
  for (let movie of URLS) {
    const response = await requestPromise({
      uri: movie.url,
      headers: {
        "User-Agent": "Request-Promise",
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "es-ES,es;q=0.9,en;q=0.8",
        "cache-control": "max-age=0",
        referer: "https://www.imdb.com/?ref_=vi_close",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
      },
      gzip: true
    });

    let $ = cheerio.load(response);

    let title = $('div[class ="title_wrapper"] > h1')
      .text()
      .trim();

    let rating = $('span[itemprop="ratingValue"]').text();

    let poster = $('div[class="poster"]>a>img').attr("src");

    let ratingCount = $("span[itemprop=ratingCount]").text();

    let releaseDate = $('a[title="See more release dates"]').text();

    let genres = [];
    $('div[class="subtext"] > a[href^="/search/title?genres="]').each(
      (i, elm) => {
        let genre = $(elm).text();
        genres.push(genre);
      }
    );
    let popularity = $(
      "#title-overview-widget > div.plot_summary_wrapper > div.titleReviewBar > div:nth-child(5) > div.titleReviewBarSubItem > div:nth-child(2) > span"
    )
      .text()
      .trim();
    moviesData.push({
      title,
      rating,
      poster,
      rating,
      releaseDate,
      genres,
      popularity
    });

    let file = fs.createWriteStream(`"${movie.id}.jpg`);

    let test = await new Promise((resolve, reject) => {
      let stream = request({
        uri: poster,
        headers: {
          "User-Agent": "Request-Promise",
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "es-ES,es;q=0.9,en;q=0.8",
          "cache-control": "max-age=0",
          referer: "https://www.imdb.com/?ref_=vi_close",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          "user-agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
        },
        gzip: true
      })
        .pipe(file)
        .on("finish", () => {
          console.log("Finished downloading the image");
          resolve();
        })
        .on("error", error => {
          reject("error");
        });
    }).catch(error => {
      console.log(error);
    });
  }
})();
