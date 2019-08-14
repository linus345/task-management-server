const Board = require('../models/board');
const User = require('../models/user');
const errorHandler = require('../handlers/errorHandler');

exports.read = async function(req, res) {
  const { _id } = req.user;

  try {
    const boards = await Board.find({ $or: [{ owner: _id }, { members: _id }]});
    
    res.json({ boards });
    return;
  } catch(error) {
    return errorHandler(res, error, 400, 'Something went wrong when fetching boards');
  }
}

exports.create = async function(req, res) {
  const { label } = req.body;
  const { _id } = req.user;
  const newBoard = new Board({
    label,
    owner: _id,
  });

  newBoard.save(error => {
    if(error) {
      return errorHandler(res, error, 400, 'Something went wrong when creating board');
    };

    User.findByIdAndUpdate(_id, {
     $push: { boards: newBoard._id } 
    }, error => {
      if(error) {
        return errorHandler(res, error, 400, 'Something went wrong when adding board to user');
      }
      res.json({
        newBoard,
        success: true,
      });
      return;
    });
  });
}

exports.update = async function(req, res) {
  const { label } = req.body;
  const { id } = req.params;
  
  Board.findByIdAndUpdate(id, {
    label,
  }, (error, board) => {
    if(error) {
      return errorHandler(res, error, 400, 'Something went wrong when updating board');
    }
    res.json({
      board,
      success: true,
    });
    return;
  });
}

exports.delete = function(req, res) {
  const { id } = req.params;

  Board.findByIdAndRemove(id, (error, board) => {
    if(error) {
      return errorHandler(res, error, 400, 'Something went wrong when deleting board');
    }
    res.json({
      board,
      success: true,
    })
  });
}