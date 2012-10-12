var whiteDiceNrs = [
  "white-one", "white-two", "white-three", "white-four", "white-five", "white-six"
];
var brownDiceNrs = [
  "brown-one", "brown-two", "brown-three", "brown-four", "brown-five", "brown-six"
];

var PLAYER1 = new Player("Player1");
var PLAYER2 = new Player("Player2");
var GAME = new Game(PLAYER1, PLAYER2);

$(function() {
  showStartUpWindow();

  $("#player1Input").click(function() {
    $("#player1Input").val("");
  });

  $("#player2Input").click(function() {
    $("#player2Input").val("");
  });

  $('#menu').click(function() {
    $('#menuDialog').dialog({
      autoOpen : false,
      show : "blind",
      hide : "explode",
      buttons : {
        "Start a new game" : function() {
          $(this).dialog("close");
          window.location.reload();
        },
        Resume : function() {
          $(this).dialog("close");
        }
      }
    });

    $('#menuDialog').dialog("open");
    return false;
  });

  $('#undo').click(function() {
    GAME.undo();
    redrawCheckers();
  });

  $('#submit').click(function() {
  });

  $('#send').click(function() {
    if ($('#chat_input').val() != "") {
      consoleAddMessage($('#chat_input').val());
      $('#chat_input').val('');
    }
  });
});

function showStartUpWindow() {
  $("#dialog-modal").dialog({
    height : 'auto',
    modal : true,
    hide : "explode",
    buttons : {
      "Start new game" : function() {
        startNewGame();
        $(this).dialog("close");
      }
    }
  });
}

function startNewGame() {
  if ($("#player1Input").val() != "") {
    PLAYER1.name = $("#player1Input").val();
  }

  if ($("#player2Input").val() != "") {
    PLAYER2.name = $("#player2Input").val();
  }

  $("#player1Name").text(PLAYER1.name);
  $("#player2Name").text(PLAYER2.name);

  GAME.start();

  showWhiteDice(GAME.diceRoller.firstValue);
  showBrownDice(GAME.diceRoller.secondValue);

  redrawCheckers();
}

function redrawCheckers() {
  $(".checker").remove();

  for (var i = 1; i < 25; i++) {
    var point = GAME.getPoint(i);
    var checkers = point.checkers;

    for (var j = 0; j < checkers.length; j++) {
      var checker = checkers[j];

      if (checker.getPlayer() == PLAYER1) {
        var element = generateBrownChecker();
      } else {
        var element = generateWhiteChecker();
      }

      var position = getCheckerPosition(i, j);
      $("#point" + i).append(element);

      element[0].style.top = position.top;
      element[0].style.left = position.left;
    }
  }

  $(".checker").draggable({revert: "invalid"});
  $(".point").droppable({
    drop: function(event, ui) {
      console.log("dropped");
    }
  });

  $(".checker").on("click", function() {
    $(".checker").removeClass("selected");
    $(this).addClass("selected");
  });
}

// value - 1 to 6
function showWhiteDice(value) {
  var dice = $("#whiteDiceNr1");
  dice.parent().show();
  animateDice(dice, whiteDiceNrs, value);
}

// value - 1 to 6
function showBrownDice(value) {
  var dice = $("#brownDiceNr1");
  dice.parent().show();
  animateDice(dice, brownDiceNrs, value);
}

// dice - dice jquery object
// numbers - array of number classes
// value - final value 1 to 6
function animateDice(dice, numbers, value) {
  dice.removeClass().addClass("dice");

  var currentNr = null;
  var lastClass = null;
  var count = 0;
  var nrGenerator = new DiceNumberGenerator();


  var showRandomNr = function() {
    var randomNr = nrGenerator.generate() - 1;
    if(lastClass != numbers[randomNr]){
	    dice.switchClass(lastClass, numbers[randomNr], 80, function() {
	      if (count <= 8) {
	        lastClass = numbers[randomNr];
	        showRandomNr();
	      } else {
	        dice.switchClass(lastClass, numbers[value - 1]);
	      }
	    });
  	}
    count++;
  }

  showRandomNr();
}

function consoleAddMessage(message) {
  $('#log').append(message + "<br />");
  $('#log').animate({
    scrollTop : $("#log")[0].scrollHeight - $("#log").height()
  }, 1000, function() {
  });
}

function generateBrownChecker() {
  return $("<div>").addClass("checker checker-brown pointer");
}

function generateWhiteChecker() {
  return $("<div>").addClass("checker checker-white pointer");
}

function getCheckerPosition(pointNr, checkerNr) {
  var count = GAME.getCheckersCountOnPoint(pointNr);
  if(pointNr > 12){ // top
    if(checkerNr > 5){ // overlaps
      var top = 5*40-(checkerNr-5)*40+20;
    }
    else {
     var top = checkerNr*40;
    } 
  }
  else { // bottom
    if(checkerNr > 5){ // overlaps 
      var top = (checkerNr-6)*40;
    }
    else {
     var top = 20+4*40-checkerNr*40;
    }
    
  }
  return {
    top:  top + "px",
    left: "0px"
  };
}
