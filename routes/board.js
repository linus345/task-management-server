const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board');
const taskController = require('../controllers/task');
const columnController = require('../controllers/column');

/////////////
// boards //
///////////

// get specific board
router.get('/:id', boardController.read);

// get all boards for current user
router.get('/', boardController.readAll);

// create new board
router.post('/', boardController.create);

// update board
router.put('/:id', boardController.update);

// delete board
router.delete('/:id', boardController.delete);


//////////////
// columns //
////////////
router.post('/:boardId/columns', columnController.create);

router.put('/:boardId/columns/:columnId', columnController.update);

router.delete('/:boardId/columns/:columnId', columnController.delete);


////////////
// tasks //
//////////
router.post('/:boardId/columns/:columnId/tasks', taskController.create);

router.put('/:boardId/columns/:columnId/tasks', taskController.reorder);

router.put('/:boardId/columns/:columnId/tasks/:taskId', taskController.update);

router.delete('/:boardId/columns/:columnId/tasks/:taskId', taskController.delete);

module.exports = router;