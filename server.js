var express = require('express');
var app = express();

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


app.listen(port, function() {
	console.log('FRONT démaré !');
});

app.use('/', express.static(__dirname));

app.get('/', function(req, res, next) {
	res.sendFile('./index.html');
});

app.get('/process', function(req, res, next) {
	res.send('voilà maitre');
});