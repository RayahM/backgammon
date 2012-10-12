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
		  consoleAddMessage($('#chat_input').val());
		  $('#chat_input').val('');
	});
});


function consoleAddMessage(message){
	$('#log').append(message+"<br />");
	$('#log').animate({scrollTop:$("#log")[0].scrollHeight - $("#log").height()},1000,function() {
	    // Animation complete.
	});
}