const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');

// get all tasks -
// router.get('/')

// get specific task -
// router.get('/:id')

// create new task
router.post('/', taskController.create);

// update task
router.put('/:id', taskController.update);

// delete task
router.delete('/:id', taskController.delete);

module.exports = router;