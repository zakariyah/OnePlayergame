var moves = require('./model/actionmodel');
var matrix = require('./gamesConfig/matrix.json');

matrix.gameRounds = function()
{
	// returns leastNumberOfRounds + a number less than or equal to variableAdditionOfRounds
	return pd.leastNumberOfRounds + Math.floor((Math.random() * pd.variableAdditionOfRounds));
}



matrix.saveOneRoundToDatabase = function(move)
{
	moves.createMove(move);
}


module.exports = matrix;