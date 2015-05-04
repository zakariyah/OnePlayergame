// saves the moves of player for each round
var mongoose = require('mongoose');
  var wordMoveSchema = new mongoose.Schema({
  gameid: { type: String },
  round: Number,
  playerid: String,
  action: String,     // 
  actionValue: Number,     // depending on the matrix
  playerid2: String,
  action2: String,
  actionValue2: Number,
  actiontype: String,  // indicates whether action was random or intentional 0 for random and 1 for intentional
  actiontype2 : String, 
  timeOfAction : Number,  // time taken to respond to action
  timeOfAction2 : Number,
  isAgent : String,  // indicates whether it is agent
  isAgent2 : String,
  hiitNumber1 : String,
  hiitNumber2 : String
});



wordMoveSchema.statics.createMove = function(move) {
    var newMove = new this({
       gameid: move.gameid,
   		 round: move.round,
   		 playerid: move.playerid,
   		 action: move.action,
   		 actionValue: move.actionValue,
       playerid2: move.playerid2,
       action2: move.action2,
       actionValue2: move.actionValue2,
       actiontype: move.actiontype,
       actiontype2: move.actiontype2,
timeOfAction : move.timeOfAction,
timeOfAction2 : move.timeOfAction2,
isAgent : move.isAgent,
isAgent2 : move.isAgent2,
hiitNumber1 : move.hiitNumber1,
hiitNumber2 : move.hiitNumber2
    });

    newMove.save(function(err) {
        if (err)
            // console.log(err);
            throw new Error('Could not create move');
    })
}

wordMoveSchema.statics.getMovesFromHiitNumber = function(hiitInfo, callback) {
   this.find({ $and : [
    {gameid : hiitInfo.gameid},
    {$or : [{hiitNumber1 : hiitInfo.id}, {hiitNumber2 : hiitInfo.id}]}
    ]}, callback);
}


var WordMoves2 = mongoose.model('WordMoves', wordMoveSchema);
module.exports = WordMoves2;