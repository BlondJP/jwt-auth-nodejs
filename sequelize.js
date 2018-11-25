const {Sequelize, SequelizeClass} = require('sequelize');

const sequelize = new Sequelize('jwt-auth', 'root', 'hubside123', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: 'database.sqlite',

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

module.exports = {
  sequelize: sequelize,
  Sequelize: Sequelize
}
