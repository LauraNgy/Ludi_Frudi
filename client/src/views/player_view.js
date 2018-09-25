const CreateAppend = require('../helpers/create_append');
const PubSub = require('../helpers/pub_sub.js');

const PlayerView = function (element) {
  this.element = element;
  this.listDiv = new CreateAppend('div', "", this.element);
  this.form = null;
  this.submitButton = null;
}

PlayerView.prototype.bindEvents = function () {
  this.renderPlayerView();
  this.listDiv.addEventListener('submit', (event) => {
    event.preventDefault();
    this.handleSubmitPlayers();
  });
};

PlayerView.prototype.renderPlayerView = function () {
  const playerForm = new CreateAppend('form', "", this.listDiv);
  this.populatePlayers(playerForm, 'red');
  this.populatePlayers(playerForm, 'green');
  this.populatePlayers(playerForm, 'blue');
  this.populatePlayers(playerForm, 'yellow');
  const playersSubmitButton = new CreateAppend('input', "", playerForm);
  playersSubmitButton.type = 'submit';
  playersSubmitButton.value = "PLAY!!";
  this.form = playerForm;
  this.submitButton = playersSubmitButton;
};

PlayerView.prototype.populatePlayers = function (playerForm, colour) {
  const playerCheckbox = new CreateAppend('input', "", playerForm);
  playerCheckbox.type = 'checkbox';
  playerCheckbox.name = 'player';
  playerCheckbox.id = colour;
  playerCheckbox.value = colour;
  const playerLabel = new CreateAppend('label', colour, playerForm);
  playerLabel.for = colour;
};

PlayerView.prototype.handleSubmitPlayers = function () {
  const players = [];
  for (let i = 0; i < 4; i++) {
    if (event.target[i].checked === true) {
      players.push(event.target[i].value);
    }
  }
  PubSub.publish('PlayerView:players-submitted', players);
  this.form.reset();
  this.submitButton.setAttribute("disabled", true);
};

module.exports = PlayerView;
