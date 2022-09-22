require('dotenv').config();
let bodyParser = require('body-parser');
let express = require('express');
let app = express();

app.use(function middleware(req, res, next) {
  let string = `${req.method} ${req.path} - ${req.ip}`;
  console.log(string);
  next();
});

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

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

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({time: req.time});
});

app.get('/:word/echo', (req, res) => {
  res.json({word: req.params.word});
});

app.get('/name', (req, res) => {
  res.json({name: `${req.query.first} ${req.query.last}`})
});
















 module.exports = app;
