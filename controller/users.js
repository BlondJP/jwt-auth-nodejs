const User = require('../models/users')

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
