'use strict';
module.exports = (sequelize, DataTypes) => {
  const Elements_prop_videos = sequelize.define('Elements_prop_videos', {
    name: DataTypes.STRING
  }, {});
  Elements_prop_videos.associate = function(models) {
    // associations can be defined here
  };
  return Elements_prop_videos;
};