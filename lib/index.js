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
  // if (typeof opts.width === 'undefined'){
  // 	this.width = 400;
  // } else {
  // 	this.width = opts.width;
  // }
  // if (typeof opts.height === 'undefined'){
  // 	this.height = 300;
  // } else {
  // 	this.height = opts.height;
  // }
  console.log(biojsvisbonestagram.hello(opts.text));
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
 function setWidthHeight(element, width, height){
 	element.setAttribute("width", width);
  	element.setAttribute("height", height);
  	return element;
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
 * @param {String} name - Name of a person
 * @return {String} Returns hello name
 */


biojsvisbonestagram.hello = function (name) {

  return 'hello ' + name;
};

biojsvisbonestagram.create = function(opts){
	if (typeof opts === 'undefined' || typeof opts.container === 'undefined'){
  		this.container = $(".bonestagram_container").get(0);
  	} else {
  		this.container = opts.container;
  	}
  	if (typeof opts === 'undefined' || typeof opts.width === 'undefined'){
  		this.width = 400;
  	} else {
  		this.width = opts.width;
  	}
  	if (typeof opts === 'undefined' || typeof opts.height === 'undefined'){
  		this.height = 300;
  	} else {
  		this.height = opts.height;
  	}

  	// create HTML elements needed
  	var vid = document.createElement("video");
  	vid.className = "bonestagram_video";
  	vid.setAttribute("preload", "auto");
  	console.log(this.width);
  	vid = setWidthHeight(vid, this.width, this.height);
  	var canvas1 = document.createElement("canvas");
  	canvas1.className = "bonestagram_face_overlay";
  	canvas1 = setWidthHeight(canvas1, this.width, this.height);
  	var canvas2 = document.createElement("canvas");
  	canvas2.className = "bonestagram_gl";
  	canvas2 = setWidthHeight(canvas2, this.width, this.height);
  	var canvas3 = document.createElement("canvas");
  	canvas3.className = "bonestagram_hand_overlay";
  	canvas3 = setWidthHeight(canvas3, this.width, this.height);

  	// add the elements in the DOM under bonestagram container
  	this.container.appendChild(vid);
  	this.container.appendChild(canvas1);
  	this.container.appendChild(canvas2);
  	this.container.appendChild(canvas3);
  	console.log(this.container);

  	visCore.init();
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
};

/**
 * Method to enable DICOM image preview on an HTML <div> element with id = "dicomImage"
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
};

/**
 * Method to enable DICOM image upload. 
 * @example
 *
 *     biojsvisbonestagram.enableDICOMUpload(fileInput);
 *
 * @method enableDICOMUpload
 * @param {Object} fileInput - An HTML <input> element with type="file"
 */
biojsvisbonestagram.enableDICOMUpload = function (fileInput) {
	console.log("enable DICOM upload");
	fileInput.onchange = function(event){
		console.log("file input change")
		var file = event.target.files[0];
		var imageId = cornerstoneWADOImageLoader.fileManager.add(file);
		showDICOM(imageId);
	};
};

