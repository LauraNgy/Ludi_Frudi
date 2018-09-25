const CreateAppend = require('../helpers/create_append.js');
const PubSub = require('../helpers/pub_sub.js');

const PawnView = function (element, id) {
  this.element = element;
  this.id = id;
};


PawnView.prototype.renderMove = function () {
  PubSub.subscribe('Pawn:position-calculated', (event) => {
    const divID = event.detail;
    // console.log(divID);
    this.element.innerHTML = '';
    this.element = document.getElementById(`${divID}`);
    const pawn = new CreateAppend('img', "", this.element);
    pawn.id = this.id;
    pawn.src = "/images/green.png";
    pawn.classList.add('pawn');
    pawn.alt = `${green}`;
  });
};

module.exports = PawnView;
