const { Coin } = require('../models');
const { getIO } = require('../config/socket');

const getCoinValue = async (req, res) => {
  try {
    const coin = await Coin.findOne();
    res.json({ remaining: coin.value });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch coin value' });
  }
};

const decrementCoin = async (req, res) => {
  try {
    const coin = await Coin.findOne();

    if (!coin) {
      return res.status(404).json({ success: false, message: 'Coin not found' });
    }

    if (coin.value > 0) {
      console.log('Tapping the coin... Remaining:', coin.value);
      coin.value -= 1;

      try {
        await coin.save();
        console.log('Coin value updated successfully:', coin.value);

        // Broadcast the update using socket.io
        const io = getIO(); // Get the initialized io instance
        io.emit('coinUpdate', coin.value);
        console.log('Coin update emitted via socket:', coin.value);

        res.status(200).json({ success: true, remaining: coin.value });
      } catch (saveError) {
        console.error('Error saving coin:', saveError);
        res.status(500).json({ error: 'Failed to save coin' });
      }
    } else {
      res.status(400).json({ success: false, message: 'Coin exhausted' });
    }
  } catch (fetchError) {
    console.error('Error fetching coin:', fetchError);
    res.status(500).json({ error: 'Failed to decrement coin' });
  }
};


module.exports = { getCoinValue, decrementCoin };
