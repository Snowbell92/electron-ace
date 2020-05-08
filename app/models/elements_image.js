'use strict';
module.exports = (sequelize, DataTypes) => {
  const images = sequelize.define(
    'images',
    {
      name: DataTypes.STRING,
      //  lesson_name: DataTypes.STRING,
      category: DataTypes.STRINGs
    },
    {}
  );
  images.associate = function(models) {
    // associations can be defined here
  };
  return images;
};
