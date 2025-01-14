import puppeteer from "puppeteer";

async function scrapeNews() {
  const browser = await puppeteer.launch({ headless: true });

  console.log("hello 1dsa");

  const page = await browser.newPage();
  page.setViewport({ width: 1080, height: 1024 });

  console.log("Before page.goto()");

  await page.goto("https://timesofindia.indiatimes.com/", {waitUntil: "domcontentloaded",timeout: 60000,});

  console.log("After page.goto()");

  console.log("Before waitForSelector");

  await page.waitForSelector("figure", { timeout: 60000 }); 

  console.log("After waitForSelector");


  const articles = await page.evaluate(() => {
    const figures = Array.from(document.querySelectorAll('figure')); 

      return figures.map(figure => {

        const img = figure.querySelector('img') ? figure.querySelector('img').src : null; 
        const caption = figure.querySelector('figcaption') ? figure.querySelector('figcaption').innerText : null; 
        const url = figure.querySelector('a') ? figure.querySelector('a').href : null; 

        return { img, caption, url }; 
    });
  });

  await browser.close();

  console.log("hello 2");


  return articles;
}








// / ************************************************************************************************* /


import { Article } from "../Database/Schemas.js";






async function updateNewsArticles()
{
  console.log('why w');
  const articles = await scrapeNews();

  const validArticles = articles.filter(
    (article) =>
      article.caption &&
      article.url &&
      article.caption.trim() !== "" &&
      article.url.trim() !== ""
  );

  await Article.insertMany(validArticles, {ordered: false})
  .then((result) => {
    console.log("Inserted Articles into database successfully");
  })
  .catch((err) => {
    console.log("Error inserting articles into database");
    console.log("Error: "+err);
  });

}

export { updateNewsArticles };  

