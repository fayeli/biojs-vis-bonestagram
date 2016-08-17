// if you don't specify a html file, the sniper will generate a div with id "rootDiv"

var app = require("biojs-vis-bonestagram");
var instance = new app({text: 'biojs'});
$("#start_button").click(function(){
	app.start();
});
console.log(instance);