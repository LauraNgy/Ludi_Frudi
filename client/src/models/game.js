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
      player.status = 'Playing';
      this.players.push(player);
      PubSub.publish('Game:players-chosen', player);
      // console.log("player");
    });
  });
};

Game.prototype.playTurn = function (diceValue) {
  PubSub.subscribe('PawnView:player-pawn-selected', (event) => {
    const pawnID = event.detail.pawn;
    const player = event.detail.player;
    player.turn(diceValue, pawnID);
  });
};
;


module.exports = Game;
