const colours = require('./colours.js');
const boardPath = require('./board_path.js');
const PubSub = require('../helpers/pub_sub.js');
const homes = require('./homes.js');

const Pawn = function (id, position, colour) {
  this.id = id;
  this.position = position;
  this.colour = colour;
  this.stepcount = 0;
  this.status = 'home';
}

Pawn.prototype.start = function () {
  this.position = document.querySelector(`.board.path.${this.colour}`).id;
  this.status = 'board';
};

Pawn.prototype.move = function (diceValue) {
    const initCoord = boardPath.indexOf(this.position);
    if (initCoord === -1 || this.position === '7,7') {
      this.position = document.querySelector(`.board.path.${this.colour}`).id;
      this.status = 'board';
    } else {
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
    }
    // console.log("new:", this.position);
    // console.log("new:",this.status);
    // console.log("new:", this.id);
    console.log(this);
    PubSub.publish('Pawn:position-calculated', this);
};
module.exports = Pawn;
