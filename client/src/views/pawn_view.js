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
        const pawn = new CreateAppend('img', "", this.element);
        pawn.id = id;
        pawn.src = "/images/" + colour + ".png";
        pawn.alt = `${colour}`;
        const pawnObj = new Pawn(pawn.id, this.element.id, colour);
        pawn.classList.add('pawn');
        pawn.addEventListener('click', (event) => {
          PubSub.publish('PawnView:player-pawn-selected', event.target.alt);
        });
    };


module.exports = PawnView;
