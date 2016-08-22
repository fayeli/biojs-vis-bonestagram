# biojs-vis-bonestagram

[![NPM version](http://img.shields.io/npm/v/biojs-vis-bonestagram.svg)](https://www.npmjs.org/package/biojs-vis-bonestagram) 

> AR Web Visualisation of DICOM Medical Images

## Demo
Try the demo at <http://www.bonestagram.com>

## Getting Started
Install the module with: `npm install biojs-vis-bonestagram`

## Usage Example

This is a step-by-step quick start guide on how to develop a web app with the bonestagram library. You will be creating a visualisation of a dental Xray image.

1. In a new HTML file, start with the following bare-bone template:

	```html
	<html lang="en">
	<head>
	  <meta charset="utf-8">
	  <title>Bonestagram Quick Start Usage Example</title>
	  <!-- Bonestagram needs its css file to run properly. Include a link referencing the file (bonestagram.css in the css folder).-->
	  <link rel="stylesheet" href="./css/bonestagram.css">
	</head>
	<body>
		<button id="start_button">Start Visualisation</button>
		<button id="screenshot_button">Take a Screenshot</button>
		<div class="bonestagram_container"></div>
		<img class="bonestagram_img" src="./examples/img/xray.png"></img>
		<img class="bonestagram_screenshot"><img>

		<!-- Bonestagram depends on jQuery for most of the features. Include a script tag to load the jQuery library before loading the Bonestagram library (bonestagram.bundle.js in the dist folder). -->
		<script src="./lib/jquery-3.1.0.min.js"></script>
		<script src="./dist/bonestagram.bundle.js"></script>
	</body>
	</html>
	```
2. Serve the file to local host to check it out. I like to use `python -m SimpleHTTPServer` 
3. Next, you may start writing the javascript to create the visualisation. Let's create a visualisation of 640px by 480px. 
	```javascript
	bonestagram.create({width: 640, height:480});
	```
Bonestagram will prompt the user to give permission to the webcam, and checks for browser support. After that, you should see the webcam stream appears in the div with class "bonestagram_container".

4. Now, let's tell bonestagram which medical image to visualise. The coords array contains the coordinates information on the correspondense points, allowing bonestagram to visualise a certain image properly. The points may be different for different image. You may pick the points with the points selector tool for your own image. But for now, you can not worry about that and go ahead with the example xray image and the default coordinates. (:
	```javascript
	var myImg = $('.bonestagram_img').get(0);
	var myCoords = [[121.92799191984679,184.19216240419755],[118.74113263254269,253.7017373484083],[128.07732840700828,314.0651648786312],[145.50341586402052,377.3404382903117],[175.0470179047746,428.3720278198884],[218.26268310246033,467.2344402538887],[271.42588166495466,485.128073946532],[316.6864139765614,486.50538113163066],[375.1889691089136,482.48530971536445],[425.71357990120225,454.4214900408549],[467.1292936657478,419.537754329594],[493.2308725208873,370.6466670145585],[507.3945907183312,305.3965374123],[514.1098885852615,238.51000761747102],[507.2009944162471,174.7364492942625],[465.59705810723074,136.75665747531139],[432.10874975324265,125],[384.15174446143584,125],[351.54488594535763,135.22963355336668],[162.16177451030518,144.72103952617107],[194.70376235949394,126],[241,130],[277.5198647210173,137.82992220884094],[192.5627380181407,182.35373455399292],[225.1658086004223,166.85817167285668],[262.9021389237093,184.72604899079232],[224.82421319031323,193.62679469584918],[224.9386274222809,179.73191446260716],[443.75218061508883,177.1556294105885],[407.36102478935464,162.1785032964798],[367.3426762945685,181.37362678808685],[405.2498567443763,188.75927101523848],[404.863153412407,173.65270066194788],[314,170],[277.2539320006613,252.0592473714927],[272.790607031229,295.0832945003201],[285.64778558874696,305.54255347445314],[311.4772090972725,302.7859653833357],[345.4959193923387,303.6561959465791],[354.27275089177823,294.043842539653],[344.1140334647449,250.14961061471956],[317,224],[297.770695143374,289.6331974142146],[327.24114846328195,286.942330984987],[246.8532880314441,383.38004806995957],[275.1557077756945,372.35352520595814],[295.9902196911147,369.59821534914704],[319.11457426149127,376.0358352022737],[342.3055779254553,369.5427982113969],[363.49269601972713,366.1538257295358],[387.63652105652415,379.4911974180641],[375.0778975047938,391.4413420753004],[352.32935954043757,405.19247889714825],[320.19499419206926,411.930992226806],[288.9192573286629,407.35752671668797],[265.61253113280924,398.527019223827],[283.6817714614754,393.82667526139215],[317.16223074694074,396.86502934549657],[360.1212544588326,387.7487964985724],[348.7270998810554,384.15603335898066],[319.91210334135167,389.2901736762333],[291.7920218316411,388.2798825278876],[311.66814785515174,277.11007275979364],[206.36606604411398,171.6086547538323],[247.5375468161923,170.29657636660522],[246.36866333618227,191.67729410789994],[205.19888043799355,189.99033691329964],[429.0603263358775,166.1691180598579],[386.8504393293843,166.2774220754911],[384.7938981921405,186.5701136634426],[426.9983448269614,184.45786533091854]];
	bonestagram.setCustomImg({img: myImg, coords: myCoords});
	```

5. After that, we can bind the start button to start the visualisation.
	```javascript
	$('#start_button').click(function(){
		bonestagram.start();
	});
	```

6. Last but not least, bind the screenshot button so that we can take selfies with the visualisation! The screenshot taken will be display in the HTML img element with class "bonestagram_screenshot".
	```javascript
	$('#screenshot_button').click(function(){
		bonestagram.screenshot();
	});
	```
Hope you enjoy this quick start guide! The full code of this tutorial is available in quickstart.html.

For more examples, please feel free to check out the snippets in the examples folder. There are examples about how to load a standard medical image DICOM file (.dcm), how to use the points selector tool, etc. 


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
