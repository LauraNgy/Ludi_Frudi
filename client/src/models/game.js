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
    console.log(this.players);
    this.winner = this.players[0];
    this.players.forEach( (player) => {
      PubSub.subscribe('DiceView:dice-roll-result-loaded', (event) => {
        const diceValue = event.detail;
        console.log(diceValue);
    //     PubSub.subscribe('BoardView:pawn-selected', (event) => {
    //       const pawnID = event.detail;
    //
    //       if (player.colour === pawnCopy) {
    //         player.turn(pawnID, diceValue);
    //         if (player.won === 4) {
    //           this.winner = player;
    //         }
    //       }
        // });

      });
    });
  };
};

Game.prototype.testpublishing = function () {
  PubSub.subscribe('BoardView:pawn-selected', (event) => {
    // console.log(event.detail);
  });
};

module.exports = Game;
