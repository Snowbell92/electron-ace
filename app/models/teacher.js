/* eslint-disable func-names */
const bcrypt = require('bcryptjs');

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
        beforeSave: async function(teacher) {
          const salt = await bcrypt.genSalt(10); //whatever number you want
          // eslint-disable-next-line no-param-reassign
          teacher.password = await bcrypt.hash(teacher.password, salt);
        }
      }
    }
  );
  // eslint-disable-next-line func-names
  Teacher.prototype.comparePassword = async function(password) {
    // eslint-disable-next-line func-names
    // eslint-disable-next-line no-return-await
    return await bcrypt.compare(password, this.password);
  };
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
