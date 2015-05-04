// saves the players that have started pla
var mongoose = require('mongoose');
  var enteredGameSchema = new mongoose.Schema({
  gameid: { type: String }
  , playerid: { type: String }
});

enteredGameSchema.statics.createEnteredGame = function(hiitInfo) {

    var newEnteredGame = new this({
       playerid: hiitInfo.id,
       gameid: hiitInfo.gameid,
    });
    newEnteredGame.save(function(err) {
        if (err)
            throw new Error('Could not create move');
    })
}

enteredGameSchema.statics.findHiitNumberPresentInGame = function(hiitInfo, callback) {
    
   this.find({playerid : hiitInfo.id, gameid : hiitInfo.gameid}, callback);
}


var enteredGame = mongoose.model('enteredGame',enteredGameSchema);
module.exports = enteredGame;