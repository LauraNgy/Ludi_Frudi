const CreateAppend = require('../helpers/create_append.js');
const PubSub = require('../helpers/pub_sub.js');
const PlayerView = require('./player_view.js');

const InfoView = function(element) {
  this.infoView = new CreateAppend('div', "", element);
  this.diceValue = false;
  this.pawnId = false;
}

InfoView.prototype.renderInfo = function (gameInfo) {
  this.renderDiceInfo();
  this.renderPawnInfo();
  if (this.diceValue !== false && this.pawnId !== false) {
    gameInfo['enabled'] = true;
  };
};

InfoView.prototype.renderDiceInfo = function () {
  let diceInfo = "";
  if (this.diceValue === false) {
    diceInfo = new CreateAppend('p', "Please roll the dice", this.infoView);
    this.diceValue = true;
  };
};

InfoView.prototype.renderPawnInfo = function () {
  let playerInfo = "";
  if (this.pawnId === false) {
    playerInfo = new CreateAppend('p', "Please select a valid pawn", this.infoView);
    this.pawnId = true;
  };
};


module.exports = InfoView;
