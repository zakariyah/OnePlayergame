#!/usr/bin/env node

require('./argumentParser'); 
var debug = require('debug')('my-application');
var app = require('../app');
var io = require('socket.io');
var connecter = require('../database');
connecter('mongodb://localhost/testingGoogle');
var gameplayer = require('../controller/gameplayer');
var gameProperties = require('../controller/gameProperties');
var playerHiitNumberMap = {};
var gameCounter = 0;

app.set('port', process.env.PORT || 4000);
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
var ionew = io.listen(server);


// var gameStartStatus = false;

// var playersSocketDict = {};


// ionew.sockets.on('connection', function (socket) {
// 	socket.on('join', function(hiitNumber)
// 	{
// 		startGame();
// 		gameCounter += 1;
// 	});

// 	function startGame(hiitNumber)
// 	{
// 		playerHiitNumberMap[socket.id] = hiitNumber;
// 		var player = new gameplayer(gameCounter, socket, playerHiitNumberMap[socket.id]); 
// 		playersSocketDict[socket.id] = player;
// 		player.sendMessageToClient();
// 	}


// 	socket.on('clientMessage', function(content) {
// 		var player = playersSocketDict[socket.id];

// 		if(typeof player === 'undefined')
// 		{
// 			return;
// 		}		
// 		player.addAnswer(content)	// send serverMessage to client.	
// });



// });