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
  const gameInfo = {
    'enabled': false,
    'diceValue': null,
    'pawnId': null,
    'players': []
  };
  const playerView = new PlayerView(this.element);
  playerView.bindEvents();
  const boardView = new BoardView(this.element);
  boardView.renderBoard();

  PubSub.subscribe('Game:game-state', (event) => {
    this.players = event.detail;
    boardView.populatePawns(this.players, gameInfo);
    console.log(this.players);
    console.log(gameInfo);
    const diceView = new DiceView(this.element);
    diceView.bindEvents(gameInfo);
    console.log(gameInfo);
    const infoView = new InfoView(this.element);
    infoView.renderInfo(gameInfo);
    console.log(gameInfo);
    const submitButton = new CreateAppend('button', "", this.element);
    if (gameInfo.pawnId === null) {
      submitButton.textContent = "Start game";
    } else {
      submitButton.textContent = "Move Pawn";
    }
    submitButton.disabled = true;
    if (gameInfo.enabled === true) {
      submitButton.disabled = false;
      submitButton.addEventListener('click', (event) => {
        PubSub.publish('GameView:gameInfo-ready', gameInfo);
      });
    };
  });
};

module.exports = GameView;
