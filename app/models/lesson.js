'use strict';
module.exports = (sequelize, DataTypes) => {
  const lesson = sequelize.define(
    'lesson',
    {
      name: DataTypes.STRING,
      thumbnail: DataTypes.STRING
    },
    {}
  );
  // eslint-disable-next-line no-unused-vars,func-names
  lesson.associate = function(models) {
    // associations can be defined here
  };
  return lesson;
};
