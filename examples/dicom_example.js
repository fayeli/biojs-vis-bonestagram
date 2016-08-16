// if you don't specify a html file, the sniper will generate a div with id "rootDiv"

var app = require("biojs-vis-bonestagram");
var instance = new app({el: rootDiv, text: 'biojs'});

// create a file input for DICOM upload
var fileInput = document.createElement("input");
fileInput.setAttribute("type", "file");
fileInput.setAttribute("multiple", "false");
rootDiv.appendChild(fileInput);
app.enableDICOMUpload(fileInput);

// create a div in the DOM for the DICOM preview
var div = document.createElement("div");
div.id = "dicomImage";
rootDiv.appendChild(div);
app.enableDICOMPreview();

//rootDiv.append($('<div><div/>').attr("id", "dicomImage"));
//app.startFace();
