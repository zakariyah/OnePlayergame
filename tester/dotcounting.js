var sqaureLength = 300;
var circleDiameter = 10;
var beginningXCentre = 30;
var numberOfTrials = 10;
var trialNumber = 0;
var numberOfCircles = 20;
var randomNumberOfCirclesOnLeft = generateDRandomIntegersFromXtoY(10, 0, numberOfCircles, true);
var playerChoice = [];


function getCanvasAnddrawDiagonal()
{
	document.getElementById('rectanglePage').innerHTML  ="<canvas id='myCanvas' width='300' height='300' style='background-color:#aaaaaa'></canvas>";
	var canvas = document.getElementById("myCanvas");
	var ctxl = canvas.getContext("2d");
	ctxl.moveTo(0,0);
	ctxl.lineTo(sqaureLength,sqaureLength);
	ctxl.stroke();
}

function drawCircles(indices, centers, diameter)
{
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	var radius = diameter/2;
	for(var i = 0; i < indices.length; i++)
	{
		var center = centers[indices[i]];
		ctx.beginPath();
		ctx.arc(center[0],center[1],radius,0,2*Math.PI);
		ctx.stroke();
		ctx.fillStyle = "#FF0000";
		ctx.fill();
	}
}

function generateDRandomIntegersFromXtoY(d, x, y, withRepititionAndWithoutMiddle)
{
	var keysSet = {};
	var keysSetValues = [];
	while(keysSetValues.length < d)
	{
		var randomValue = Math.floor((Math.random() * y - x)) +x;
		if(withRepititionAndWithoutMiddle)
		{
			if(randomValue == y/2)
				continue;
			keysSetValues.push(randomValue);
			continue;
		}
		if(!(randomValue in keysSet))
		{
			keysSet[randomValue] = true;
			keysSetValues.push(randomValue);
		}
	}
	return keysSetValues;
}


function createDotCounter(numberOfDotsOnLeft, totalNumberOfDots)
{
	var xCentre = beginningXCentre + Math.floor((Math.random() * 10)); // get number between 30(inclusive) and 40 
	var numberOfDotsOnRight = totalNumberOfDots - numberOfDotsOnLeft;
	var circleCenresLeft = [];
	var circleCenresRight = [];
	for(var i = 0; i < totalNumberOfDots; i++)
	{
		// starting with a value between 30 and 40, increase the center by a value 1 greater than the diameter
		// choose a value for y in the permissible range of values
		circleCenresLeft[i] = [0, 0];
		circleCenresLeft[i][0] = xCentre + (i * circleDiameter) + 1;
		var min = circleCenresLeft[i][0] * 1.25;
		var max = sqaureLength - circleDiameter;
		circleCenresLeft[i][1] = min + Math.floor((Math.random() * (max - min)));


		//  for the right side
		circleCenresRight[i] = [0, 0];
		circleCenresRight[i][0] = xCentre + (i * circleDiameter) + 1;
		var min = circleDiameter + 1;
		var max = circleCenresRight[i][0] * 0.8;
		circleCenresRight[i][1] = min +  Math.floor((Math.random() * (max - min)));
	}

	var leftIndices = generateDRandomIntegersFromXtoY(numberOfDotsOnLeft, 0, totalNumberOfDots, false);
	var rightIndices = generateDRandomIntegersFromXtoY(numberOfDotsOnRight, 0, totalNumberOfDots, false);
	drawCircles(leftIndices, circleCenresLeft, circleDiameter);
	drawCircles(rightIndices, circleCenresRight, circleDiameter);
	setTimeout(removeRectangleAndShowAnswerPage, 2000);
}

function clearCanvas()
{
	document.getElementById('rectanglePage').innerHTML = "";
}

function showAnswerPage()
{
	var answerHtml = "<div class='form-group'><label for='exampleInputEmail1' class='col-sm-6 control-label'> Which side had the higher number of circles:</label>";
	answerHtml += "<div class='col-sm-6'><select id='answerChoice' class='form-control' >";
	answerHtml += "<option value='left'>LEFT</option><option value='right'>RIGHT</option> </select>";
	answerHtml += "</div></div>";

	answerHtml += "<div class='form-group'>";
	answerHtml += "<div class='col-md-offset-4 col-sm-4 '><input type='button' id='nextButton' value='NEXT' onClick='showNextTrial();' />";
	answerHtml += "</div></div>";
	// var answerHtml = "<p> Which side had the higher number of circles. <select id='answerChoice'><option value='left'>LEFT</option><option value='right'>RIGHT</option></select><input type='button' id='nextButton' value='NEXT' onClick='showNextTrial();' />";
	document.getElementById('answers').innerHTML = answerHtml;
}

function showNextTrial()
{
	setServerMessageToDisplay();
	document.getElementById('answers').innerHTML = "";
	trialNumber += 1;
	if( trialNumber < numberOfTrials)
	{
		// clearCanvas();
		getCanvasAnddrawDiagonal();
		createDotCounter(randomNumberOfCirclesOnLeft[trialNumber], numberOfCircles);	
	}
	else
	{
		document.getElementById('rectanglePage').innerHTML = "Thank you very much";
		
	}
}


function removeRectangleAndShowAnswerPage()
{
	clearCanvas();
	showAnswerPage();
}


function setServerMessageToDisplay()
{
	var choice = document.getElementById('answerChoice').value;
	playerChoice.push(choice);
	var messageHTML = "<table class='table-condensed'>";
	messageHTML += "<tr><td>Trial Number</td><td>Circles on left</td><td>Player's choice</td></tr>";
	for(var i = 0; i <= trialNumber; i++)
	{
		messageHTML += ("<tr><td>" + (i + 1) + " </td><td>" + randomNumberOfCirclesOnLeft[i] + " </td><td>" + playerChoice[i] + "</td></tr>");
	}	

	messageHTML += "</table>";

	document.getElementById('results').innerHTML = messageHTML;
}