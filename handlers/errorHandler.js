module.exports = function(res, error, statusCode, message, redirect = null) {
  res.status(statusCode).json({
    error,
    message,
    redirect,
    success: false,
  });
  return;
}