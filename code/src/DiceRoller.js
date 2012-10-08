function DiceRoller() {
  this.firstValue = null;
  this.secondValue = null;
}

DiceRoller.prototype.roll = function() {
  this.values = [];

  this.firstValue = Math.floor((Math.random()*6)+1);
  this.secondValue = Math.floor((Math.random()*6)+1);

  this.values.push(this.firstValue);
  this.values.push(this.secondValue);

  if (this.gotPair()) {
    this.values.push(this.firstValue);
    this.values.push(this.firstValue);
  }
}

DiceRoller.prototype.rollUntilNotPair = function() {
  this.roll();
  if (this.gotPair()) {
    this.rollUntilNotPair();
  }
}

DiceRoller.prototype.gotPair = function() {
  return (this.firstValue == this.secondValue);
}

DiceRoller.prototype.hasValue = function(value) {
  return (this.indexOfValue(value) != -1);
}

DiceRoller.prototype.useValue = function(value) {
  if (!this.hasValue(value)) {
    throw "Can't use value that is not available";
  }

  this.values.splice(this.indexOfValue(value), 1);
}

DiceRoller.prototype.indexOfValue = function(value) {
  for (i = 0; i < this.values.length; i++) {
    if (this.values[i] == value) {
      return i;
    }
  }
  return -1;
}
