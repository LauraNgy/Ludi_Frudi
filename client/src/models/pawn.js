const colours = require('./colours.js');
const boardPath = require('./board_path.js');
const PubSub = require('../helpers/pub_sub.js');
const starts = require('./starts.js');

const Pawn = function (id, position, colour) {
  this.id = id;
  this.position = position;
  this.colour = colour;
  this.stepcount = 0;
  this.status = 'home';
  this.initCoord = null;
}

Pawn.prototype.updateStatus = function () {
  if (boardPath.includes(this.position)) {
    this.status = 'board';
  }
};

Pawn.prototype.move = function (diceValue) {
  this.initCoord = boardPath.indexOf(this.position);
  if (this.initCoord === -1) {
    this.position = document.querySelector(`.board.path.${this.colour}`).id;
    this.status = 'board';
  } else {
    let newCoord = this.initCoord + diceValue;
    if (newCoord >= 48) {
      this.position = boardPath[newCoord - 48];
    } else {
      this.position = boardPath[newCoord];
    }
    this.stepcount += diceValue;
    if (this.stepcount > 48) {
      this.position = "7,7";
      this.status = 'finish';
    };
  };
};
module.exports = Pawn;
