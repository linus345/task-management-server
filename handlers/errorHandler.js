module.exports = function(res, error, statusCode, message) {
  res.status(statusCode).json({
    error,
    message,
    success: false,
  });
  return;
}