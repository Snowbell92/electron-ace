/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable camelcase */



module.exports = (sequelize, DataTypes) => {
  const Elements_prop_images = sequelize.define(
    'Elements_prop_images',
    {
      name: DataTypes.STRING,
      // lesson_name: DataTypes.STRING,
     // category: DataTypes.STRING
    },
    {}
  );
  Elements_prop_images.associate = function(models) {
    // associations can be defined here
  };
  return Elements_prop_images;
};
