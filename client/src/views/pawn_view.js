const CreateAppend = require('../helpers/create_append.js');
const PubSub = require('../helpers/pub_sub.js');
const colours = require('../models/colours.js');
const Pawn = require('../models/pawn.js');


const PawnView = function (element) {
  this.element = element;
};


PawnView.prototype.createPawn = function (colour, id, gameInfo, status) {
  const old = this.element.firstChild;
  if (old) {
    this.element.removeChild(old);
  }
  const pawn = new CreateAppend('img', "", this.element);
  pawn.id = id;
  pawn.src = "/images/" + colour + ".png";
  pawn.alt = `${colour}`;
  pawn.classList.add('pawn');
  console.log(gameInfo);
  if (gameInfo.diceValue == 6 && gameInfo.players[0] === colour) {
    this.element.classList.add('availablePawn');
    pawn.addEventListener('click', (event) => {
      gameInfo['pawnId'] = pawn.id;
      PubSub.publish('PawnView:game-info-ready', gameInfo);
    });
  }
  else if (gameInfo.players[0] === colour && status === 'board') {
    this.element.classList.add('availablePawn');
    pawn.addEventListener('click', (event) => {
      gameInfo['pawnId'] = pawn.id;
      PubSub.publish('PawnView:game-info-ready', gameInfo);
    });
  }
};


module.exports = PawnView;
