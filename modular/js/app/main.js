require(['jquery','app/bonestagram'], function($, bonestagram) {
	$(function () {
		// var options = {
  //   		video: $('#myVid'),
  //   		img: $('#myImg')
		// }
		// bonestagram.init(options);
		bonestagram.init();
		$('#start_btn').click(function(){
			bonestagram.startFace();
			//bonestagram.startHand();
		});
	});
});