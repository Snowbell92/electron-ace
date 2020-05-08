/* eslint-disable lines-around-directive */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable camelcase */
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Elements_prop_videos = sequelize.define(
    'Elements_prop_videos',
    {
      Lesson_name: DataTypes.STRING,
      Lesson_category: DataTypes.STRING,
      Lesson_type: DataTypes.STRING,
      name: DataTypes.STRING
    },
    {}
  );
  Elements_prop_videos.associate = function(models) {
    // associations can be defined here
  };
  return Elements_prop_videos;
};
