var moves = require('./model/wordactionmodel');
var wordTwoPlayer = require('./gamesConfig/wordTwoPlayer.json');
wordTwoPlayer.gameTypes  =    [ 'normal'
];
wordTwoPlayer.gamePhase1 = "";
wordTwoPlayer.gamePhase2 = "";
wordTwoPlayer.gamePhase3 = "";




wordTwoPlayer.gameRounds = function()
{
	// returns leastNumberOfRounds + a number less than or equal to variableAdditionOfRounds
	return wordTwoPlayer.leastNumberOfRounds + Math.floor((Math.random() * wordTwoPlayer.variableAdditionOfRounds));
}
wordTwoPlayer.moves = moves;

wordTwoPlayer.calculator = function(optionChosen, playerNumber) //yourChoice, opponentChoice)
{
	// returns the player Number payoff. player number can be 1 or 2
	// option chosen is a list of length 2 containing player1choice then player2choice
	// each element in optionChosen contains the two choices concantenated with a semicolon
	// 1 represent yes while 2 represent no
	if(optionChosen[0] == optionChosen[1])
	{
		return 1;
	}	
	else
	{
		return 0;
	}
}

wordTwoPlayer.getBriefAnswerFromHistory = function(lastHistory)
{
		var briefAnswer = {};
		briefAnswer.playerChoice = lastHistory[0]; // returns 1 or 2
 		briefAnswer.opponentChoice = lastHistory[2]; // returns 1 or 2
		briefAnswer.total = lastHistory[1];
		briefAnswer.playerChoiceWasRandom = (lastHistory[4] == 0);
		return briefAnswer;
}

wordTwoPlayer.saveOneRoundToDatabase = function(move)
{
	moves.createMove(move);
}

wordTwoPlayer.setChosenAnswerValueAndType = function(value)
{
	// dealing with random in wordTwoPlayer
	var answerTypeValue = [];
	// var answers = value.split(";");
	if(value == -1)
	{
		answerTypeValue[0]  = (Math.floor(Math.random() * 5) + 1) ;
		answerTypeValue[1] = 0;  //response trigerred after a period of inactivity: Random value generated
	}
	else
	{
		answerTypeValue[0]  = value;
		answerTypeValue[1] =  1;
	}	
	return answerTypeValue;
}

wordTwoPlayer.getNoActionVale = function()
{
	return -1;
}
module.exports = wordTwoPlayer;