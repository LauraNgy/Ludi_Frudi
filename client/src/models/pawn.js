const colours = require('./colours.js');
const boardPath = require('./board_path.js');

const Pawn = function (id, position, stepcount, status) {
  this.id = id;
  this.position = position;
  this.stepcount = 0;
  this.status = 'home';
  this.finishArray = ["7,12", "7,11", "7,10", "7,9"];
}



Pawn.prototype.start = function (colour) {
  this.position = colours[colour][0];
  this.status = 'board';
};

Pawn.prototype.move = function (steps) {
  const initCoord = boardPath.indexOf(this.position);
  let newCoord = initCoord + steps;
  if (newCoord > 48) {
    this.position = boardPath[newCoord - 48];
  } else {
  this.position = boardPath[newCoord];
  }
  this.stepcount += steps;
  if (this.stepcount > 48) {
    this.finishArray.forEach((finishCoord) => {
      // const finishDiv = document.querySelector(`#${finishCoord}`);
      // if (finishDiv.innerHTML === "") {
        this.position = finishCoord;
        this.status = 'finish';
      // }
    });
  }
};

module.exports = Pawn;
