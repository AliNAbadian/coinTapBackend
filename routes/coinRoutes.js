const express = require('express');
const { getCoinValue, decrementCoin } = require('../controllers/coinController');

const router = express.Router();

router.get('/', getCoinValue);
router.post('/tap', decrementCoin);

module.exports = router;
