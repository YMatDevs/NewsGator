import express from 'express';

const router = express.Router();

import isAuthenticated from "../Services/authenticate.js";

router.use(isAuthenticated);



  

export default router;
