// saves the moves of player for each round
var mongoose = require('mongoose');
  var moveSchema = new mongoose.Schema({
  gameid: { type: String },
  round: Number,
  hiitNumber : String,
  answer : Number
});



moveSchema.statics.createMove = function(move) {

    var newMove = new this({
       gameid: move.gameid,
   		 round: move.round,
   		 playerid: move.playerid,
       hiitNumber : move.hiitNumber,
   		 answer: move.answer
    });

    newMove.save(function(err) {
        if (err)
            throw new Error('Could not create move');
    })
}

var Moves2 = mongoose.model('Moves2', moveSchema);
module.exports = Moves2;