

exports.prefController = async (req, res) => {
  const formData = req.body;
  return res.status(200).json({
    success: true,
    message: "Logout Succesfully",
  });
};
