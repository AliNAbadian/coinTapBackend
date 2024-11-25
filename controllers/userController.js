const { User } = require('../models');

const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (user) {
      res.json({ wallet: user.points });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
};

const updateUserPoints = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findByPk(userId);

    if (user) {
      user.points += 1;
      await user.save();

      res.json({ success: true, userPoints: user.points });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user points' });
  }
};

module.exports = { getUser, updateUserPoints };
