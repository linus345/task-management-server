const Board = require('../models/board');
const errorHandler = require('../handlers/errorHandler');

exports.create = async function(req, res) {
  const { title } = req.body;
  const { boardId, columnId } = req.params;
  const { _id } = req.user;

  // create the new task
  const newTask = {
    author: _id,
    title,
  }

  try {
    const board = await Board.findById(boardId);
    // board.tasks.push(newTask);
    for(let i = 0; i < board.columns.length; i++) {
      if(board.columns[i]._id == columnId) {
        board.columns[i].tasks.push(newTask);
        break;
      }
    }

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
  const { boardId, columnId, taskId } = req.params;
  
  try {
    const board = await Board.findById(boardId);
    const task = board.columns.forEach(async column => {
      if(column._id === columnId) {
        const temp = await column.tasks.id(taskId);
        return temp;
      }
    });
    console.log('task update', task);
    task.title = title;

    // if(task.column !== columnId) {
    //   task.column = columnId;
    // }

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
  
    // board.tasks.id(taskId).remove();
    board.columns.forEach(async column => {
      if(column._id === columnId) {
        await column.tasks.id(taskId).remove();
        break;
      }
    })
  
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

exports.reorder = async function(req, res) {
  const { tasks } = req.body;
  const { boardId, columnId } = req.params;

  try {
    const board = await Board.findById(boardId);

    // remove tasks
    board.columns.forEach(async column => {
      await column.tasks.remove();
    })

    // insert tasks in correct order
    board.columns.forEach(column => {
      if(column._id === columnId) {
        column.tasks = tasks;
        break;
      }
    })

    // TODO: come up with a solution on how to update the order of tasks
    // maybe delete and then insert
    // upsert??

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