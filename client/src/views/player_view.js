const CreateAppend = require('../helpers/create_append');
const PubSub = require('../helpers/pub_sub.js');
const Game = require('../models/game.js');

const PlayerView = function (element) {
  this.listDiv = new CreateAppend('div', "", element);
  this.form = null;
}

PlayerView.prototype.bindEvents = function () {
  this.renderPlayerView();
  this.listDiv.addEventListener('submit', (event) => {
    event.preventDefault();
    const players = [];
    for (let i = 0; i < 4; i++) {
      if (event.target[i].checked === true) {
        players.push(event.target[i].value);
      }
    }
    PubSub.publish('PlayerView:players-submitted', players);
    this.form.innerHTML = "";
  });
};

PlayerView.prototype.renderPlayerView = function () {
  const playerForm = new CreateAppend('form', "", this.listDiv);
  this.populatePlayers(playerForm, 'red', true);
  this.populatePlayers(playerForm, 'green', true);
  this.populatePlayers(playerForm, 'blue', true);
  this.populatePlayers(playerForm, 'yellow', true);
  const playersSubmitButton = new CreateAppend('input', "", playerForm);
  playersSubmitButton.type = 'submit';
  playersSubmitButton.value = "Choose your colours!";
  this.form = playerForm;
};

PlayerView.prototype.populatePlayers = function (playerForm, colour, checked) {
  const playerCheckbox = new CreateAppend('input', "", playerForm);
  playerCheckbox.type = 'checkbox';
  playerCheckbox.name = 'player';
  playerCheckbox.id = colour;
  playerCheckbox.value = colour;
  playerCheckbox.checked = checked;
  const playerLabel = new CreateAppend('label', colour, playerForm);
  playerLabel.for = colour;
};


module.exports = PlayerView;
