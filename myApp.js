require('dotenv').config()
let express = require('express');
let app = express();

app.use(function middleware(req, res, next) {
  let string = `${req.method} ${req.path} - ${req.ip}`;
  console.log(string);
  next();
});

// console.log('Hello World');

// app.get('/', (req, res) => {
//   res.send('Hello Express');
// });

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/json', (req,res) => {
  let obj = {'message': 'Hello json'};
  switch (process.env['MESSAGE_STYLE']) {
    case 'uppercase':
        obj.message = obj.message.toUpperCase();
      break;
    default:
      break;
  }
  res.json(obj);
});

























 module.exports = app;
