var gamePlayed = require('./bin/argumentParser'); 
// var gamePlayed = 'esp';
// pd for prisoners dilemma, esp for esp game.
var settings = require('./' + gamePlayed);
settings.gameId = "realGame"; // game or testing
settings.gamePlayed = gamePlayed;




module.exports = settings;