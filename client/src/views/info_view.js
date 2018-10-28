const CreateAppend = require('../helpers/create_append.js');
const PubSub = require('../helpers/pub_sub.js');
const PlayerView = require('./player_view.js');

const InfoView = function(element) {
  this.infoView = new CreateAppend('div', "", element);
  this.infoView.id = 'info-view';
}

InfoView.prototype.getTurn = function (gameInfo) {
  const turnInfo = new CreateAppend('p', `It is player ${gameInfo.players[0]}'s turn. Roll the dice and select an available pawn.`, this.infoView);
};




module.exports = InfoView;
