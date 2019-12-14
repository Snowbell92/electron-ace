'use strict';
module.exports = (sequelize, DataTypes) => {
  const Elements_prop_audios = sequelize.define('Elements_prop_audios', {
    name: DataTypes.STRING
  }, {});
  Elements_prop_audios.associate = function(models) {
    // associations can be defined here
  };
  return Elements_prop_audios;
};