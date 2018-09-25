const Player = require('./player.js');
const PubSub = require('../helpers/pub_sub.js');

const Game = function () {
  this.players = [];
  this.winner = null;
}


Game.prototype.getPlayers = function () {
  PubSub.subscribe('PlayerView:players-submitted', (event) => {
    const playerColours = event.detail;
    playerColours.forEach( colour => {
      const player = new Player(colour);
      this.players.push(player);
      PubSub.publish('Game:colour-chosen', colour);
    });
    console.log(this);
  });
};

Game.prototype.playTurn = function (diceValue) {
  // console.log("platTurn works");
  PubSub.subscribe('BoardView:pawn-selected', (event) => {
    // console.log(event.detail);
    const pawnID = event.detail;
    // const thisPlayer = this.players.shift();
    console.log(this.players);
    thisPlayer.turn(diceValue);
    this.players.push(thisPlayer);

  });
};
;


module.exports = Game;
