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
module.exports = biojsvisbonestagram = function(){
  //this.el = opts.el;
  //console.log(biojsvisbonestagram.hello(opts.text));
};

/**
 * Global Variables
 */
var dicomDiv;
var dicomImg;
var pointsSelectorCoords;

/**
 * Private Methods
 */
function showDICOM(imageId){
  console.log("show DICOM");
	var element = dicomDiv;
	cornerstone.loadImage(imageId).then(function(image){
	 var viewport = cornerstone.getDefaultViewportForImage(element, image);
	 cornerstone.displayImage(element, image, viewport);
   console.log('cornerstone display');
    saveDICOMImg();
    var canvas = dicomDiv.children[0];
     biojsvisbonestagram.enablePointsSelector(canvas);
	}, function(err) { alert(err);
});
}

function saveDICOMImg(){
  console.log("save DICOM img")
  var canvas = dicomDiv.children[0];
  var dataURL = canvas.toDataURL();
  dicomImg = document.createElement("img");;
  dicomImg.setAttribute('src', dataURL);
}

function setWidthHeight(element, width, height){
	element.setAttribute("width", width);
	element.setAttribute("height", height);
	return element;
}

function scaleCoords(coords, width, height){
  console.log('scale coords');
  var scaleFactor = Math.min(width, height)/640;
  var translateX = 0;
  var translateY = 0;
  if (width < height){
    var k = -125*scaleFactor + (height - 395*scaleFactor)/2;
    translateY = translateY + k;
  } else {
    var k = -118*scaleFactor + (width - 387*scaleFactor)/2;
    translateX = translateX + k;
  }
  for (i = 0; i < coords.length; i++){
    coords[i][0] = coords[i][0]*scaleFactor + translateX;
    coords[i][1] = coords[i][1]*scaleFactor + translateY;
  }
  return coords;
}

function cumulativeOffset(element) {
  var top = 0, left = 0;
  do {
      top += element.offsetTop  || 0;
      left += element.offsetLeft || 0;
      element = element.offsetParent;
  } while(element);

  return {
      top: top,
      left: left
  };
};

// calculate whether the mouse click (x2, y2) is within the circle marker of the coordinate point (x1, y1)
function isHit(x1, y1, x2, y2, radius){
  var distance = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1);
  return (distance < (radius+3) * (radius+3));
}

function drawCoordinates(ctx, coords, radius){
  console.log('draw coordinates');
  // first clear the canvas
  ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
  // redraw image
  ctx.drawImage(dicomImg, 0, 0);
  ctx.fillStyle = "#4C66CC";
  ctx.strokeStyle = "#4C66CC";
  var currentX;
  var currentY;
  var prevX = coords[0][0];
  var prevY = coords[0][1];
  var mouthLeftCornerX = coords[44][0];
  var mouthLeftCornerY = coords[44][1];
  var mouthRightCornerX = coords[50][0];
  var mouthRightCornerY = coords[50][1];
  var nostrilLeftX = coords[36][0];
  var nostrilLeftY = coords[36][1];
  var nostrilMidX = coords[37][0];
  var nostrilMidY = coords[37][1];
  var nostrilRightX = coords[38][0];
  var nostrilRightY = coords[38][1];

  for (i = 0; i < coords.length; i++){
     currentX = coords[i][0];
     currentY = coords[i][1];

     // break apart those that shouln't be line segment
     if (i == 15 || i == 19 || (23 <= i &&  i <= 34) || i == 37 || i == 38 || i == 41 || i == 42 || i == 43 || i == 44 || i == 56 || i == 59 || i >= 62) {
        prevX = currentX;
        prevY = currentY;
     }

     
     // draw circle markers for the coodridnates 
     ctx.beginPath();
     ctx.arc(currentX, currentY, radius, 0, 2*Math.PI, false);
     ctx.closePath();
     ctx.fill();

     // draw line connecting the markers
     ctx.beginPath();
     ctx.moveTo(prevX, prevY);
     ctx.lineTo(currentX,currentY);
     ctx.closePath();
     ctx.stroke();

     // draw line segments of the nose
     if (i == 42) {
        ctx.beginPath();
        ctx.moveTo(currentX, currentY);
        ctx.lineTo(nostrilLeftX, nostrilLeftY);
        ctx.moveTo(currentX, currentY);
        ctx.lineTo(nostrilMidX, nostrilMidY);
        ctx.closePath();
        ctx.stroke();
     } else if ( i == 43){
        ctx.beginPath();
        ctx.moveTo(currentX, currentY);
        ctx.lineTo(nostrilMidX, nostrilMidY);
        ctx.moveTo(currentX, currentY);
        ctx.lineTo(nostrilRightX, nostrilRightY);
        ctx.closePath();
        ctx.stroke();
     }

     // draw line segments of the mouth
     if ( i == 55 || i == 56 || i == 61){
        ctx.beginPath();
        ctx.moveTo(currentX, currentY);
        ctx.lineTo(mouthLeftCornerX, mouthLeftCornerY);
        ctx.closePath();
        ctx.stroke();
     }
     if ( i == 58 || i == 59){
        ctx.beginPath();
        ctx.moveTo(currentX, currentY);
        ctx.lineTo(mouthRightCornerX, mouthRightCornerY);
        ctx.closePath();
        ctx.stroke();
     }

     prevX = currentX;
     prevY = currentY;
  }
  // draw nose bridge
  var noseBridgeTopX = coords[33][0];
  var noseBridgeTopY = coords[33][1];
  var noseBridgeMidX = coords[41][0];
  var noseBridgeMidY = coords[41][1];
  var noseBridgeBotX = coords[62][0];
  var noseBridgeBotY = coords[62][1];
  ctx.beginPath();
  ctx.moveTo(noseBridgeTopX, noseBridgeTopY);
  ctx.lineTo(noseBridgeMidX, noseBridgeMidY);
  ctx.moveTo(noseBridgeMidX, noseBridgeMidY);
  ctx.lineTo(noseBridgeBotX, noseBridgeBotY);
  ctx.closePath();
  ctx.stroke();
}

/*
 * Public Methods
 */

/**
 * Method responsible to create a Bonestagram visualisation.
 *
 * @example
 *
 *     biojsvisbonestagram.create();
 *
 * @method create
 */
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

    // check if bonestagram_img exists
    var img = document.getElementsByClassName("bonestagram_img")[0];
    if (typeof img === 'undefined'){
      img = document.createElement("img");
      img.className = "bonestagram_img hide";
      this.container.appendChild(img);
    }
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
 * Method to set a custom image for Bonestagram visualisation
 * @example
 *
 *     biojsvisbonestagram.setCustomImg({img: myBonesImg, coords: myBonesCoords});
 *
 * @method setBonesImg
 * @param {Object} img - An HTML <img> element containing the image, {Object} coords - An array of the correspondence points coordinates from the image.
 */
biojsvisbonestagram.setCustomImg = function(opts) {
  visCore.setBonesImg(opts.img);
  visCore.setBonesCoords(opts.coords);
};

/**
 * Method to enable DICOM image preview on an HTML <div> element
 *
 * @example
 *
 *     biojsvisbonestagram.enableDICOMPreview(div);
 *
 * @method enableDICOMPreview
 */
biojsvisbonestagram.enableDICOMPreview = function(div) {
	console.log("enable DICOM preview");
  dicomDiv = div;
  cornerstone.enable(dicomDiv);
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

/**
 * Method to enable points selector tool on an HTML canvas.
 * @example
 *
 *     biojsvisbonestagram.enablePointsSelector(canvas);
 *
 * @method enablePointsSelector
 * @param {Object} canvas - An HTML <canvas> element
 */
biojsvisbonestagram.enablePointsSelector = function (canvas) {
  console.log('enable points selector');
  pointsSelectorCoords = [[121.92799191984679,184.19216240419755],[118.74113263254269,253.7017373484083],[128.07732840700828,314.0651648786312],[145.50341586402052,377.3404382903117],[175.0470179047746,428.3720278198884],[216.26268310246033,469.2344402538887],[267.42588166495466,502.128073946532],[323.6864139765614,512.5053811316307],[381.1889691089136,499.48530971536445],[429.71357990120225,463.4214900408549],[467.1292936657478,421.537754329594],[493.2308725208873,370.6466670145585],[507.3945907183312,305.3965374123],[514.1098885852615,238.51000761747102],[507.2009944162471,174.7364492942625],[465.59705810723074,136.75665747531139],[432.10874975324265,125],[384.15174446143584,125],[351.54488594535763,135.22963355336668],[162.16177451030518,144.72103952617107],[194.70376235949394,126],[241,130],[277.5198647210173,137.82992220884094],[192.5627380181407,182.35373455399292],[225.1658086004223,166.85817167285668],[262.9021389237093,184.72604899079232],[224.82421319031323,193.62679469584918],[224.9386274222809,179.73191446260716],[443.75218061508883,177.1556294105885],[407.36102478935464,162.1785032964798],[367.3426762945685,181.37362678808685],[405.2498567443763,188.75927101523848],[404.863153412407,173.65270066194788],[314, 170],[277.2539320006613,252.0592473714927],[258.790607031229,284.0832945003201],[276.64778558874696,304.54255347445314],[317.4772090972725,307.7859653833357],[364.4959193923387,299.6561959465791],[377.27275089177823,279.043842539653],[357.1140334647449,250.14961061471956],[324,222],[296.770695143374,295.6331974142146],[350.24114846328195,290.942330984987],[248.8532880314441,372.38004806995957],[272.1557077756945,356.35352520595814],[302.9902196911147,350.59821534914704],[323.11457426149127,353.0358352022737],[338.3055779254553,347.5427982113969],[366.49269601972713,353.1538257295358],[392.63652105652415,368.4911974180641],[375.0778975047938,391.4413420753004],[352.32935954043757,405.19247889714825],[320.19499419206926,411.930992226806],[288.9192573286629,407.35752671668797],[267.61253113280924,394.527019223827],[286.6817714614754,382.82667526139215],[320.16223074694074,385.86502934549657],[359.1212544588326,380.7487964985724],[361.7270998810554,365.15603335898066],[322.91210334135167,367.2901736762333],[280.7920218316411,368.2798825278876],[320.66814785515174,277.11007275979364],[206.36606604411398,171.6086547538323],[247.5375468161923,170.29657636660522],[246.36866333618227,191.67729410789994],[205.19888043799355,189.99033691329964],[429.0603263358775,166.1691180598579],[386.8504393293843,166.2774220754911],[384.7938981921405,186.5701136634426],[426.9983448269614,184.45786533091854]];
  pointsSelectorCoords = scaleCoords(pointsSelectorCoords, canvas.width, canvas.height);
  var ctx = canvas.getContext("2d");
  ctx.setTransform(1,0,0,1,0,0);
  var radius = 3;
  drawCoordinates(ctx, pointsSelectorCoords, radius);
  var dragging = false;
  var offset = cumulativeOffset(canvas);
  var dragHoldX;
  var dragHoldY;

  ctx.canvas.addEventListener('mousedown', function(e){
    // get mouse click position on canvas
    var mouseX = Math.round(e.pageX - offset.left);
    var mouseY = Math.round(e.pageY - offset.top);
    // determine which coordinate point was clicked
    for (i = 0; i < pointsSelectorCoords.length; i++){
      if (isHit(pointsSelectorCoords[i][0],pointsSelectorCoords[i][1],mouseX, mouseY, radius)){
        // console.log("Coordinate point " + i + " was clicked");
        // start dragging
        dragging = true;
        // keep track of which coordinate point is being dragged
        dragIndex = i;
        // keep track of the mouse holding position
        dragHoldX = mouseX - pointsSelectorCoords[i][0];
        dragHoldY = mouseY - pointsSelectorCoords[i][1];
      }
    }
  });

  ctx.canvas.addEventListener('mousemove', function(e){
    // get mouse click position on canvas
    var mouseX = Math.round(e.pageX - offset.left);
    var mouseY = Math.round(e.pageY - offset.top);
    // when dragging a coordinate point
    if (dragging){
      var coordX;
      var coordY;
      var minX = radius;
      var maxX = canvas.width - radius;
      var minY = radius;
      var maxY = canvas.height - radius;
      // clamp the x y coordinates within the canvas
      coordX = mouseX - dragHoldX;
      coordX = (coordX < minX) ? minX : ((coordX > maxX) ? maxX : coordX);
      coordY = mouseY - dragHoldY;
      coordY = (coordY < minY) ? minY : ((coordY > maxY) ? maxY : coordY);
      // update the coordinates array
      pointsSelectorCoords[dragIndex][0] = coordX;
      pointsSelectorCoords[dragIndex][1] = coordY;
      // redraw on canvas
      drawCoordinates(ctx, pointsSelectorCoords, radius);
    }
  });
  // stop dragging when mouse is up
  ctx.canvas.addEventListener('mouseup', function(e){
     if (dragging){
        dragging = false;
     }
  });
}

/**
 * Method that returns the coordinates of the points selected
 * with the points selector tool.
 * @example
 *
 *     var coords = biojsvisbonestagram.getPointsSelectorCoords();
 *
 * @method getPointsSelectorCoords
 * @return {Array} An array of the coordinates 
 */
biojsvisbonestagram.getPointsSelectorCoords = function (){
  return pointsSelectorCoords;
}

/**
 * Method to start the Bonestagram visualisation of an DICOM image. 
 * You must have uploaded an DICOM and selected points using Bonestagram's 
 * enableDICOMUpload() and enableDICOMPreview() before calling this method.
 * @example
 *
 *     biojsvisbonestagram.screenshot();
 *
 * @method visualiseDICOM
 */
biojsvisbonestagram.visualiseDICOM = function (){
  console.log('visualise dicom');
  biojsvisbonestagram.setCustomImg({img:dicomImg, coords:pointsSelectorCoords});
  visCore.startFace();
}

/**
 * Method to take a screenshot of the Bonestagram visualisation. 
 * The screenshot will be shown in the HTML <img> element with class "bonestagram_screenshot".
 * @example
 *
 *     biojsvisbonestagram.screenshot();
 *
 * @method screenshot
 */
biojsvisbonestagram.screenshot = function (){
  console.log('screenshot');
  visCore.screenshot();
}


