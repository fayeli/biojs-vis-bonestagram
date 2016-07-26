window.onload = function(){
	console.log("hello myscirpt");
	Bonestagram.init();
	$('#start_btn').click(function(){
		//Bonestagram.startFace();
		console.log('start button clicked');
		Bonestagram.startFace();
	});
	$('#screenshot_btn').click(function(){
		console.log('screen shot button clicked');
		Bonestagram.screenshot();
	});
};