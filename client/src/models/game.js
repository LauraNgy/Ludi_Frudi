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
    });
  });
};

Game.prototype.playTurn = function (diceValue) {
<<<<<<< HEAD
  PubSub.subscribe('BoardView:pawn-selected', (event) => {
    const pawnID = event.detail;
    const thisPlayer = this.players.shift();
    console.log(this.players);
    thisPlayer.turn(diceValue);
    this.players.push(thisPlayer);

=======
  PubSub.subscribe('BoardView:player-pawn-selected', (event) => {
    const pawnID = event.detail.pawn;
    const player = event.detail.player;
    player.turn(diceValue, pawnID);
>>>>>>> 5a10ae5b5b8a4888c6403f1a937fb7a40d3713f6
  });
};

module.exports = Game;
