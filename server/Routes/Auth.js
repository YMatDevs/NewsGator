import express from 'express';

const router = express.Router();

router.post('/login', (req, res, next) => {
    req.send('login');
})

export { router };