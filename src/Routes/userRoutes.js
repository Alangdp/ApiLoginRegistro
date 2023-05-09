import { Router } from 'express';
import userController from '../controllers/userController.js';

const router = new Router();

router.get('/:dataBaseName/', userController.index);
router.get('/:dataBaseName/:id', userController.show);
router.post('/:dataBaseName/register', userController.register)
router.delete('/:dataBaseName/:id', userController.delete)
router.put('/:dataBaseName/:id', userController.update)


export default router;
