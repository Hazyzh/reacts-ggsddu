var express = require('express')
var app = express(),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser')

// cookie
app.use(cookieParser())
// body
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const apiData = (content = '',  message = '', code = 0) => ({
  code,
  content,
  message
})


app.post('/new/index', function (req, res) {

  res.cookie('token', 'hello token', { maxAge: 1000 * 3600 * 24 * 7, httpOnly: true })

  res.json(apiData('Hello World!', 'stateOk', 2))
})

app.post('/getcookie', function (req, res) {
  var token = req.cookies.token || 'no token'

  res.json(apiData(token, 'stateError', -1))
})

var server = app.listen(8088, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
})
