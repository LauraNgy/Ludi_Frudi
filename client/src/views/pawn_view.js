const CreateAppend = require('../helpers/create_append.js');
const PubSub = require('../helpers/pub_sub.js');

const PawnView = function (element, id) {
  this.element = element;
};

PawnView.prototype.renderMove = function () {
  console.log("renderMove works!");
};




// PawnView.prototype.renderMove = function () {
//   PubSub.subscribe('Pawn:position-calculated', (event) => {
//     const divID = event.detail;
//     console.log(divID);
//     this.element = '';
//     this.element = document.querySelector(`#${divID}`);
//     const pawn = new CreateAppend('img', "", this.element);
//     pawn.id = this.id;
//     pawn.src = "/images/" + colour + ".png";
//     // pawn.src = red;
//     pawn.alt = `${colour}`;
//   });
// };

module.exports = PawnView;
