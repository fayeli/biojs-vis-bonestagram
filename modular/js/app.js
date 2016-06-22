// Configure loading modules 
requirejs.config({
    "baseUrl": "js/",
    "paths": {
      "app": "app",
      "jquery": "//ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min",
      "numeric": "libs/numeric-1.2.6.min"
    },
    shim: {
    	"numeric": {
    		exports: "numeric"
    	},
    	"webgl-utils": {
    		exports: "webglUtils"
    	}
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);