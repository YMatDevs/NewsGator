import express, { Router } from 'express';
import get5Articles from '../Services/getArticles.js'
import sendEmail from '../Services/sendMail.js';

const router = express.Router();


router.post("/sendMail", async (req, res) => {
  
  const emailid = req.session.email;

  const articles = await get5Articles();

  try {
    // const content = `
    //             Today's NewsGator Update
    //             Here are the top 5 articles for you:
                
    //                 ${articles
    //                   .map(
    //                     (article) => `
                            
    //                             ${article.caption}
    //                             ${article.url}
    //                         `
    //                   )
    //                   .join("")}
            
    //             Stay updated with the latest news!
    //         `;

    const content = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
              body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  background-color: #f4f4f9;
                  color: #333;
                  margin: 0;
                  padding: 0;
              }
              .email-container {
                  max-width: 600px;
                  margin: 20px auto;
                  background: #ffffff;
                  border: 1px solid #ddd;
                  border-radius: 8px;
                  overflow: hidden;
              }
              .header {
                  background: #4CAF50;
                  color: #ffffff;
                  padding: 15px;
                  text-align: center;
              }
              .header h1 {
                  margin: 0;
                  font-size: 24px;
              }
              .content {
                  padding: 20px;
              }
              .article {
                  margin-bottom: 20px;
                  border-bottom: 1px solid #ddd;
                  padding-bottom: 10px;
              }
              .article img {
                  max-width: 100%;
                  height: auto;
                  border-radius: 8px;
                  margin-bottom: 10px;
              }
              .article h2 {
                  font-size: 18px;
                  color: #4CAF50;
                  margin: 0 0 5px;
              }
              .article a {
                  text-decoration: none;
                  color: #333;
                  font-size: 14px;
              }
              .footer {
                  text-align: center;
                  padding: 15px;
                  background: #f4f4f4;
                  color: #777;
                  font-size: 12px;
              }
              .footer a {
                  color: #4CAF50;
                  text-decoration: none;
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <div class="header">
                  <h1>Today's NewsGator Update</h1>
              </div>
              <div class="content">
                  <p>Here are the top 5 articles for you:</p>
                  ${articles
                    .map(
                      (article) => `
                      <div class="article">
                          <h2>${article.caption}</h2>
                          <a href="${article.url}" target="_blank">${article.url}</a>
                      </div>
                      `
                    )
                    .join("")}
                  <p>Stay updated with the latest news!</p>
              </div>
              <div class="footer">
                  <p>Thank you for using NewsGator.</p>
              </div>
          </div>
      </body>
      </html>
      `;

    console.log('Sending a Mail to : ',emailid);
    sendEmail(emailid, "Today's NewsGator Update", content);

    res.status(200).json({ message: "Mail send successfully" });
  } catch (error) {
    console.log(`Error in retieving and sending mail: ${error}`);
    res.status(500).send("An error occured");
  }
});

export default router;