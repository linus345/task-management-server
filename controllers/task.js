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
    let task = undefined;
    for(let i = 0; i < board.columns.length; i++) {
      if(board.columns[i]._id == columnId) {
        board.columns[i].tasks.push(newTask);
        task = board.columns[i].tasks[board.columns[i].tasks.length -1];
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
        task,
      });
      return;
    });
  } catch(error) {
    return errorHandler(res, error, 400, 'Something went wrong when creating task');
  }
}

exports.update = async function(req, res) {
  const { title } = req.body;
  const { boardId, columnId, taskId } = req.params;
  
  try {
    const board = await Board.findById(boardId);
    // board.columns.forEach(async column => {
    //   if('' + column._id === columnId) {
    //     task = await column.tasks.id(taskId);
    //     task.title = title;
    //   }
    // });
    for(let i = 0; i < board.columns.length; i++) {
      const column = board.columns[i];
      if('' + column._id === columnId) {
        task = await column.tasks.id(taskId);
        task.title = title;
        break;
      }
    }

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
    return errorHandler(res, error, 400, 'Something went wrong when updating task');
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
    return errorHandler(res, error, 400, 'Something went wrong when deleting task');
  }
}

exports.reorder = async function(req, res) {
  const { taskId, oldIndex, newIndex, sourceColumnId, destinationColumnId } = req.body;
  const { boardId } = req.params;

  try {
    const board = await Board.findById(boardId);
    if(!board) throw new Error('No board found');
    
    let tempTask = undefined;
    board.columns.forEach(column => {
      if('' + column._id === sourceColumnId) {
        console.log('setting temptask');
        console.log('temptask', column.tasks[oldIndex]);
        tempTask = column.tasks[oldIndex];
        console.log('after setting temptask');
        column.tasks.pull(taskId);
        console.log('after pulling task');
      }
    });

    board.columns.forEach(column => {
      console.log('second forEach');
      if('' + column._id === destinationColumnId) {
        console.log('before splicing');
        column.tasks.splice(newIndex, 0, tempTask);
        console.log('after splicing');
      }
    });

    console.log('here');
    console.log('temptask', tempTask);

    board.save(error => {
      console.log('test');
      if(error) {
        throw new Error('this is the error');
      }
      res.json({
        success: true,
        message: 'Updated task order',
      });
      return;
    });
  } catch(error) {
    return errorHandler(res, error, 400, 'Something went wrong when updating order');
  }
}