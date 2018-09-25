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
  });
};

Game.prototype.playTurns = function () {
  while (this.winner === null) {
    this.players.forEach( (player) => {
        PubSub.subscribe('BoardView:pawn-selected', (event) => {
          const pawnID = event.detail;
          const pawnCopy = pawnID;
          pawnCopy.pop();
          if (player.colour === pawnCopy) {
            player.turn(pawnID, diceValue);
            if (player.won === 4) {
              this.winner = player;
            }
          }
        });
      });
    });
  };
};

module.exports = Game;
