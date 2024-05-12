const express = require('express');
const taskRouter = express.Router();
const {tasks, setTask, deleteTask, updateTask} = require('../controllers/TaskController');

taskRouter.route('/').get(tasks).post(setTask);
taskRouter.route('/:id').delete(deleteTask).put(updateTask);

module.exports = taskRouter