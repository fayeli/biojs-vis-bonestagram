/*
 * biojs-vis-bonestagram
 * https://github.com/fayeli/biojs-vis-bonestagram
 *
 * Copyright (c) 2016 fayelisifi
 * Licensed under the MIT license.
 */


/*
	Import the webpack bundled bonestagram code
*/
var visCore = require("./bonestagramVisCore");
/*
	Import the cornerstone library
*/
var cornerstone = require("./cornerstone");
var cornerstoneMath = require("./cornerstoneMath");
var cornerstoneTools = require("./cornerstoneTools");

/* 
	Import jpeg codec
*/
var OpenJPEG = require("./libopenjpeg");
var CharLS = require("./libCharLS");

/*
	Import cornerstone WADO Image Loader
*/
var cornerstoneWADOImageLoader = require("./cornerstoneWADOImageLoader");

/**
@class biojsvisbonestagram
 */

var  biojsvisbonestagram;
module.exports = biojsvisbonestagram = function(opts){
  //this.el = opts.el;
  console.log(biojsvisbonestagram.hello(opts.text));
  visCore.init();
};

/**
 * Private Methods
 */
 function showDICOM(imageId){
 	console.log("show DICOM");
 	var element = $('#dicomImage').get(0);
 	cornerstone.loadImage(imageId).then(function(image){
		var viewport = cornerstone.getDefaultViewportForImage(element, image);
		cornerstone.displayImage(element, image, viewport);
		}, function(err) { alert(err);
	});
 }

/*
 * Public Methods
 */

/**
 * Method responsible to say Hello
 *
 * @example
 *
 *     biojsvisbonestagram.hello('biojs');
 *
 * @method hello
 * @param {String} name Name of a person
 * @return {String} Returns hello name
 */


biojsvisbonestagram.hello = function (name) {

  return 'hello ' + name;
};

/**
 * Method to start the Bonestagram visualisation
 *
 * @example
 *
 *     biojsvisbonestagram.start();
 *
 * @method start
 */

biojsvisbonestagram.start = function() {
	visCore.startFace();
}

/**
 * Method to enable DICOM image preview on an HTML <div> element with id of "dicomImage"
 *
 * @example
 *
 *     biojsvisbonestagram.enableDICOMPreview();
 *
 * @method enableDICOMPreview
 */
biojsvisbonestagram.enableDICOMPreview = function() {
	console.log("enable DICOM preview");
	var element = $('#dicomImage').get(0);
    cornerstone.enable(element);
}

/**
 * Method to enable DICOM image upload. 
 * @example
 *
 *     biojsvisbonestagram.enableDICOMUpload(fileInput);
 *
 * @method enableDICOMUpload
 * @param {String} fileInput An HTML <input> element with type="file"
 */
biojsvisbonestagram.enableDICOMUpload = function (fileInput) {
	console.log("enable DICOM upload");
	fileInput.onchange = function(event){
		console.log("file input change")
		var file = event.target.files[0];
		var imageId = cornerstoneWADOImageLoader.fileManager.add(file);
		showDICOM(imageId);
	};
}

