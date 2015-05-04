function pdPhase1(phase1Utilities)
{
	var htmlString = "<div class=\"alert alert-warning\"> NEW ROUND </div>";
	var matrixAsSeenByPlayer = phase1Utilities.payoffMatrix;
	var optionMatrix = phase1Utilities.optionMatrix;
	htmlString += "";
    htmlString += ("<p> <strong class=\"alert alert-success\">Payoff Structure</strong></p><table class='table table-bordered table-condensed'><tr class=\"danger\"><th>Option</th> <th>You will get</th> <th>The other person will get</th> </tr><tr  class=\"danger\"><td><input type=\"radio\" name=\"choiceAction\" id=\'first\' onclick=\'return setTimeOfEvent()\' value=\"1\"> " + optionMatrix[0] + ": </td><td>"+ matrixAsSeenByPlayer[0][0] + "</td><td>"+ matrixAsSeenByPlayer[0][1] + "</td></tr><tr  class=\"danger\"><td><input type=\"radio\" name=\"choiceAction\" id=\'second\' onclick=\'return setTimeOfEvent()\' value=\"2\"> " + optionMatrix[1] + ": </td><td>"+ matrixAsSeenByPlayer[1][0] + "</td><td>"+ matrixAsSeenByPlayer[1][1] + "</td></tr></table><div style='border: 1px #bce8f1 solid;   line-height: 120%;   font-size: 36px;  text-align: center; background-color: #d9edf7;   margin: 5px;'> <span id=\'timer\'></span> </div>" + "<div class='progress'><div id='progressBarMain' class='progress-bar progress-bar-success progress-bar-striped active' role='progressbar' aria-valuenow='5' aria-valuemin='0' aria-valuemax='100' style='width: 5%;'></div></div>"); 

	return htmlString;
}

function pdPhase2(phase2Utilities)
{
	if(phase2Utilities == 0)
	{
		// first round
		return "";
	}
	var randomLabel = phase2Utilities.playerChoiceWasRandom ? "<span class=\"badge  pull-right\">R</span>" : "";
	var briefAnswer = "<div class=\"alert alert-warning\"> Round " + phase2Utilities.round + " results</div>";
	briefAnswer += "<table class='table table-bordered'><tr><td></td><td></td><td> You got</td></tr>";
	briefAnswer += "<tr><td>Your Choice : </td><td>" + phase2Utilities.playerChoice + randomLabel + "</td><td>" + phase2Utilities.playerGotFromItself+"</td></tr>";
	briefAnswer += "<tr><td>Opponent Choice : </td><td>" + phase2Utilities.opponentChoice+ "</td><td>" + phase2Utilities.playerGotFromOpponent +"</td></tr>";
	briefAnswer += "<tr><td>Total</td><td></td><td>" + phase2Utilities.total + "</td></tr></table>";
	briefAnswer += "<p id='nextRoundCounter'> Next round starts in " + phase2Utilities.duration + " seconds</p>";
	briefAnswer += "<div class='progress'><div id='progressBar' class='progress-bar progress-bar-striped progress-bar-danger active' role='progressbar' aria-valuenow='5' aria-valuemin='0' aria-valuemax='100' style='width: 5%;'></div></div>";

	return  briefAnswer;
}

function makeSelectionImpossible()
{
  document.getElementById('first').disabled = true;
  document.getElementById('second').disabled = true;
}

function changeProgressBar(barId, rvalue, totalValue)
{
  var value = totalValue - rvalue;
  var ariaNow = value  * 100.0 / totalValue;
  var progressBar = document.getElementById(barId);
  progressBar.style.width = Math.floor(ariaNow) + "%";
}