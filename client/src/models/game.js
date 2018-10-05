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
        console.log(pawn);
        player.pawns.push(pawn);
      }
      player.listenToActivePawn();
      this.players.push(player);
    });
    // console.log(this.players);
    PubSub.subscribe('DiceView:dice-value', (event) => {
      const diceValue = event.detail;
      if (this.board === null) {
        PubSub.publish('Game:game-state', this.players);
        this.board = 1;
      } else {
        const nowPlayer = this.players.shift();
        console.log(nowPlayer);
        nowPlayer.turn(diceValue, nowPlayer.activePawn);
        this.players.push(nowPlayer);
        PubSub.publish('Game:game-state', this.players);
      };
    });
  });
};



module.exports = Game;
