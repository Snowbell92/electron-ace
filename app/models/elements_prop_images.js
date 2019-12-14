'use strict';
module.exports = (sequelize, DataTypes) => {
  const Elements_prop_images = sequelize.define('Elements_prop_images', {
    name: DataTypes.STRING
  }, {});
  Elements_prop_images.associate = function(models) {
    // associations can be defined here
  };
  return Elements_prop_images;
};