var app = require("biojs-vis-bonestagram");
var instance = new app();

// create a bonestagram visualisation of specified width and height
// works best if you keep it to the same ratio as that of the webcam resolution
// by default, the visualisation will be created in the div element with class = "bonestagram_container"
// or you can create it in a div of your choice, e.g.
// var myDiv = $("#myDiv").get(0);
// app.creat({container: myDiv});
app.create({width: "640", height: "480"});

// start the visualisation when user click start
$("#start_button").click(function(){
	app.start();
});

// take screenshot when user click the screenshot button
// the screenshot will be displayed in the img element with class = "bonestagram_screenshot"
$("#screenshot_button").click(function(){
	app.screenshot();
});