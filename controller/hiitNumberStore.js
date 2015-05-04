var hiitNumber = require('../model/hiitNumber');
var enteredGame = require('../model/enteredGame');
var gameProperties = require('./gameProperties');

var saveHiitNumber = function(req, res, playerPresent, playerAbsent)
{
	// check player has entered into the entry page before allowing to proceed
	var hiitNumberInfo = req.body;
	hiitNumberInfo['gameid'] = gameProperties.gameId;
	var playerId = hiitNumberInfo['id'];
	enteredGame.findHiitNumberPresentInGame(hiitNumberInfo, function(err, result)
	{
		if(err)
			throw err;
		if(result != null)
		{
			if(result.length == 0)
			{
				req.session.hiitNumber = playerId;
				hiitNumber.createHiitSchema(hiitNumberInfo);
				res.render(playerAbsent, gameProperties); // to tutorial page
			}
			else
			{
				res.render(playerPresent, { title: 'Entry', playerIsPresent : 'You are already registered in the system as having participated in the study'});
			}
		}
	});
};
module.exports = saveHiitNumber;