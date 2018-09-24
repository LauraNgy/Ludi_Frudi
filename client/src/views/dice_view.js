const PubSub = require('../helpers/pub_sub.js');
const CreateAppend = require('../helpers/create_append.js');

const DiceView = function (container) {
  this.container = container;
  this.resultView = null;

};


DiceView.prototype.bindEvents = function () {
console.log("diceView exists");
};

module.exports = DiceView;
