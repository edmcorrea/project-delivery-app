module.exports = (err, _req, res, _next) => {
  const { statusCode, message } = err;
  if (!statusCode) {
    console.log(`Internal server error: ${message}`);
    return res.status(500).json({ message: 'internal server error' });
  }

  console.log(`Error: ${message}`);
  return res.status(statusCode).json({ message });
};
