const colours = require('./colours.js');
const PubSub = require('../helpers/pub_sub.js');

const Player = function (colour) {
  this.colour = colour;
  this.status = 'Not';
  this.pawns = [];
  this.finishArray = [];
  this.won = 0;
  this.activePawn = null;
};

Player.prototype.getFinishArray = function () {
  for (let i = 1; i <= 4; i++) {
    this.finishArray.push(colours[this.colour][i]);
  }
};

Player.prototype.listenToActivePawn = function () {
  PubSub.subscribe('PawnView:player-pawn-selected', (event) => {
    const clickedPawn = event.detail;
    if (clickedPawn.includes(this.colour)) {
      this.activePawn = clickedPawn;
    }
  });
};


Player.prototype.turn = function (diceValue, pawnID) {
    const playerPawn = this.pawns.find( (pawn) => {
      return pawnID === pawn.id;
    });
      playerPawn.move(diceValue, this.finishArray);
      if (playerPawn.status === 'finish') {
        this.won += 1;
    };
};

module.exports = Player;
