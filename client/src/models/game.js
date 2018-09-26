const Player = require('./player.js');
const Pawn = require('./pawn.js');
const PubSub = require('../helpers/pub_sub.js');
const homes = require('./homes.js');

const Game = function () {
  this.players = [];
  this.winner = null;
  this.board = null;
}


Game.prototype.bindEvents = function () {
  PubSub.subscribe('PlayerView:players-submitted', (event) => {
    const playerColours = event.detail;
    playerColours.forEach( colour => {
      const player = new Player(colour);
      player.status = 'Playing';
      for (let i = 1; i <=4; i++) {
        const pawn = new Pawn(`${colour}${i}`, homes[colour][i-1], colour);
        player.pawns.push(pawn);
      }
      this.players.push(player);
    });
    console.log(this.players);
    PubSub.subscribe('DiceView:dice-value', (event) => {
      const diceValue = event.detail;
      if (this.board === null) {
        PubSub.publish('Game:game-state', this.players[0]);
        this.board = 1;
      } else {
        this.playTurn(diceValue);
      }
    });

    // console.log(this.players[0].pawns[0].position);
  });
};

Game.prototype.playTurn = function (diceValue) {

  PubSub.subscribe('PawnView:player-pawn-selected', (event) => {
    const pawnID = event.detail.pawn;
    const player = event.detail.player;
    player.turn(diceValue, pawnID);
    PubSub.publish('Game:game-state', this.players[0]);
  });
};


module.exports = Game;
