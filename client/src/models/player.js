const colours = require('./colours.js');
const PubSub = require('../helpers/pub_sub.js');

const Player = function (colour) {
  this.colour = colour;
  this.status = 'Not';
  this.pawns = [];
  this.finishArray = [];
  this.won = 0;
};

Player.prototype.getFinishArray = function () {
  for (let i = 1; i <= 4; i++) {
    this.finishArray.push(colours[this.colour][i]);
  }
};



Player.prototype.turn = function (pawnID, diceValue) {
  const playerPawn = this.pawns.find( (pawn) => {
    return pawnID === pawn.id;
  });
  if (diceValue === 6) {
    if (playerPawn.status === 'home'){
      playerPawn.start(this.colour);
    }
  } else {
    playerPawn.move(diceValue, this.finishArray);
    if (playerPawn.status === 'finish') {
      this.won += 1;
    }
  }
};

module.exports = Player;
