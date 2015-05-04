var gameProperties = {};
gameProperties = require('../settings');

// var settings = require('../settings');
var phase1Utilities = {};
phase1Utilities.payoffMatrix = gameProperties.gameMatrix;
phase1Utilities.duration = gameProperties.phase1Duration;
phase1Utilities.optionMatrix = gameProperties.optionMatrix;
phase1Utilities.wordsToScramble = gameProperties.wordsToScramble;
// var phase2Utilities = {};
// phase2Utilities.duration = gameProperties.phase2Duration;

gameProperties.phase1Utilities = phase1Utilities;
// gameProperties.phase2Utilities = phase2Utilities;

module.exports = gameProperties;