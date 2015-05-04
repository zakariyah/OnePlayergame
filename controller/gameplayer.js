var gameProperties = require('../controller/gameProperties');
function gameplayer(id, socket, hiitNumber) // index can take one or two
{	
	this.id = socket.id;
	
	if(typeof hiitNumber === 'undefined')
	{
		this.hiitNumber = 0;
	}
	else
	{
		this.hiitNumber = hiitNumber;	
	}

	this.timeOfAction = -1;

	this.getTimeOfAction = function()
	{
		return this.timeOfAction;
	}

	this.setTimeOfAction = function(timeT)
	{
		this.timeOfAction = timeT;
	}

	this.setSocket = function(sessionSocket)
	{
		this.sessionSocket = sessionSocket;
	}

	this.sessionSocket = socket;
	this.history = [];
	
	this.addToHistory =  function(arrayOfValues){
		this.history.push(arrayOfValues) // json value
	};

	this.addAnswer = function(content)
	{
		this.addToHistory(content);
		this.sendMessageToClient();
	}

	this.sendMessageToClient = function()
	{
		var roundValue = this.history.length;
		var gameRoundsValue = gameProperties.gameRounds();
		var tChoices = gameProperties.timeForChoices;	
		var pageUrlValue = gameProperties.pageUrl;	
		var numberOfAnswersValue = gameProperties.numberOfAnswers;
		this.sessionSocket.emit('serverMessage', {round : roundValue, totalRounds : gameRoundsValue, timeForChoices : tChoices, pageUrl : pageUrlValue, numberOfAnswers : numberOfAnswersValue});
	}
}

module.exports = gameplayer;