/*
 * biojs-vis-bonestagram
 * https://github.com/fayeli/biojs-vis-bonestagram
 *
 * Copyright (c) 2016 fayelisifi
 * Licensed under the MIT license.
 */

/*
	Import the cornerstone library
*/
var cornerstone = require("./cornerstone.min");
/*
	Import the webpack bundled bonestagram code
*/
var visCore = require("./bonestagramVisCore");
/**
@class biojsvisbonestagram
 */

var  biojsvisbonestagram;
module.exports = biojsvisbonestagram = function(opts){
  this.el = opts.el;
  this.el.textContent = biojsvisbonestagram.hello(opts.text);
  console.log(visCore);
};

/**
 * Private Methods
 */

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



