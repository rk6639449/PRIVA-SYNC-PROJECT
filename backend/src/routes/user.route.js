import {Router} from 'express';
import { registerUser } from '../controllers/user.controller.js';
import { logInUser } from '../controllers/user.controller.js';
import { logOutUser } from '../controllers/user.controller.js';

const router = Router();


router.route('/register').post(registerUser);
router.route('/logIn').post(logInUser);
router.route('/logOut').post(logOutUser);

export default router;