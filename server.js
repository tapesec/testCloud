var express = require('express');
var azure = require('azure-storage');
var app = express();

var keyStorageAPI = "G3z3QyaGOyuylLuqLc9gQPM+PnDvDgWNMWPexJTOMpVa/f3cnHQEU1CdBVNxfun8UB97UVNTCrGC7ZWjrTQK8A==";


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
	var queueService = azure.createQueueService("lectracloudlioaccount", keyStorageAPI);
	queueService.createQueueIfNotExists('lionnelq', function(error) {
  		if (!error) {
    		// Queue exists
    		queueService.createMessage('tasklionnel', 'process calcul', function(error) {
				if (!error) {
				    // Message inserted
				    res.send('voilà maitre');
				} else {
					res.send("Erreur dans le cloud !");
				}
			});

  		}
	});
});