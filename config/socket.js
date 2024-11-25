let io;

module.exports = (server) => {
  io = require('socket.io')(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected.');

    // Emit the latest coin value
    const { Coin } = require('../models');
    Coin.findOne().then((coin) => {
      if (coin) {
        socket.emit('coinUpdate', coin.value);
      } else {
        socket.emit('coinUpdate', 0); // Default value if no coin exists
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected.');
    });
  });

  return io;
};

// Helper function to get the io instance
module.exports.getIO = () => {
  if (!io) {
    throw new Error('Socket.io is not initialized!');
  }
  return io;
};
