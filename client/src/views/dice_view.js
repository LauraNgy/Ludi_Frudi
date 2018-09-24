const PubSub = require('../helpers/pub_sub.js');
const CreateAppend = require('../helpers/create_append.js');

const DiceView = function (container) {
  this.container = container;
  this.resultView = null;
  this.diceDiv = null;

};


DiceView.prototype.bindEvents = function () {
console.log("diceView exists");
this.renderDiceView();
};

DiceView.prototype.renderDiceView = function () {
console.log("renderDiceView exists");
const newDiv = new CreateAppend('div', '', this.container);
newDiv.id = 'dice-view';
this.diceDiv = newDiv;
console.log('this.diceDiv:', this.diceDiv);

const diceButton = new CreateAppend('input', '', this.diceDiv);
diceButton.type = 'button';
diceButton.value = 'dice';
diceButton.id = 'dice-button';

const result = new CreateAppend('div', '', this.diceDiv);
result.id = 'dice-result-view';
};

module.exports = DiceView;
