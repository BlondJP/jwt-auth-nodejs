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
require('./controller/users')(app)

app.listen(port, function () {
  console.log('Listenning on '+port)
})
