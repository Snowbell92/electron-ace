/* eslint-disable func-names */
/* eslint-disable camelcase */
module.exports = (sequelize, DataTypes) => {
  // eslint-disable-next-line camelcase
  const Lesson_Elements = sequelize.define(
    'Lesson_Elements',
    {
      lesson_name: DataTypes.STRING,
      type: DataTypes.STRING,
      word: DataTypes.STRING,
      word_category: DataTypes.STRING
    },
    {}
  );
  // eslint-disable-next-line no-unused-vars
  Lesson_Elements.associate = function(models) {
    // associations can be defined here
  };
  return Lesson_Elements;
};
