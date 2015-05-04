function getFinalForm()
{
  var finalForm = "<form name='answerForm' method='post' action='./matrix' class='form-horizontal' role='form'><div class='form-group'>";
  finalForm += "<div class='form-group'><label for='exampleInputEmail1' class='col-sm-5 control-label'>How many matrices did you manage to solve</label>";  
  finalForm += "<div class='col-sm-3 col-sm-offset-4'><input name='answer' type='number' class='form-control' size='2' maxLength='2' min='0' max='"+numberOfMatrices+"'/> </div></div>";
  finalForm += " <div class='form-group'><div class='col-sm-offset-6 col-sm-6'>";
  finalForm += "<input name='proceed' type='submit' class='btn btn-primary' value='Submit'/></div></div>";
   return finalForm;
}




function createMatrixHtml(matrixValuesInt, roundNumber)
{
  var row = 4;
  var column = 3;
  var colorsToUse = ['#ffffff', '#aaaaaa'];
  var colorsToUseValue = colorsToUse[roundNumber % 2];
  var matrixToSend = "<table class='table-condensed col-lg-6  col-centered' style='background-color:"+ colorsToUseValue+"'>";
  for(var i = 0; i < column; i++)
  {
    matrixToSend += "<tr>";
    for(var j = 0; j < row; j++)
    {
      matrixToSend += "<td>" + matrixValuesInt[ i * row + j] ;
      if(j != row -1)
      {
        matrixToSend += ",</td>";
      }
      else
      {
        matrixToSend += "</td>";  
      }
      
    }
    matrixToSend += "</tr>";
  }
    matrixToSend += "</table>";
    // alert(matrixToSend);
  return matrixToSend;
}
function setMatrixWithNumber(matrixId)
{
  var matrixValues = [[5.45, 1.21, 6.96, 2.08, 2.75, 1.86, 6.05, 8.79, 2.27, 3.74, 8.37, 9.25], [9.1, 5.77, 5.95, 9.17, 6.98, 4.28, 3.02, 2.74, 7.91, 4.89, 1.63, 1.29], [2.0, 3.38, 1.6, 6.69, 1.27, 3.82, 8.96, 7.02, 1.52, 4.67, 8.73, 5.48], [4.05, 9.92, 9.38, 7.91, 5.52, 7.89, 1.16, 1.4, 8.6, 5.02, 2.6, 4.34], [9.95, 2.36, 5.46, 3.23, 8.98, 0.95, 2.92, 8.53, 5.34, 1.46, 8.62, 6.77], [8.7, 1.42, 1.3, 1.25, 9.36, 8.09, 6.1, 9.1, 9.13, 6.73, 1.19, 9.45], [2.18, 2.39, 9.06, 1.41, 9.99, 5.18, 7.77, 7.65, 2.02, 7.82, 8.69, 7.7], [7.97, 7.17, 2.03, 3.09, 1.44, 8.3, 2.34, 7.27, 7.76, 8.5, 3.82, 2.07], [1.11, 9.08, 0.92, 3.12, 7.78, 9.94, 1.76, 2.06, 6.56, 2.47, 3.51, 7.93], [3.87, 6.04, 8.4, 0.95, 2.34, 4.53, 0.18, 4.08, 4.47, 5.53, 2.2, 3.96], [9.53, 7.36, 7.84, 2.54, 4.34, 9.65, 7.71, 0.84, 9.51, 1.78, 3.77, 7.46], [8.89, 9.56, 9.39, 5.83, 0.1, 0.61, 3.05, 9.8, 1.48, 3.15, 9.99, 3.46], [0.65, 2.94, 4.23, 0.42, 2.41, 1.99, 1.16, 5.71, 0.62, 2.69, 4.63, 5.37],
[4.24, 4.49, 2.22, 6.82, 1.54, 4.44, 6.69, 3.45, 8.43, 3.18, 8.95, 5.07],
[8.61, 3.35, 8.45, 3.65, 1.39, 6.48, 5.43, 7.3, 8.68, 2.43, 7.33, 1.31],
[2.07, 4.27, 1.67, 7.66, 8.82, 7.28, 0.72, 2.34, 3.85, 2.12, 9.27, 1.88],
[2.9, 4.18, 4.28, 6.08, 8.83, 7.74, 1.8, 4.78, 1.6, 5.72, 2.72, 8.89],
[9.48, 0.52, 2.57, 2.42, 3.3, 1.36, 9.75, 5.63, 8.62, 3.18, 2.36, 3.58],
[9.31, 0.48, 7.4, 0.66, 2.62, 9.58, 5.46, 0.96, 3.11, 9.34, 4.66, 0.12],
[8.27, 3.02, 8.15, 5.06, 0.77, 1.24, 4.81, 3.39, 7.86, 2.52, 9.23, 6.33]];
  if(matrixValues.length < matrixId || matrixId > numberOfMatrices)
  {
    return getFinalForm();
  }
  return createMatrixHtml(matrixValues[matrixId - 1], matrixId);
}

function setCountDownTimerForMatrix()
{
  var mainCount = timeGivenForMatrix * numberOfMatrices;
  var count = timeGivenForMatrix * numberOfMatrices;
  var interval = 1000;
  var before = new Date();  
  var leftValue = 0;
  var counter=setInterval(timer, 1000);
  function timer()
  {
    // count = count - 1;
    var now = new Date();
    var elapsedTime = (now.getTime() - before.getTime());
    elapsedTime = Math.floor(elapsedTime/interval); 
    // leftValue += Math.floor(elapsedTime/interval);
    count = mainCount - elapsedTime;
    if (count % timeGivenForMatrix == 0)
    {
      var matrixNumber = parseInt(document.getElementById("matrixNumber").innerHTML) + 1; 
      document.getElementById("matrix").innerHTML = setMatrixWithNumber(matrixNumber);
      document.getElementById("matrixNumber").innerHTML = matrixNumber;
    }
    if(count <= 0)
    {
        clearInterval(counter);
        document.getElementById("mainTimerDiv").innerHTML = "";
        document.getElementById("matrixHead").innerHTML = "";
        document.getElementById("topmost").innerHTML = "";
        document.getElementById("matrix").innerHTML = getFinalForm();
        return;  
    }
    var rem = count % timeGivenForMatrix;
    var toShow = "You have " + rem + "</span> second";
    if(!(rem == 1 || rem == 0))
    {
      toShow += "s";
    }
    toShow +=  " left for this matrix";
    document.getElementById("mainTimerDiv").innerHTML = toShow;
  }
}

setCountDownTimerForMatrix();