var http = require('http');
var path = require('path');
var express = require('express');

var bodyParser = require('body-parser');
var static = require('serve-static');


var router = express.Router();
var app = express();

app.set('port', process.env.PORT || 3000);

router.route('/process/login').post(function(req, res){
  console.log('/process/login의 route 처리!');

  var paramID = req.body.id || req.query.id;
  var paramPW = req.body.pw || req.query.pw;

  res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
  res.write('<h1>응답결과</h1>');
  res.write('<div><p>Param ID : '+paramID+'</p></div>');
  res.write('<div><p>Param Password : '+paramPW+'</p></div>');
  res.end();
});


router.route('/process/:data').get(function(req, res){
  console.log('/process/:data의 route 처리!');

  var paramName = req.params.data;
  var txt = req.body.text || req.query.text;

  res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
  res.write('<h1>응답결과</h1>');
  res.write('<div><p>Path : '+paramName+'</p></div>');
  res.write('<div><p>Input Text : '+txt+'</p></div>');
  res.end();
});

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());
app.use(static(path.join(__dirname, 'public')));

app.use('/', router);


app.all('*', function(req, res){
  res.status(404).send('<h1>해당 페이지를 찾을 수 없습니다!!</h1>');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express Server Start! : '+app.get('port'));
});
