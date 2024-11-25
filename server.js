const express = require('express');
const { sequelize } = require('./models');
const coinRoutes = require('./routes/coinRoutes');
const userRoutes = require('./routes/userRoutes');
const socketSetup = require('./config/socket');
const cors = require('cors');

require('dotenv').config();

const app = express();
const http = require('http').createServer(app);
const io = socketSetup(http);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/coin', coinRoutes);
app.use('/api/user', userRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Sync database and start server
const PORT = process.env.PORT || 3000;
sequelize
  .sync()
  .then(() => {
    console.log('Database connected!');
    http.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error.message);
  });
