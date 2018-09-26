const CreateAppend = require('../helpers/create_append.js');
const PubSub = require('../helpers/pub_sub.js');
const colours = require('../models/colours.js');
const Pawn = require('../models/pawn.js');
const Player = require('../models/player.js');


const PawnView = function (element) {
  this.element = element;
};

PawnView.prototype.createPawn = function (parentElement, colour, id, player) {
        const old = this.element.firstChild;
        if (old !== null) {
        this.element.removeChild(old);
        }
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
          console.log(parentElement.id);
          PubSub.publish('PawnView:player-pawn-selected', playerPawn);
        });
    };


// PawnView.prototype.renderMove = function () {
//   PubSub.subscribe('Pawn:position-calculated', (event) => {
//     const pawnID = event.detail.id;
//     const newDiv = document.getElementById(event.detail.position)
//     newDiv.appendChild(pawnID);
// }) ;
// }

module.exports = PawnView;
