module.exports = (sequelize, DataTypes) => {
  // eslint-disable-next-line camelcase
  const Lesson_Elements = sequelize.define(
    'Lesson_Elements',
    {
      type: DataTypes.STRING,
      word: DataTypes.STRING
    },
    {}
  );
  // eslint-disable-next-line no-unused-vars
  Lesson_Elements.associate = function(models) {
    // associations can be defined here
  };
  // eslint-disable-next-line camelcase
  return Lesson_Elements;
};
