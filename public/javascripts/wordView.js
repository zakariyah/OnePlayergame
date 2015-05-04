function pdPhase1(phase1Utilities)
{
	alert(phase1Utilities);
	var htmlString = "<div class=\"alert alert-warning\"> NEW ROUND </div>";
	var wordsToScramble = phase1Utilities.wordsToScramble;
	var word = "default";
	if(phase1Utilities.round < wordsToScramble.length)
	{
		word = wordsToScramble[phase1Utilities.round];
	}
	var optionMatrix = phase1Utilities.optionMatrix;
	htmlString += "";
    htmlString += ("<p> <strong class=\"alert alert-success\">How many words can you scramble from the word '"+word +"'</strong></p>");
    
    htmlString += ("<div class='row'><input type='number' min='0' id='numberOfScrambledWords' /></div>");
	htmlString +=("<div style='border: 1px #bce8f1 solid;   line-height: 120%;   font-size: 36px;  text-align: center; background-color: #d9edf7;   margin: 5px;'> <span id=\'timer\'></span> </div>" + "<div class='progress'><div id='progressBarMain' class='progress-bar progress-bar-success progress-bar-striped active' role='progressbar' aria-valuenow='5' aria-valuemin='0' aria-valuemax='100' style='width: 5%;'></div></div>"); 

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
	briefAnswer += "<table class='table table-bordered'><tr><td></td><td></td>";
	briefAnswer += "<tr><td>Number you unscrambled : </td><td>" + phase2Utilities.playerChoice + randomLabel + "</td></tr>";
	briefAnswer += "<tr><td>Number the other player unscrambled : </td><td>" + phase2Utilities.opponentChoice+ "</td></tr>";
	briefAnswer += "<tr><td>Your score</td><td>" + phase2Utilities.total + "</td></tr></table>";
	briefAnswer += "<p id='nextRoundCounter'> Next round starts in " + phase2Utilities.duration + " seconds</p>";
	briefAnswer += "<div class='progress'><div id='progressBar' class='progress-bar progress-bar-striped progress-bar-danger active' role='progressbar' aria-valuenow='5' aria-valuemin='0' aria-valuemax='100' style='width: 5%;'></div></div>";

	return  briefAnswer;
}

function makeSelectionImpossible()
{
  document.getElementById('numberOfScrambledWords').disabled = true;
}

function changeProgressBar(barId, rvalue, totalValue)
{
  var value = totalValue - rvalue;
  var ariaNow = value  * 100.0 / totalValue;
  var progressBar = document.getElementById(barId);
  progressBar.style.width = Math.floor(ariaNow) + "%";
}