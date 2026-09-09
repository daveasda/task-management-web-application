import express from 'express';

const router = express.Router(); //instance of the express router

// controller functions
import { createTask, viewUserTasks, updateTaskStatus } from '../controller/taskController.js';

//Create task route
router.post('/create', createTask)

// View tasks route
router.get('/user/:userId', viewUserTasks)

//Patch to update task status
router.patch('/:taskId/status', updateTaskStatus);



export default router;