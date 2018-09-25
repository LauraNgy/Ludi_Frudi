const colours = require('./colours.js');
const boardPath = require('./board_path.js');
const PubSub = require('../helpers/pub_sub.js');

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

Pawn.prototype.move = function (finishArray) {
  PubSub.subscribe('DiceView:dice-roll-result-loaded', (event) => {
    const diceValue = event.detail;
    const initCoord = boardPath.indexOf(this.position);
    let newCoord = initCoord + diceValue;
    if (newCoord > 48) {
      this.position = boardPath[newCoord - 48];
    } else {
    this.position = boardPath[newCoord];
    }
    this.stepcount += diceValue;
    if (this.stepcount > 48) {
      finishArray.forEach((finishCoord) => {
        // const finishDiv = document.querySelector(`#${finishCoord}`);
        // if (finishDiv.innerHTML === "") {
          this.position = finishCoord;
          this.status = 'finish';
        // }
      });
    });
};

module.exports = Pawn;
