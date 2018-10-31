const colours = require('./colours.js');
const ends = require('./ends.js');
const PubSub = require('../helpers/pub_sub.js');

const Player = function (colour) {
  this.colour = colour;
  this.status = 'Not';
  this.pawns = [];
  this.finishArray = [];
  this.won = 0;
  this.activePawn = null;
  this.diceValue = 0;
};

Player.prototype.playTurn = function (diceValue, pawnId) {
  if (this.won < 4) {
    const pawn = this.pawns.find( (pawn) => pawn.id === pawnId);
    pawn.move(diceValue);
    if (pawn.status === 'finish') {
      pawn.position = ends[`${this.colour}`][this.won];
      this.won +=1;
    }
  } else {
    this.status = 'Won';
  };
};



module.exports = Player;
