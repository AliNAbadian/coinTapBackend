module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    });
  
    return User;
  };
  