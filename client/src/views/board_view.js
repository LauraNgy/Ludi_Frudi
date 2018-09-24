const CreateAppend = require('../helpers/create_append.js');
const path = require('../models/path.js');
const colours = require('../models/colours.js');


const BoardView = function (element) {
  this.element = element;
};

BoardView.prototype.bindEvents = function () {
  this.renderBoard(13);
};

BoardView.prototype.renderBoard = function (dimensions) {
  for (let colID = 1; colID <= dimensions; colID++) {
    const colDiv = new CreateAppend('div', "", this.element);
    colDiv.id = colID;
    colDiv.classList.add('board');
    for (let rowID = 1; rowID <= dimensions; rowID++) {
      const rowDiv = new CreateAppend('div', `${colID},${rowID}`, colDiv);
      rowDiv.id = `${colID},${rowID}`;
      rowDiv.classList.add('board');
      if (path.includes(rowDiv.id)) {
        rowDiv.classList.add('path');
      };
      if (colours.red.includes(rowDiv.id)) {
        rowDiv.classList.add('red');
      }
      else if (colours.green.includes(rowDiv.id)) {
        rowDiv.classList.add('green');
      }
      else if (colours.blue.includes(rowDiv.id)) {
        rowDiv.classList.add('blue');
      }
      else if (colours.yellow.includes(rowDiv.id)) {
        rowDiv.classList.add('yellow');
      }
      else if (rowDiv.id == "7,7") {
        rowDiv.classList.add('home');
        rowDiv.textContent = "⌂";
      }
    }
  }
};

module.exports = BoardView;
