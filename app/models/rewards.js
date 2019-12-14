'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rewards = sequelize.define('Rewards', {
    name: DataTypes.STRING
  }, {});
  Rewards.associate = function(models) {
    // associations can be defined here
  };
  return Rewards;
};