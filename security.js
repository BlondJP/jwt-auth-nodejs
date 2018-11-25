const jwt = require('jsonwebtoken');
const key = 'notThatSecret42'
const STATUS_UNAUTHORIZED = 403;

const users = [
  {id: 1, username: 'jpb.blond@gmail.com', plainPassword: 'test123'},
  {id: 2, username: 'ml.blond@gmail.com', plainPassword: 'lol444'},
  {id: 3, username: 'cam.blond@gmail.com', plainPassword: 'lille'},
  {id: 4, username: 'constance.blond@gmail.com', plainPassword: 'conflans'},
  {id: 5, username: 'charles.canevy@gmail.com', plainPassword: 'herblay'}
];

function userProvider(username, plainPassword) {
  let found = null;
  users.forEach(user => {
    if (user.username === username && user.plainPassword === plainPassword) {
      found = user;
    }
  });
  return found;
}

function checkToken(req, res, next)
{
  const bearerHeader = req.headers['authorization']

  if (typeof bearerHeader === 'string') {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken
    jwt.verify(req.token, key, function (err, data) {
      if (err) {
        res.sendStatus(STATUS_UNAUTHORIZED)
      } else {
        next()
      }
    })
  } else {
    res.sendStatus(STATUS_UNAUTHORIZED)
  }
}

module.exports = (app) => {
  // Authentication
  app.post('/api/login', function(req, res) {

      console.log(req.body)

      const user = userProvider(req.body.username, req.body.password)

      if (user) {
        const token = jwt.sign({id: user.id}, key)
        res.json({
          token: token
        })
      } else {
        res.sendStatus(STATUS_UNAUTHORIZED)
      }
  })

  // verify JWT
  app.use(checkToken)
}
