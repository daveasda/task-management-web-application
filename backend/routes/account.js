import express from 'express';

const router = express.Router(); //instance of the express router

// controller functions
import { login, register, dashboard, getUsers} from '../controller/accountController.js';

//Login route
router.post('/login', login)

//Register route
router.post('/register', register)

//Dashboard route
router.get('/dashboard/:userId', dashboard)

//Get All Users
router.get('/users', getUsers)


export default router;