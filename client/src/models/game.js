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

Game.prototype.playTurn = function () {
  PubSub.subscribe('DiceView:dice-roll-result-loaded', (event) => {
    const diceValue = event.detail;
    const thisPlayer = this.players.shift();
    console.log(thisPlayer);
    thisPlayer.turn(diceValue);
    this.players.push(thisPlayer);
  });
};
;


module.exports = Game;
