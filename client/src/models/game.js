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
      player.status = 'Playing';
      PubSub.publish('Game:player-chosen', player);
    });
    console.log(this.players);
  });
};

Game.prototype.playTurn = function (diceValue) {
  PubSub.subscribe('BoardView:pawn-selected', (event) => {
    const pawnID = event.detail;
    const thisPlayer = this.players.shift();
    console.log(this.players);
    thisPlayer.turn(diceValue);
    this.players.push(thisPlayer);

  });
};

module.exports = Game;
