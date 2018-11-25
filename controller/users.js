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

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  plainPassword: Sequelize.STRING
});

module.exports = (app) => {
  app.post('/api/users', async function (req, res) {
      //await User.sync({force: true})
      let user = await User.create({
        username: req.body.username,
        plainPassword: req.body.plainPassword
      })
      res.json(user)
  })

  app.delete('/api/users', async function (req, res) {
      let id = req.body.id
      console.log(id)
      await User.destroy({
        where: {
          id: id
        }
      })
      res.sendStatus(204)
  })

  app.get('/api/users', async function (req, res) {
      let users = await User.findAll()
      res.json(users)
  })
}
