const sequelize = require('../sequelize').sequelize;
const Sequelize = require('../sequelize').Sequelize;

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  plainPassword: Sequelize.STRING
});

module.exports = User
