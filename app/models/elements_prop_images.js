'use strict';

module.exports = (sequelize, DataTypes) => {
  // eslint-disable-next-line camelcase
  const Elements_prop_images = sequelize.define(
    'Elements_prop_images',
    {
      name: DataTypes.STRING
    },
    {}
  );
  // eslint-disable-next-line no-unused-vars
  Elements_prop_images.associate = function(models) {
    // associations can be defined here
  };
  // eslint-disable-next-line camelcase
  return Elements_prop_images;
};
