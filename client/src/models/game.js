const Player = require('./player.js');
const PubSub = require('../helpers/pub_sub.js');

const Game = function (players) {
  this.players = players;
  this.winner = null;
}

Game.prototype.getPlayers = function () {
  this.players.filter( player => player.status === 'Playing');
};

Game.prototype.playTurns = function () {
  while (!winner) {
    this.players.forEach( (player) => {
      PubSub.subscribe('DiceView:dice-roll-result-loaded', (event) => {
        const diceValue = event.detail;
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
