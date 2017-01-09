var express = require('express');
var app = express();

app.listen(3000, function() {
	console.log('FRONT démaré !');
});

app.use('/', express.static(__dirname));

app.get('/', function(req, res, next) {
	res.sendFile('./index.html');
});

app.get('/process', function(req, res, next) {
	res.send('voilà maitre');
});