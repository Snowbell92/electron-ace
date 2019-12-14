const bcrypt = require('bcrypt');

// eslint-disable-next-line no-unused-vars
async function hashPassword(teacher, options) {
  if (!teacher.changed('password')) {
    return 0;
  }
  const SALT_FACTOR = 8;
  // eslint-disable-next-line no-param-reassign
  teacher.password = await bcrypt.hash(teacher.password, SALT_FACTOR);
  console.log(teacher);
}

module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define(
    'Teacher',
    {
      name: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      hooks: {
        beforeSave: hashPassword,
        beforeCreate: hashPassword
      }
    }
  );
  // eslint-disable-next-line func-names
  Teacher.prototype.comparePassword = function(password) {
    // eslint-disable-next-line func-names
    bcrypt.compare(password, this.password, function(res, err) {
      if (res) {
        console.log(res);
      } else {
        console.log(err);
      }
    });
    return bcrypt.compare(password, this.password);
  }
  // eslint-disable-next-line no-unused-vars,func-names
  Teacher.associate = function(models) {
    // associations can be defined here
  };

  // create all the defined tables in the specified database.
  sequelize
    .sync()
    .then(() =>
      console.log(
        "users table has been successfully created, if one doesn't exist"
      )
    )
    .catch(error => console.log('This error occured', error));

  return Teacher;
};
