/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Elements_prop_audios = sequelize.define(
    'Elements_prop_audios',
    {
      Lesson_name: DataTypes.STRING,
      Lesson_category: DataTypes.STRING,
      Lesson_type: DataTypes.STRING,
      name: DataTypes.STRING
    },
    {}
  );
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line func-names
  Elements_prop_audios.associate = function(models) {
    // associations can be defined here
  };
  return Elements_prop_audios;
};
