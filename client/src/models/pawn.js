const Pawn = function (id, position, stepcount, status) {
  this.id = id;
  this.position = position;
  this.stepcount = 0;
  this.status = 'home';
}

module.exports = Pawn;
