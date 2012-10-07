describe("DiceRoller", function() {
  var diceRoller;

  beforeEach(function() {
    diceRoller = new DiceRoller();
  });

  describe("firstValue after roll", function() {
    var number;

    beforeEach(function() {
      diceRoller.roll();
      number = diceRoller.firstValue;
    });

    it("is less or equal to 6", function() {
      expect(number <= 6).toBe(true);
    });

    it("is greater or equal to 1", function() {
      expect(number >= 1).toBe(true);
    });
  });

  describe("secondValue after roll", function() {
    var number;

    beforeEach(function() {
      diceRoller.roll();
      number = diceRoller.secondValue;
    });

    it("is less or equal to 6", function() {
      expect(number <= 6).toBe(true);
    });

    it("is greater or equal to 1", function() {
      expect(number >= 1).toBe(true);
    });
  });
});
