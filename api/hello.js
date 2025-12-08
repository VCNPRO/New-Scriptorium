module.exports = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'JavaScript endpoint funciona',
    timestamp: new Date().toISOString()
  });
};
