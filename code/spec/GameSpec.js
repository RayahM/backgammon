describe("Game", function() {
  var game;

  beforeEach(function() {
    game = new Game();
  });

  it("should start the Game", function() {
    game.start();
    expect(game.isStarted).toBeTruthy();
  });
});
