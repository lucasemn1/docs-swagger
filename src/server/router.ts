import { Router } from 'express';
import ToDoController from '../controllers/ToDoController';
import LoginMiddleware from '../middlewares/LoginMiddleware';

const router = Router();

router.post('/to-do', LoginMiddleware.verifyLogin, ToDoController.store);
router.get('/to-dos', LoginMiddleware.verifyLogin, ToDoController.index);
router.get('/to-do/:id', LoginMiddleware.verifyLogin, ToDoController.find);
router.put('/to-do/:id', LoginMiddleware.verifyLogin, ToDoController.edit);
router.delete('/to-do/:id', LoginMiddleware.verifyLogin, ToDoController.destroy);

export default router;