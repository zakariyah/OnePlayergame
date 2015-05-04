var moves = require('./model/espactionmodel');
var esp = require('./gamesConfig/espGame.json');
esp.gameTypes  =    [ 'normal'
];
esp.gamePhase1 = "";
esp.gamePhase2 = "";
esp.gamePhase3 = "";




esp.gameRounds = function()
{
	// returns leastNumberOfRounds + a number less than or equal to variableAdditionOfRounds
	return esp.leastNumberOfRounds + Math.floor((Math.random() * esp.variableAdditionOfRounds));
}
esp.moves = moves;

esp.calculator = function(optionChosen, playerNumber) //yourChoice, opponentChoice)
{
	// returns the player Number payoff. player number can be 1 or 2
	// option chosen is a list of length 2 containing player1choice then player2choice
	// each element in optionChosen contains the two choices concantenated with a semicolon
	// 1 represent yes while 2 represent no
	if(playerNumber == 2)
	{
		optionChosen = [optionChosen[1], optionChosen[0]]; 
	}
	var myChoices = optionChosen[0].split(";");
	var opponentChoices = optionChosen[1].split(";");
	myYN = myChoices[0] % 2; // to convert 2 to zero
	myP = myChoices[1];
	otherYN = opponentChoices[0] % 2; // to convert 2 to zero
	otherP = opponentChoices[1];
	var score = 2 + otherYN * Math.log(myP) + (1 - otherYN) * Math.log(1 - myP) + myYN * Math.log(myP/otherP) + (1 - myYN) * Math.log(otherP/myP);
	return Number(score.toFixed(2)); 
	
}

esp.getBriefAnswerFromHistory = function(lastHistory)
{
		var briefAnswer = {};
		var playerChoice = lastHistory[0].split(";");
		var opponentChoice = lastHistory[2].split(";");
		briefAnswer.playerYN = playerChoice[0] ;
		briefAnswer.playerP = playerChoice[1];
		briefAnswer.opponentYN = opponentChoice[0];
		briefAnswer.opponentP = opponentChoice[1];

		// briefAnswer.playerGotFromItself = 5;
		// briefAnswer.playerGotFromOpponent = 5
		briefAnswer.total = lastHistory[1];
		// briefAnswer.total = briefAnswer.playerGotFromItself + briefAnswer.playerGotFromOpponent;
		briefAnswer.playerChoiceWasRandom = (lastHistory[4] == 0);

		return briefAnswer;
}

esp.saveOneRoundToDatabase = function(move)
{
	moves.createMove(move);
}

esp.setChosenAnswerValueAndType = function(value)
{
	// dealing with random in esp
	var answerTypeValue = [];
	var answers = value.split(";");
	if(answers[0] == 0)
	{
		answerTypeValue[0]  = (Math.floor(Math.random() * 2) + 1) + ";" + answers[1];
		answerTypeValue[1] = 0;  //response trigerred after a period of inactivity: Random value generated
	}
	else
	{
		answerTypeValue[0]  = value;
		answerTypeValue[1] =  1;
	}	
	return answerTypeValue;
}

esp.getNoActionVale = function()
{
	return '0;0.01';
}
module.exports = esp;