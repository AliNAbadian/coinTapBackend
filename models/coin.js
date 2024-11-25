module.exports = (sequelize, DataTypes) => {
  const Coin = sequelize.define('Coin', {
    value: {
      type: DataTypes.INTEGER,
      allowNull: false, // Ensures the value cannot be null
      defaultValue: 0,  // Sets a default value
    },
  });
  return Coin;
};
