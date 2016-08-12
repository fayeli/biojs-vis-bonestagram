# biojs-vis-bonestagram

[![NPM version](http://img.shields.io/npm/v/biojs-vis-bonestagram.svg)](https://www.npmjs.org/package/biojs-vis-bonestagram) 

> AR Web Visualisation of DICOM Medical Images

## Working Demo
Try it at https://www.bonestagram.com

## Getting Started
Bonestagram requires jQuery to run the visualisation. Include a HTML script tag to import the jQuery library.

```html
<script src="https://code.jquery.com/jquery-3.1.0.min.js" integrity="sha256-cCueBR6CsyA4/9szpPfrX3s49M9vUU5BgtiJj06wt/s=" crossorigin="anonymous"></script>
```

Install the module with: `npm install biojs-vis-bonestagram`

```javascript
var bonestagram = require('biojs-vis-bonestagram');
bonestagram.hello("biojs"); // "hello biojs"
```

## Documentation

#### .hello(name)

**Parameter**: `name`
**Type**: `String`
**Example**: `biojs`

The 'hello' method is responsible for showing a name.

How to use this method

```javascript
bonestagram.hello('biojs'); // "hello biojs"
```

## Contributing

All contributions are welcome.

## Support

If you have any problem or suggestion please open an issue [here](https://github.com/fayeli/biojs-vis-bonestagram/issues).

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
