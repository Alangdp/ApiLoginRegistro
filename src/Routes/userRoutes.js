import { Router } from 'express';
import userController from '../controllers/userController.js';
import TokenMiddleawre from '../middlewares/tokenMiddleware.js'

import loginInDB from '../middlewares/databaseMiddleware.js'

const router = new Router();

router.get('/', TokenMiddleawre, loginInDB ,userController.index);
router.get('/:id', TokenMiddleawre, loginInDB, userController.show);
router.post('/register', TokenMiddleawre, loginInDB, userController.register)
router.delete('/:id', TokenMiddleawre, loginInDB, userController.delete)
router.put('/:id', TokenMiddleawre, loginInDB, userController.update)
router.post('/login', TokenMiddleawre, userController.login)


export default router;
