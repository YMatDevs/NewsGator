import express from 'express';

const router = express.Router();

// Importing Services
import flushArticles from '../Services/flushArticles';
import { updateNewsArticles } from '../Services/updateNewsArticles';



router.delete('/flush', (req, res) => {
    try { 
        flushArticles(); 
        console.log('Database has been flushed');
        res.status(204).json({ message: 'The Database has been flushed'});
    }
    catch (error)
    {
        console.log('Error in flushing the Database');
        res.status(500).json({ message: 'There was an error in flushing the database'});
    }
});


router.post('/updateArticles', (req, res) => {

    try {
        updateNewsArticles();
        console.log('New Articles have been stored in the Database');
        res.status(201).json({ message: 'News Articles have been updated'});
    }
    catch (error)
    {
        console.log('Error in updating the Database');
        res.status(500).json( { message: 'New Articles could not be loaded' });
    }
});

export default router;