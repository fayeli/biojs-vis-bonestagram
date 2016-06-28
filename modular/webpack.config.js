 module.exports = {
 	 resolve: {
 	 	modulesDirectories: ['./js'],
 	 	alias: {
 	 		"app": "app",
      		"jquery": "//ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min",
      		"numeric": "libs/numeric-1.2.6.min",
      		"jsfeat": "libs/jsfeat-min"	
 	 	}
 	 },
     entry: './js/app/bonestagram.js',
     output: {
         path: './bin',
         filename: 'bonestagram.bundle.js'
     }
 };