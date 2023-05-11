import { Router } from 'express';

import DatabaseController from '../controllers/DatabaseController.js';

const router = new Router();

router.post('/post', DatabaseController.register);


export default router;
