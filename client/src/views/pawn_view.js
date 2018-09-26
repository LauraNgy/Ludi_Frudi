const CreateAppend = require('../helpers/create_append.js');
const PubSub = require('../helpers/pub_sub.js');
const colours = require('../models/colours.js');
const Pawn = require('../models/pawn.js');
const Player = require('../models/player.js');


const PawnView = function (element) {
  this.element = element;
};

PawnView.prototype.createPawn = function (parentElement, colour, id, player) {
        const pawn = new CreateAppend('img', "", parentElement);
        pawn.id = id;
        pawn.src = "/images/" + colour + ".png";
        pawn.alt = `${colour}`;
        const pawnObj = new Pawn(pawn.id, parentElement.id, colour);
        player.pawns.push(pawnObj);
        pawn.classList.add('pawn');
        pawn.addEventListener('click', (event) => {
          const playerPawn = {
            "player": player,
            "pawn": event.target.id
          }
          PubSub.publish('PawnView:player-pawn-selected', playerPawn);
        });
    };

PawnView.prototype.editPawn = function (newParent, pawnID) {
  this.element.innerHTML = '';
  this.element = newParent;
  const pawn = new CreateAppend('img', "", this.element);
  pawn.id = pawnID;
  pawn.src = `/images/${colour}.png`;
  pawn.classList.add('pawn');
  pawn.alt = `${colour}`;
};

PawnView.prototype.renderMove = function () {
  PubSub.subscribe('Pawn:position-calculated', (event) => {
    const divID = event.detail;
    const parentDiv = document.getElementById(divID)
    this.createPawn(parentDiv);
}) ;
}

module.exports = PawnView;
