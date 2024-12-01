// controllers/gameController.js
const { Cube, User } = require("../models");

const checkCube = async (req, res) => {
  const { userId, cubeId } = req.body;
  const cube = await Cube.findOne({ where: { id: cubeId, userId } });
  
  if (!cube) {
    return res.status(404).json({ message: "Invalid cube or user!" });
  }
  
  if (cube.hasPoint) {
    await User.increment({ wallet: 1 }, { where: { id: userId } });
    await Cube.destroy({ where: { userId } });
    return res.json({ message: "Point found! Wallet updated. Game reset." });
  }
  
  res.json({ message: "No point here. Try again!" });
};

module.exports = { checkCube };
