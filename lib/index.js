/*
 * biojs-vis-bonestagram
 * https://github.com/fayeli/biojs-vis-bonestagram
 *
 * Copyright (c) 2016 fayelisifi
 * Licensed under the MIT license.
 */

/**
@class biojsvisbonestagram
 */

/*
	Import the cornerstone library
*/
var cornerstone = require("./cornerstone.min");

var  biojsvisbonestagram;
module.exports = biojsvisbonestagram = function(opts){
  this.el = opts.el;
  this.el.textContent = biojsvisbonestagram.hello(opts.text);
  var d = $("div");
  cornerstone.enable(this.el);
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

