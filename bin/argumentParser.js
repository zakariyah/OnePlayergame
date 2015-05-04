function exitProgram()
{
	console.log(" Please indicate the game type as the third argument");
	console.log("Acceptable game types are pd and esp");
	process.exit(0);
}

var arguments = process.argv;
if(arguments.length != 3)
{
	exitProgram();
}
var gameType = "";
var gameTypes = {"esp" : true, "matrix" : true, "wordTwoPlayer" : true};
if(arguments[2] in gameTypes)
{
	gameType = arguments[2]
}
else
{
	exitProgram();
}

module.exports = gameType;