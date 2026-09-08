import express from 'express';

const router = express.Router(); //instance of the express router

// controller functions
import { login, register } from '../controller/accountController.js';

//Login route
router.post('/login', login)

//Register route
router.post('/register', register)


export default router;