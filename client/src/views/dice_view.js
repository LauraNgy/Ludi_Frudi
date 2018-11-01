const PubSub = require('../helpers/pub_sub.js');
const CreateAppend = require('../helpers/create_append.js');
const Game =require('../models/game.js');

const DiceView = function (container) {
  this.container = container;
  this.resultView = null;
  this.diceDiv = null;

};


DiceView.prototype.bindEvents = function (gameInfo, boardView, players) {
  this.renderDiceView();
  this.diceDiv.addEventListener('click', (event) => {
      let result = this.rollDice(1,6);
      this.resultView.textContent = `${result}`;
      gameInfo.diceValue = result;
      gameInfo.enabled = true;
      this.diceDiv.removeChild(document.getElementById('dice-button'));
      boardView.populatePawns(players, gameInfo);
  });
};

DiceView.prototype.renderDiceView = function () {
  const newDiv = new CreateAppend('div', '', this.container);
  newDiv.id = 'dice-view';
  this.diceDiv = newDiv;

  const diceButton = new CreateAppend('input', '', this.diceDiv);
  diceButton.type = 'button';
  diceButton.value = 'Roll dice!';
  diceButton.id = 'dice-button';

  const result = new CreateAppend('div', '', this.diceDiv);
  result.id = 'dice-result-view';
  this.resultView = result;
};


DiceView.prototype.rollDice = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = DiceView;
