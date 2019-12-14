'use strict';



module.exports = (sequelize, DataTypes) => {
  const Lesson = sequelize.define(
    'Lesson',
    {
      name: DataTypes.STRING,
      thumbnail: DataTypes.STRING
    },
    {}
  );
  // eslint-disable-next-line no-unused-vars,func-names
  Lesson.associate = function(models) {
    // associations can be defined here
  };
  return Lesson;
};
