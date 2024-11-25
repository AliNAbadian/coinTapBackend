const express = require('express');
const { getUser, updateUserPoints } = require('../controllers/userController');

const router = express.Router();

router.get('/:userId', getUser);
router.post('/tap', updateUserPoints);

module.exports = router;
