const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');

// parse json body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// auth + jwt handling
require('./security')(app)

// real app code
app.get('/api/test', function (req, res) {
  res.json({
      text : 'protected data'
    })
})

app.get('/api/lol', function (req, res) {
  res.json({
      text : 'protected lol'
    })
})


app.listen(port, function () {
  console.log('Listenning on '+port)
})
