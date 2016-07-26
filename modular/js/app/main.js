require(['jquery','app/bonestagram'], function($, bonestagram) {
	$(function () {
		// var options = {
  //   		video: $('#myVid'),
  //   		img: $('#myImg')
		// }
		// bonestagram.init(options);
		bonestagram.init();
		$('#start_btn').click(function(){
			console.log('start button clicked');
			bonestagram.startFace();
			//bonestagram.startHand();
		});
		$('#screenshot_btn').click(function(){
			console.log('screen shot button clicked');
			bonestagram.screenshot();
		});
	});
});