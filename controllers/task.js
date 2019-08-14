const Board = require('../models/board');
const errorHandler = require('../handlers/errorHandler');

exports.create = async function(req, res) {
  const { title } = req.body;
  const { boardId } = req.params;
  const { _id } = req.user;

  // create the new task
  const newTask = {
    author: _id,
    title,
  }

  try {
    const board = await Board.findById(boardId);
    board.tasks.push(newTask);

    board.save(error => {
      if(error) {
        throw error;
      }
      res.json({
        success: true,
        message: 'Added task',
      });
      return;
    });
  } catch(error) {
    return errorHandler(res, error, 400, 'Something went wrong');
  }
}

exports.update = async function(req, res) {
  const { title } = req.body;
  const { boardId, taskId } = req.params;
  
  try {
    const board = await Board.findById(boardId);
    const task = await board.tasks.id(taskId);
    task.title = title;

    board.save(error => {
      if(error) {
        throw error;
      }
      res.json({
        success: true,
        message: 'Updated task',
      });
      return;
    });
  } catch(error) {
    return errorHandler(res, error, 400, 'Something went wrong');
  }
}

exports.delete = async function(req, res) {
  const { boardId, taskId } = req.params;

  try {
    const board = await Board.findById(boardId);
  
    board.tasks.id(taskId).remove();
  
    board.save(error => {
      if(error) {
        throw error;
      }
      res.json({
        success: true,
        message: 'Deleted task',
      });
      return;
    });
  } catch(error) {
    return errorHandler(res, error, 400, 'Something went wrong');
  }
}