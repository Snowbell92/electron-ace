'use strict';
module.exports = (sequelize, DataTypes) => {
  const LessonElements = sequelize.define(
    'LessonElements',
    {
      lesson_name: DataTypes.STRING,
      type: DataTypes.STRING,
      word: DataTypes.STRING,
      word_category: DataTypes.STRING
    },
    {}
  );
  // eslint-disable-next-line no-unused-vars
  LessonElements.associate = function(models) {
    // associations can be defined here
  };
  return LessonElements;
};
