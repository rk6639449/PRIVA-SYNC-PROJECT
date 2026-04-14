import {Router} from 'express';
import { registerUser } from '../controllers/user.controller.js';
import { logInUser } from '../controllers/user.controller.js';

const router = Router();


router.route('/register').post(registerUser);
router.route('/logIn').post(logInUser);

export default router;