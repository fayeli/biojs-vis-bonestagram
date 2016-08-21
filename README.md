# biojs-vis-bonestagram

[![NPM version](http://img.shields.io/npm/v/biojs-vis-bonestagram.svg)](https://www.npmjs.org/package/biojs-vis-bonestagram) 

> AR Web Visualisation of DICOM Medical Images

## Demo
Try the demo at <http://www.bonestagram.com>

## Getting Started
Install the module with: `npm install biojs-vis-bonestagram`

## Usage Example

```javascript
var bonestagram = require("biojs-vis-bonestagram");
```


## Documentation

#### .create()

The 'create' method is responsible for creating a new bonestagram visualisation. By default, it looks for an HTML div with class "bonestagram_container", prompts user for web cam permission, checks browser support, and prepares the div for bonestagram visualisation.

e.g.
```html
<div class="bonestagram_container"></div>
```
```javascript
bonestagram.create();
```
After calling the 'create' method, the web cam stream should apper in the container div.

The method creates a visualisation of 300px by 400px by default, but you may customize the width and height by passing in options. 

e.g.
```javascript
bonestagram.create({width: "640", height: "480"}); // Works best when set to the same ratio as the web cam dimension
```
To create the bonestagram visualisation in your own div, you may also pass a reference though the options.

e.g.
```javascript
var myDiv = $("#myDiv").get(0);
bonestagram.create({container: myDiv, width: "640", height: "480"});
```

#### .start()

The 'start' method is responsible for starting the bonestagram visualisation. 

e.g.
```javascript
bonestagram.start();
```

#### .screenshot()

The 'screenshot' method is responsible for capturing the current screenshot of the bonestagram visualisation. The method looks for an HTML img element with class "bonestagram_screenshot" and set its src to the dataURL of the screenshot. After calling this method, the screenshot should apper in the img element.

e.g.
```html
<button id="screenshot_button">Take a Screenshot</button>
<img class="bonestagram_screenshot"></img>
```
```javascript
$("#screenshot_button").click(function(){
	bonestagram.screenshot();
});	
```

#### .setCustomImg()

**Parameter**: `img`
**Type**: `Object`
**Parameter**: `coords`
**Type**: `Array`

The 'setCustomImg' method allows for setting custom image for bonestagram visualisation. The method takes two options parameters, img and coords. img is a reference to an HTML img element containing the custom image, and coords is an array of the correspondence points. To find good correspondence points for an image, bonestagram provides a points selector tool. See the 'enablePointsSelector' method.

e.g.
```javascript
bonestagram.setCustomImg({img: myImg, coords: myCoords});
```

#### .enablePointsSelector(canvas)

**Parameter**: `canvas`
**Type**: `Object`

The 'enablePointsSelector' method is responsible for initialising a points selector tool on an HTML canvas element. The points selector tool allows you to manually select best fitted correspondence points by simple dragging. 

e.g.
```javascript
var canvas = $("#myCanvas").get(0);
bonestagram.enablePointsSelector(canvas);
```

#### .getPointsSelectorCoords()

**Return**: `coords`
**Type**: `Array`

The 'getPointsSelectorCoords' method returns the coordinates of the user selected points in an array. It is meant to be called after a points selector tool has been enabled on an HTML canvas with the 'enablePointsSelector' method.

e.g. 
```javascript
var canvas = $("#myCanvas").get(0);
bonestagram.enablePointsSelector(canvas);
// After user selected the points
var coords = bonestagram.getPointsSelectorCoords();
console.log(coords);
```

#### .enableDICOMPreview(div)

**Parameter**: `div`
**Type**: `Object`

The 'enableDICOMPreview' method is responsible for enabling preview of user uploaded DICOM image. This method takes a reference to an HTML div element, which will be where the preview is shown when user uploads an DICOM image.

e.g.
```html
<div id="myDiv"></div>
```
```javascript
var myDiv = $("#myDiv").get(0);
bonestagram.enableDICOMPreview(myDiv);
```

#### .enableDICOMUpload(fileInput)

**Parameter**: `fileInput`
**Type**: `Object`

The 'enableDICOMUpload' method is responsible for enabling upload of DICOM image. DICOM image uploaded through the file input will be displayed in the DICOM preview div. The point selector tool will also be enabled, so that user can pick the coordinates during preview.

```html
<input id="fileInput" type="file"></input>
<div id="myDiv"></div>
```
```javascript
var myDiv = $("#myDiv").get(0);
bonestagram.enableDICOMPreview();
var fileInput = $("#fileInput").get(0);
bonestagram.enableDICOMUpload(fileInput);
```

#### .visualiseDICOM()

The 'visualiseDICOM' method is responsible for starting the visualisation of a DICOM image. The method is meant to be used with the other bonestagram DICOM methods, enableDICOMUpload() and enableDICOMPreview(). The method takes the user uploaded DICOM image, and based on the user selected points during preview, starts the visualisation of that DICOM image. After calling this method, the visualisation should appear in the bonestagram container div.

e.g.
```javascript
$("#start_button").click(function(){
	bonestagram.visualiseDICOM();
}
```

## Contributing

All contributions are welcome.

## Support

If you have any problem or suggestion please open an issue [here](https://github.com/fayeli/biojs-vis-bonestagram/issues).

## Credits

## License 

The MIT License

Copyright (c) 2016, fayelisifi

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
