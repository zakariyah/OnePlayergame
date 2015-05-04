var actionmodel = require('../model/actionmodel');
var gameProperties = require('../controller/gameProperties');

var saveMatrixAnswer = function(req)
{
	var move = {};
	move['hiitNumber'] = req.session.hiitNumber;
	move['answer'] = req.body.answer;

	move['round'] = 1;
	move['gameid'] = gameProperties.gameId;
	
	gameProperties.saveOneRoundToDatabase(move);
};

module.exports = saveMatrixAnswer;