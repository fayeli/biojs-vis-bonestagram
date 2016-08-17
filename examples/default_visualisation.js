// if you don't specify a html file, the sniper will generate a div with id "rootDiv"

var app = require("biojs-vis-bonestagram");
var instance = new app({text: 'biojs'});
var containerDiv = $(".bonestagram_container").get(0);
app.create({container: containerDiv, width: "640", height: "480"});
$("#start_button").click(function(){
	app.start();
});