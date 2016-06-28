window.onload = function(){
	console.log("hello myscirpt");
	Bonestagram.init();
	$('#start_btn').click(function(){
		Bonestagram.startFace();
		//Bonestagram.startHand();
	});
};