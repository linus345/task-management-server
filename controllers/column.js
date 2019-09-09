const Board = require('../models/board');
const errorHandler = require('../handlers/errorHandler');

exports.create = async function(req, res) {
  const { name } = req.body;
  const { boardId } = req.params;

  // create the new column
  const newColumn = {
    name,
  }

  try {
    const board = await Board.findById(boardId);
    board.columns.push(newColumn);
    const lastColumn = board.columns[board.columns.length - 1];
    board.save(error => {
      if(error) {
        throw error;
      }
      res.json({
        success: true,
        message: 'Added column',
        column: lastColumn,
      });
      return;
    });
  } catch(error) {
    return errorHandler(res, error, 400, 'Something went wrong');
  }
}

exports.update = async function(req, res) {
  const { name } = req.body;
  const { boardId, columnId } = req.params;
  
  try {
    const board = await Board.findById(boardId);
    const column = await board.columns.id(columnId);
    column.name = name;

    board.save(error => {
      if(error) {
        throw error;
      }
      res.json({
        success: true,
        message: 'Updated column',
      });
      return;
    });
  } catch(error) {
    return errorHandler(res, error, 400, 'Something went wrong');
  }
}

exports.delete = async function(req, res) {
  const { boardId, columnId } = req.params;

  try {
    const board = await Board.findById(boardId);
  
    // may not return a promise
    await board.columns.id(columnId).remove();
  
    board.save(error => {
      if(error) {
        throw error;
      }
      res.json({
        success: true,
        message: 'Deleted column',
      });
      return;
    });
  } catch(error) {
    return errorHandler(res, error, 400, 'Something went wrong');
  }
}