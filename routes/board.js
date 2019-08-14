const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board');
const taskController = require('../controllers/task');

/////////////
// boards //
///////////
// get all boards for current user
router.get('/', boardController.read);

// create new board
router.post('/', boardController.create);

// update board
router.put('/:id', boardController.update);

// delete board
router.delete('/:id', boardController.delete);


////////////
// tasks //
//////////
router.post('/:boardId/tasks', taskController.create);

router.put('/:boardId/tasks/:taskId', taskController.update);

router.delete('/:boardId/tasks/:taskId', taskController.delete);

module.exports = router;