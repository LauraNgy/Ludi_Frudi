const Player = require('./player.js');
const Pawn = require('./pawn.js');
const PubSub = require('../helpers/pub_sub.js');
const starts = require('./starts.js');

const Game = function () {
  this.players = [];
  this.winner = null;
}



Game.prototype.bindEvents = function () {
  const playersArray = [];
  PubSub.subscribe('PlayerView:players-submitted', (event) => {
    const playerColours = event.detail;
    playerColours.forEach( colour => {
      const player = new Player(colour);
      player.status = 'Playing';
      playersArray.push(player);
      for (let i = 1; i <=4; i++) {
        const pawn = new Pawn(`${colour}${i}`, starts[colour][i-1], colour);
        pawn.updateStatus();
        player.pawns.push(pawn);
      };
    });
    this.players = playersArray;
    if (this.winner === null) {
      PubSub.subscribe('PawnView:game-info-ready', (event) => {
        console.log(event);
        const nowPlayer = this.players.shift();
        this.players.push(nowPlayer);
        if (event.detail.pawnId.includes(nowPlayer.colour)) {
          nowPlayer.playTurn(event.detail.diceValue, event.detail.pawnId);
          if (nowPlayer.status === 'Won') {
            this.winner = nowPlayer;
          }
        }
        PubSub.publish('Game:game-state', this.players);
      });
      PubSub.publish('Game:game-state', this.players);
    };
  });
};

module.exports = Game;
