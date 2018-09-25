const colours = require('./colours.js');
const boardPath = require('./board_path.js');
const PubSub = require('../helpers/pub_sub.js');
const homes = require('./homes.js');

const Pawn = function (id, position) {
  this.id = id;
  this.position = position;
  this.stepcount = 0;
  this.status = 'home';
}

Pawn.prototype.start = function (colour) {
  this.position = colours[colour][0];
  this.status = 'board';
};

Pawn.prototype.move = function (diceValue, finishArray) {
    const initCoord = boardPath.indexOf(this.position);
    let newCoord = initCoord + diceValue;
    if (newCoord > 48) {
      this.position = boardPath[newCoord - 48];
    } else {
    this.position = boardPath[newCoord];
    }
    this.stepcount += diceValue;
    if (this.stepcount > 48) {
          this.position = "7,7";
          this.status = 'finish';

    };

    PubSub.publish('Pawn:position-calculated', this.position);
};

module.exports = Pawn;
