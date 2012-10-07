function DiceRoller() {
  this.firstValue = null;
  this.secondValue = null;
}

DiceRoller.prototype.roll = function() {
  this.firstValue = Math.floor((Math.random()*6)+1);
  this.secondValue = Math.floor((Math.random()*6)+1);
}

DiceRoller.prototype.rollUntilNotPair = function() {
  this.roll();
  if (this.firstValue === this.secondValue) {
    this.rollUntilNotPair();
  }
}
