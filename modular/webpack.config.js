 module.exports = {
 	resolve: {
 	 	modulesDirectories: ['./js','./node_modules'],
 	 	alias: {
 	 		"app": "app",
      		"numeric": "libs/numeric-1.2.6.min",
      		"jsfeat": "libs/jsfeat-min"
 	 	},
 	 },
    entry: './js/app/bonestagram.js',
    output: {
         path: './bin',
         filename: 'bonestagram.bundle.js',
         libraryTarget: 'var',
         library: 'Bonestagram'
    }
 };