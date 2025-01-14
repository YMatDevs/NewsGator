import express from 'express';

const router = express.Router();


import sendEmail from '../Services/sendMail.js';
import get5Articles from '../Services/getArticles.js';
import flushArticles from '../Services/flushArticles.js';
import { updateNewsArticles } from '../Services/updateNewsArticles.js';

// User Actions
// 
// 1. Create an Account
// 2. Delete an Account
// 3. Login
// 4. Logout
// 5. Selecting preferences
// 6. Forgot Password

router.post('/createAccount', (req, res) => {

});


router.delete('/deleteAccount', (req, res) => {

});

router.post("/login", (req, res) => {
    
});

router.post("/logout", (req, res) => {});

router.put("/setPreferences", (req, res) => {});

router.post("/forgotPassword", (req, res) => {});

router.post("/updateArticles", async (req, res) => {

    try {
        await flushArticles();
        await updateNewsArticles();

        res.status(200).send('News Articles updated successfully');
    }
    catch (error) {
        console.log(`Error occured in updating articles: ${error}`);
        res.status(500).send('Values could not be updated');
    }
})

router.post("/sendMail", async (req, res) => {
    
    const  emailid  = req.body.email;

    const articles = await get5Articles();

    try {

        const content = `
                Today's NewsGator Update
                Here are the top 5 articles for you:
                
                    ${articles
                    .map(
                        (article) => `
                            
                                ${article.caption}
                                ${article.url}
                            `
                    )
                    .join("")}
            
                Stay updated with the latest news!
            `;
        sendEmail(emailid, 'Today\'s NewsGator Update', content);

        res.status(200).json( { message : 'Mail send successfully' } );
    }
    catch    (error) {
        console.log(`Error in retieving and sending mail: ${error}`);
        res.status(500).send('An error occured');
    }

});

  

export default router;
