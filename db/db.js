const Sequelize = require('sequelize');
const path = require('path');

const sequelize = new Sequelize('database', null, null, {
  dialect: 'sqlite',
  retry: {
    match: [/SQLITE_BUSY/],
    name: 'query',
    max: 5
  },
  pool: {
    maxactive: 1,
    max: 5,
    min: 0,
    idle: 20000
  },
  storage: './database.sqlite3'
});
const db = {};
db.lesson = sequelize.import(path.join(__dirname, '/models/lesson.js'));
db.lesson_elements = sequelize.import(
  path.join(__dirname, '/models/lesson_element.js')
);
db.student = sequelize.import(path.join(__dirname, '/models/student.js'));
db.teacher = sequelize.import(path.join(__dirname, '/models/teacher.js'));
db.rewards = sequelize.import(path.join(__dirname, '/models/rewards.js'));
db.allVideos = sequelize.import(
  path.join(__dirname, '/models/elements_prop_videos.js')
);
db.allAudios = sequelize.import(
  path.join(__dirname, '/models/elements_prop_audios.js')
);
db.allImages = sequelize.import(
  path.join(__dirname, '/models/elements_prop_images.js')
);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
