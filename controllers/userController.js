// controllers/userController.js
const { User, Cube } = require("../models");
const shuffleArray = require("../services/shuffle");

const createUser = async (req, res) => {
  const { username } = req.body;
  console.log(req.body);
  if (!username) {
    return res.status(400).json({ message: "Player name is required!" });
  }
  const user = await User.create({ username });
  
  // Generate cubes for the user
  const cubes = Array.from({ length: 400 }, (_, idx) => ({
    userId: user.id,
    hasPoint: false,
  }));
  
  // Shuffle and assign points
  const shuffled = shuffleArray(cubes);
  shuffled[0].hasPoint = true;
  shuffled[1].hasPoint = true;
  
  await Cube.bulkCreate(shuffled);
  
  res.status(201).json({ message: "User created!", user });
};

const getWallet = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }
  res.json({ wallet: user.wallet });
};

module.exports = { createUser, getWallet };
