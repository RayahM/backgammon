var whiteDiceNrs = ["white-one", "white-two","white-three","white-four","white-five","white-six" ];
var brownDiceNrs = ["brown-one", "brown-two","brown-three","brown-four","brown-five","brown-six" ];
var currentWhiteNr = whiteDiceNrs[0];
var currentBrownNr = brownDiceNrs[2];


$(function(){
	
	$('#menu').click(function() {		
		$('#menuDialog').dialog({
			autoOpen: false,
            show: "blind",
            hide: "explode",
            buttons: {
                "Start new game": function() {
                    $( this ).dialog( "close" );
                    
                    //todo start new game
                    
                    
                },
                Cancel: function() {
                    $( this ).dialog( "close" );
                }
            }
		});
		
		$('#menuDialog').dialog( "open" );
        return false;
	});

	$('#undo').click(function() {
		alert('Undo.');
		
		//todo call undo move from the back-end
	});

	$('#submit').click(function() {
		alert('Submit.');
		//todo call the function from the back-end, give the turn right over
	});

	$('#send').click(function() {
		if($('#chat_input').val() != ""){
			consoleAddMessage($('#chat_input').val());			  
			$('#chat_input').val('');
		}
	});
	
	$('#whiteDiceNr').click(function() {
		
		  //White dice clicked
		  rollDice();
		 });
	
	 $('#brownDiceNr').click(function() {
		 
	  //Brown dice clicked
	  rollDice();
	 });
});


function consoleAddMessage(message){
	$('#log').append(message+"<br />");
	$('#log').animate({scrollTop:$("#log")[0].scrollHeight - $("#log").height()},1000,function() {});
}

function rollDice() {
	 for(var i=0; i < 5; i++) {
	  var newWhiteNr = Math.floor((Math.random()*6));
	  var newBrownNr = Math.floor((Math.random()*6));
	  console.log('newWhiteNr: ' + newWhiteNr + " " + whiteDiceNrs[newWhiteNr]);
	  console.log('newBrownNr: ' + newBrownNr + " " + brownDiceNrs[newBrownNr]);
	  if(currentWhiteNr != whiteDiceNrs[newWhiteNr]) {
	   $('#whiteDiceNr').switchClass(currentWhiteNr, whiteDiceNrs[newWhiteNr], 125);
	  }
	  if(currentBrownNr != brownDiceNrs[newBrownNr]) {
	   $('#brownDiceNr').switchClass(currentBrownNr, brownDiceNrs[newBrownNr], 125);
	  }
	  currentWhiteNr = whiteDiceNrs[newWhiteNr];
	  currentBrownNr = brownDiceNrs[newBrownNr];
	 }
}