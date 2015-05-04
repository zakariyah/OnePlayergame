var express = require('express');	
var router = express.Router();
var saveInformation = require('../controller/informationStore');
var saveMatrixAnswer = require('../controller/matrixAnswer');
var savePayment = require('../controller/paymentStore');
var savePostQuiz = require('../controller/postquizStore');
var saveHiitNumber = require('../controller/hiitNumberStore');
var entryVerifier = require('../controller/entryVerifier');
var calculatePayment = require('../controller/calculatePayment');
var gameProperties = require('../controller/gameProperties');
var countBeginning = gameProperties.countBeginning;
global.pageCount = 0;

numberOfTimes = 0;
router.get('/', function(req, res) {
  	res.render('index', { title: 'Entry', minTimeMins : 5, maxTimeMins : 20, currency:'AED', reward : 50
,maxbonus :20, playingtimes : 10, numPlayers : 6, waitingRoomTime : 30000});
});


router.post('/entry', function(req, res) {
	// console.log("entry post");
	var hiit = req.session.hiitNumber;
	if(typeof hiit === 'undefined')
	{
		res.render('information', { title: 'Entry', playerIsPresent : 'you are not known'});	
		return;
	}
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	entryVerifier(req, res, 'information', gameProperties.entryPage , hiit, countBeginning, 
		gameProperties.socketAddress, gameProperties.socketIOAddress);
});

router.post('/matrix', function(req, res) {
	// console.log("entry post");
	var hiit = req.session.hiitNumber;
	saveMatrixAnswer(req);
	res.render('matrix', { title: 'Matrix', hiitNumber : hiit});
});


router.get('/information', function(req, res) {
  	res.render('information', { title: 'Entry', playerIsPresent : ''});
});


router.post('/postquizsurvey', function(req, res) {
	req.body.playerid = req.session.hiitNumber;
	console.log("session is: " + req.body.playerid);
	savePostQuiz(req);	
	res.render('postquizsurvey', {title: 'Express'});
});

router.get('/quiz', function(req, res) {
  res.render('quiz', {title: 'Express', numbero: numberOfTimes });
});

router.post('/question', function(req, res) {
	saveInformation(req);
  	res.render('question', { title: 'Entry', minTimeMins : 5, maxTimeMins : 20, currency:'AED', reward : 50
,maxbonus :20, playingtimes : 10, numPlayers : 6, waitingRoomTime : 30000});
});

router.post('/tutorial', function(req, res) {
	var hiit = req.session.hiitNumber;
	if(!(typeof hiit === 'undefined'))
	{
		res.render('information', { title: 'Entry', playerIsPresent : 'There seem to be a game on in this browser. If not, try closing the browser'});	
		return;
	}
	// res.render('tutorial', { title: 'Entry', minTimeMins : 5, maxTimeMins : 20, currency:'AED', reward : 50,maxbonus :20, playingtimes : 10, numPlayers : 6, waitingRoomTime : 30000});		
	// console.log(gameProperties.tutorialPage);	
	saveHiitNumber(req, res, 'information', gameProperties.tutorialPage);
});

module.exports = router;