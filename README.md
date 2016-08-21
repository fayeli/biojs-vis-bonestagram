# biojs-vis-bonestagram

[![NPM version](http://img.shields.io/npm/v/biojs-vis-bonestagram.svg)](https://www.npmjs.org/package/biojs-vis-bonestagram) 

> AR Web Visualisation of DICOM Medical Images

## Demo
Try the demo at <http://www.bonestagram.com>

## Getting Started

Install the module with: `npm install biojs-vis-bonestagram`

```javascript
var bonestagram = require('biojs-vis-bonestagram');
bonestagram.hello("biojs"); // "hello biojs"
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

The method creates a visualisation of 300px by 400px, but you may customize the width and height by passing in options. 
e.g.
```javascript
bonestagram.create({width: "640", height: "480"}); // Works best when set to the same ratio as the web cam dimension
```
To create the bonestagram visualisation in your own div, you may also pass a reference though the option.
e.g.
```javascript
var myDiv = $("#myDiv").get(0);
app.creat({container: myDiv, width: "640", height: "480"});
```

#### .start()

The 'start' method is responsible for starting the bonestagram visualisation. 

e.g.

```javascript
bonestagram.start();
```

#### .enableDICOMPreview()

The 'enableDICOMPreview' method is responsible for enabling preview of user uploaded DICOM image. The DICOM preview will be shown in an HTML div element with id="dicomImage". 

e.g.
```html
<div id="dicomImage"></div>
```
```javascript
bonestagram.enableDICOMPreview();
```

#### .enableDICOMUpload(fileInput)

**Parameter**: `fileInput`
**Type**: `Object`

The 'enableDICOMUpload' method is responsible for enabling upload of DICOM image. DICOM image uploaded through the file input will be displayed in the HTML div element with id="dicomImage".

How to use this method
```html
<input id="fileInput" type="file"></input>
<div id="dicomImage"></div>
```
```javascript
bonestagram.enableDICOMPreview();
var fileInput = $("#fileInput").get(0);
bonestagram.enableDICOMUpload(fileInput);
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
