// if you don't specify a html file, the sniper will generate a div with id "rootDiv"

var app = require("biojs-vis-bonestagram");
var instance = new app();
app.create();

// select a file input for DICOM upload
var fileInput = $("#file_input").get(0);
app.enableDICOMUpload(fileInput);

// select a div for the DICOM preview
var div = $("#dicomImage").get(0);
app.enableDICOMPreview(div);

// visualise DICOM when user click start
$("#start_button").click(function(){
	app.visualiseDICOM();
});