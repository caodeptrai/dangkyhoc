function errorHandler(err, req, res, next) {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Lỗi hệ thống. Vui lòng thử lại sau.';

  res.status(statusCode).json({
    success: false,
    message: message
  });
}

module.exports = errorHandler;
