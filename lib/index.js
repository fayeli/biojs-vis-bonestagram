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
//var cornerstoneMath = require("./cornerstoneMath");
//var cornerstoneTools = require("./cornerstoneTools");

/*
	Import dicom parser
*/
var dicomParser = require("./dicomParser.min");

/* 
	Import jpeg codec
*/
var OpenJPEG = require("./libopenjpeg");
var CharLS = require("./libCharLS");

/*
	Import cornerstone WADO Image Loader
*/
var cornerstoneWADOImageLoader = require("./cornerstoneWADOImageLoader.min");

/**
@class biojsvisbonestagram
 */

var  biojsvisbonestagram;
module.exports = biojsvisbonestagram = function(opts){
  this.el = opts.el;
  this.el.textContent = biojsvisbonestagram.hello(opts.text);
  //console.log(cornerstone);
  //console.log(dicomParser);
  //console.log(OpenJPEG);
  //console.log(CharLS);
  //console.log(cornerstoneWADOImageLoader);
};

/**
 * Private Methods
 */
 function showDICOM(imageId){
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
 * Method to start visualisation on a face
 *
 * @example
 *
 *     biojsvisbonestagram.startFace();
 *
 * @method startFace
 */

biojsvisbonestagram.startFace = function() {
	visCore.startFace();
}

biojsvisbonestagram.enableDICOMPreview = function() {
	var element = $('#dicomImage').get(0);
    cornerstone.enable(element);
}

biojsvisbonestagram.enableDICOMUpload = function (fileInput) {
	fileInput.onChange(function(event){
		var file = event.target.files[0];
		var imageId = cornerstoneWADOImageLoader.fileManager.add(file);
		showDICOM(imageId);
	});
}

