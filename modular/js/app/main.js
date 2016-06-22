require(['jquery','app/bonestagram'], function($, bonestagram) {
	$(function () {
		bonestagram.init();
		$('#start_btn').click(function(){
			bonestagram.startFace();
			bonestagram.startHand();
		});
	});
});