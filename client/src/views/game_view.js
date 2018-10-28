const PlayerView = require('./player_view.js');
const DiceView = require('./dice_view.js');
const BoardView = require('./board_view.js');
const InfoView = require('./info_view.js');
const PubSub = require('../helpers/pub_sub.js');
const CreateAppend = require('../helpers/create_append.js');

const GameView = function (element) {
  this.element = element;
  this.players = [];
}

GameView.prototype.bindEvents = function () {
  const playerView = new PlayerView(this.element);
  playerView.bindEvents();
  const boardView = new BoardView(this.element);
  boardView.renderBoard();

  PubSub.subscribe('Game:game-state', (event) => {
    const gameInfo = {
      'enabled': false,
      'diceValue': null,
      'pawnId': null,
      'players': []
    };
    this.players = event.detail;
    this.removeChild('dice-view');
    this.removeChild('info-view');
    this.players.forEach( (player) => {
      gameInfo.players.push(player.colour)
    });
    const infoView = new InfoView(this.element);
    infoView.getTurn(gameInfo);
    const diceView = new DiceView(this.element);
    diceView.bindEvents(gameInfo);
    boardView.populatePawns(this.players, gameInfo);
  });
};

GameView.prototype.removeChild = function (child) {
  const childNode = document.getElementById(child);
  if (childNode) {
    this.element.removeChild(childNode);
  }
};

module.exports = GameView;
