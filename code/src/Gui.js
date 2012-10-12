var whiteDiceNrs = ["white-one", "white-two","white-three","white-four","white-five","white-six" ];
var brownDiceNrs = ["brown-one", "brown-two","brown-three","brown-four","brown-five","brown-six" ];
var currentWhiteNr = whiteDiceNrs[0];
var currentBrownNr = brownDiceNrs[2];


$(function(){
	
	startUpWindow();
	
	$('#player1Input').click(function() {
		$('#player1Input').val("");
	});
	
	$('#player2Input').click(function() {
		$('#player2Input').val("");
	});
	
	
	$('#menu').click(function() {		
		$('#menuDialog').dialog({
			autoOpen: false,
            show: "blind",
            hide: "explode",
            buttons: {
                "Start new game": function() {
                    $( this ).dialog( "close" );
                    startUpWindow(); 
                },
                Resume: function() {
                    $( this ).dialog( "close" );
                }
            }
		});
		
		$('#menuDialog').dialog( "open" );
        return false;
	});

	$('#undo').click(function() {
		removeStartingDice();
		
		//todo call undo move from the back-end
	});

	$('#submit').click(function() {
		alert('Submit.');
		startGameRolling(5,4);
		//todo call the function from the back-end, give the turn right over
	});

	$('#send').click(function() {
		if($('#chat_input').val() != ""){
			consoleAddMessage($('#chat_input').val());			  
			$('#chat_input').val('');
		}
	});
	
	$('#whiteDiceNr1').click(function() {
		  rollWhiteDice('#whiteDiceNr1');
	});
	
	$('#whiteDiceNr2').click(function() {
		  rollWhiteDice('#whiteDiceNr2');
	});
	
	$('#brownDiceNr1').click(function() {
		rollBrownDice('#brownDiceNr1');
	});
	
	$('#brownDiceNr2').click(function() {
		rollBrownDice('#brownDiceNr2');
	});
});

function startUpWindow(){
	$( "#dialog-modal" ).dialog({
        height: 250,
        modal: true,
        hide: "explode",
        buttons: {
            "Start new game": function() {
                $( this ).dialog( "close" );
                if($('#player1Input').val() != ""){
                	var player1 = $('#player1Input').val();
                }else{
                	var player1 = "Player1";
                }
                if($('#player1Input').val() != ""){
                	var player2 = $('#player2Input').val();
                }else{
                	var player2 = "Player2";
                }
                
                $('#player1Name').text(player1);
                $('#player2Name').text(player2);          
                
                //todo start new game; call out the method
            }
        }
    });
}

function consoleAddMessage(message){
	$('#log').append(message+"<br />");
	$('#log').animate({scrollTop:$("#log")[0].scrollHeight - $("#log").height()},1000,function() {});
}

function rollDice(string) {
	 for(var i=0; i < 5; i++) {
		  var newWhiteNr = Math.floor((Math.random()*6));
		  var newBrownNr = Math.floor((Math.random()*6));
		  console.log('newWhiteNr: ' + newWhiteNr + " " + whiteDiceNrs[newWhiteNr]);
		  console.log('newBrownNr: ' + newBrownNr + " " + brownDiceNrs[newBrownNr]);
		  if(currentWhiteNr != whiteDiceNrs[newWhiteNr]) {
		   $('#whiteDiceNr1').switchClass(currentWhiteNr, whiteDiceNrs[newWhiteNr], 125);
		  }
		  if(currentBrownNr != brownDiceNrs[newBrownNr]) {
		   $('#brownDiceNr1').switchClass(currentBrownNr, brownDiceNrs[newBrownNr], 125);
		  }
		  currentWhiteNr = whiteDiceNrs[newWhiteNr];
		  currentBrownNr = brownDiceNrs[newBrownNr];
	 }
}

function rollWhiteDice(string, value) {
	for(var i=0; i < 5; i++){
		var newWhiteNr = Math.floor((Math.random()*6));
		console.log(string+': ' + newWhiteNr + " " + whiteDiceNrs[newWhiteNr]);
		if(currentWhiteNr != whiteDiceNrs[newWhiteNr]) {
			$(string).switchClass(currentWhiteNr, whiteDiceNrs[newWhiteNr], 125);
		}
		currentWhiteNr = whiteDiceNrs[newWhiteNr];
	}
	if(currentWhiteNr != whiteDiceNrs[value]){
		$(string).switchClass(currentWhiteNr, whiteDiceNrs[value], 125);
	}
}

function rollBrownDice(string, value) {
	for(var i=0; i < 5; i++) {
		  var newBrownNr = Math.floor((Math.random()*6));
		  console.log(string+': ' + newBrownNr + " " + brownDiceNrs[newBrownNr]);
		  if(currentBrownNr != brownDiceNrs[newBrownNr]) {
			  $(string).switchClass(currentBrownNr, brownDiceNrs[newBrownNr], 125);
		  }
		  currentBrownNr = brownDiceNrs[newBrownNr];
	 }
	 if(currentBrownNr != brownDiceNrs[value]){
		  $(string).switchClass(currentBrownNr, brownDiceNrs[value], 125);
	 }
}

function startGameRolling(whiteValue, brownValue){
	$("#game-board").append('<div id="whiteDiceNr1Container" class="dice dice-white"><div id="whiteDiceNr1" class="number white-one"></div></div>');
	$("#game-board").append('<div id="brownDiceNr1Container" class="dice dice-brown"><div id="brownDiceNr1" class="number brown-three"></div></div>');
	rollWhiteDice('#whiteDiceNr1',whiteValue);
	rollBrownDice('#brownDiceNr1',brownValue);
}

function removeStartingDice(){
	$("#whiteDiceNr1Container").remove();
	$("#brownDiceNr1Container").remove();
}

function whiteRolling(first, second){
	$("#game-board").append('<div id="whiteDiceNr1Container" class="dice dice-white"><div id="whiteDiceNr1" class="number white-one"></div></div>');
	$("#game-board").append('<div id="whiteDiceNr2Container" class="dice dice-white"><div id="whiteDiceNr2" class="number white-one"></div></div>');
	rollWhiteDice('#whiteDiceNr1', first);
	rollWhiteDice('#whiteDiceNr2', second);
}

function removeWhiteDice(){
	$("#whiteDiceNr1Container").remove();
	$("#whiteDiceNr2Container").remove();
}

function brownRolling(first, second){
	$("#game-board").append('<div id="brownDiceNr1Container" class="dice dice-brown"><div id="brownDiceNr1" class="number brown-three"></div></div>');
	$("#game-board").append('<div id="brownDiceNr2Container" class="dice dice-brown"><div id="brownDiceNr2" class="number brown-three"></div></div>');
	rollBrownDice('#brownDiceNr1', first);
	rollBrownDice('#brownDiceNr2', second);
}

function removeBrownDice(){
	$("#brownDiceNr1Container").remove();
	$("#brownDiceNr2Container").remove();
}