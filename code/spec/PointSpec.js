describe("Point", function() {
  var player,
      point;

  beforeEach(function() {
    player = new Player();
    point = new Point();
  });

  describe("#addChecker", function() {
    it("adds a checker", function() {
      var checker = new Checker();
      point.addChecker(checker);

      expect(point.checkersCount()).toBe(1);
    });

    it("adds two checkers", function() {
      var checker1 = new Checker();
      var checker2 = new Checker();
      point.addChecker(checker1);
      point.addChecker(checker2);

      expect(point.checkersCount()).toBe(2);
    });
  });

  describe("#removeChecker", function() {
    it("removes a checker", function() {
      var checker = new Checker();
      point.addChecker(checker);
      point.removeChecker(checker);

      expect(point.checkersCount()).toBe(0);
    });
  });
});
