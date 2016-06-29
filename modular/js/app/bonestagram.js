define(['libs/clm','model/model_pca_20_svm', 'libs/face_deformer', 'libs/utils', 'jsfeat'], function(clm, pModel, face_deformer, utils, jsfeat){
	// Private
	var vid;
	var width;
	var height;
	var facePos;
	var handPos;
	var bonesCoords; 
	bonesCoords = [[121.92799191984679,184.19216240419755],[118.74113263254269,253.7017373484083],[128.07732840700828,314.0651648786312],[145.50341586402052,377.3404382903117],[175.0470179047746,428.3720278198884],[218.26268310246033,467.2344402538887],[271.42588166495466,485.128073946532],[316.6864139765614,486.50538113163066],[375.1889691089136,482.48530971536445],[425.71357990120225,454.4214900408549],[467.1292936657478,419.537754329594],[493.2308725208873,370.6466670145585],[507.3945907183312,305.3965374123],[514.1098885852615,238.51000761747102],[507.2009944162471,174.7364492942625],[465.59705810723074,136.75665747531139],[432.10874975324265,125],[384.15174446143584,125],[351.54488594535763,135.22963355336668],[162.16177451030518,144.72103952617107],[194.70376235949394,126],[241,130],[277.5198647210173,137.82992220884094],[192.5627380181407,182.35373455399292],[225.1658086004223,166.85817167285668],[262.9021389237093,184.72604899079232],[224.82421319031323,193.62679469584918],[224.9386274222809,179.73191446260716],[443.75218061508883,177.1556294105885],[407.36102478935464,162.1785032964798],[367.3426762945685,181.37362678808685],[405.2498567443763,188.75927101523848],[404.863153412407,173.65270066194788],[314,170],[277.2539320006613,252.0592473714927],[272.790607031229,295.0832945003201],[285.64778558874696,305.54255347445314],[311.4772090972725,302.7859653833357],[345.4959193923387,303.6561959465791],[354.27275089177823,294.043842539653],[344.1140334647449,250.14961061471956],[317,224],[297.770695143374,289.6331974142146],[327.24114846328195,286.942330984987],[246.8532880314441,383.38004806995957],[275.1557077756945,372.35352520595814],[295.9902196911147,369.59821534914704],[319.11457426149127,376.0358352022737],[342.3055779254553,369.5427982113969],[363.49269601972713,366.1538257295358],[387.63652105652415,379.4911974180641],[375.0778975047938,391.4413420753004],[352.32935954043757,405.19247889714825],[320.19499419206926,411.930992226806],[288.9192573286629,407.35752671668797],[265.61253113280924,398.527019223827],[283.6817714614754,393.82667526139215],[317.16223074694074,396.86502934549657],[360.1212544588326,387.7487964985724],[348.7270998810554,384.15603335898066],[319.91210334135167,389.2901736762333],[291.7920218316411,388.2798825278876],[311.66814785515174,277.11007275979364],[206.36606604411398,171.6086547538323],[247.5375468161923,170.29657636660522],[246.36866333618227,191.67729410789994],[205.19888043799355,189.99033691329964],[429.0603263358775,166.1691180598579],[386.8504393293843,166.2774220754911],[384.7938981921405,186.5701136634426],[426.9983448269614,184.45786533091854]];
	var bonesImg;
	// an instance of the CLM tracker
	var ctrack;
	// an instance of face deformer
	var fd;
	var face_overlay;
	var face_overlayCC;
	var hand_overlay;
	var hand_overlayCC;
	var gl;
	// Variables for optical flow
	var curr_img_pyr, prev_img_pyr, point_count, point_status, prev_xy, curr_xy;
	var op_win_size = 20;
	var op_max_iterations = 30;
	var op_epsilon = 0.01;
	var op_min_eigen = 0.001;

	var checkWebGL = function(){
		console.log("Checking WebGL support..");
		var webGLContext;
		var webGLTestCanvas = document.createElement('canvas');
		if (window.WebGLRenderingContext) {
			webGLContext = webGLTestCanvas.getContext('webgl') || webGLTestCanvas.getContext('experimental-webgl');
			if (!webGLContext || !webGLContext.getExtension('OES_texture_float')) {
					webGLContext = null;
				}
		}
		if (webGLContext == null) {
			console.log("There seems to be no support for WebGL with your browser. Please try again. ):");
		} else {
			console.log("Aaand.. it's good! (: ");
		}
	}
	var setupCamera = function(){
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
		window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;
				
		// check for camerasupport
		if (navigator.getUserMedia) {
			// set up stream			
			// chrome 19 shim
			var videoSelector = {video : true};
			if (window.navigator.appVersion.match(/Chrome\/(.*?) /)) {
				var chromeVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
				if (chromeVersion < 20) {
					videoSelector = "video";
				}
			};
					
			navigator.getUserMedia(videoSelector, 
				function( stream ) {
					if (vid.mozCaptureStream) {
						vid.mozSrcObject = stream;
					} else {
						vid.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
					}

					vid.play();
				},

				function() {
					//insertAltVideo(vid);
					console.log("There was problem fetching your webcam stream. Please check your privacy settings and try again.");
				});

		} else {
			//insertAltVideo(vid)
			alert("There seems to be no support for getUserMedia on your browser and we are unable to fetch your webcam stream. ): ");
		}					
	}

	// called when video is ready to start playing
	var vidCanPlay = function(){
		console.log("Video is ready to start playing.");
	}

	var converged = false;
	var drawFaceLoop = function(){
		facePos = ctrack.getCurrentPosition(vid);
		face_overlayCC.clearRect(0, 0, width, height);
		if (facePos) {
			if (converged){
				// draw mask
				fd.draw(facePos);
			} else {
				// draw current grid
				ctrack.draw(face_overlay);
				// check whether mask has converged
				var pn = ctrack.getConvergence();
				if (pn < 0.4) {
					converged = true;
				}
			}
		}
		requestAnimFrame(drawFaceLoop);
	}

	var drawHandLoop = function(){
		if (vid.readyState === vid.HAVE_ENOUGH_DATA) {
			hand_overlayCC.drawImage(vid, 0, 0, width, height);
			var imageData = hand_overlayCC.getImageData(0,0,width,height);
			// swap flow data
			var _pt_xy = prev_xy;
			prev_xy = curr_xy;
			curr_xy = _pt_xy;
			var _pyr = prev_img_pyr;
			prev_img_pyr = curr_img_pyr;
			curr_img_pyr = _pyr;

			// grayscale
			jsfeat.imgproc.grayscale(imageData.data, width, height, curr_img_pyr.data[0]);

			// build image pyramid
			curr_img_pyr.build(curr_img_pyr.data[0], true);

			// optical flow 
			jsfeat.optical_flow_lk.track(prev_img_pyr, curr_img_pyr, prev_xy, curr_xy, point_count, op_win_size|0, op_max_iterations|0, point_status, op_epsilon, op_min_eigen);

			// prune low points
			var n = point_count;
			var j = 0;
			for (var i = 0; i < n; i++){
				if (point_status[i] == 1){
					if (j<i){
						curr_xy[j<<1] = curr_xy[i<<1];
						curr_xy[(j<<1)+1] = curr_xy[(i<<1)+1];
					}
					// draw good points
					var x = curr_xy[j<<1];
					var y = curr_xy[(j<<1)+1];
					drawMarker(hand_overlayCC, x, y);
					j++;
				}
			}
			point_count = j;

		}

		requestAnimFrame(drawHandLoop);
	}

	function drawMarker(ctx, x, y) {
		ctx.fillStyle = "#98ff98";
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    }

	function relMouseCoords(event, element) {
        var totalOffsetX=0,totalOffsetY=0,canvasX=0,canvasY=0;
        var currentElement = element;

        do {
            totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
            totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
        } while(currentElement = currentElement.offsetParent)

        canvasX = event.pageX - totalOffsetX;
        canvasY = event.pageY - totalOffsetY;

        return {x:canvasX, y:canvasY}
    }


	// The object return below is exposed to the public
	return {
		// Public
		init: function(options){
			if (typeof options !== "undefined") {
				vid = options.video[0];
				bonesImg = options.img[0];
			} else {
				vid = document.getElementsByClassName("bonestagram_video")[0];
				bonesImg = document.getElementsByClassName("bonestagram_img")[0];
			}
			height = vid.height;
			width = vid.width;
			gl = document.getElementsByClassName('bonestagram_gl')[0];
			face_overlay = document.getElementsByClassName("bonestagram_face_overlay")[0];
			face_overlayCC = face_overlay.getContext('2d');	
			hand_overlay = document.getElementsByClassName("bonestagram_hand_overlay")[0];
			hand_overlayCC = hand_overlay.getContext('2d');	
			checkWebGL();
			setupCamera();
			ctrack = new clm.tracker();
			ctrack.init(pModel);
			fd = new face_deformer.faceDeformer();
			fd.init(gl);
			fd.load(bonesImg, bonesCoords, pModel);

		},
		startFace: function(){
			ctrack.start(vid);
			drawFaceLoop();
		},
		startHand: function(){
			console.log('start hand');
			curr_img_pyr = new jsfeat.pyramid_t(3);
            prev_img_pyr = new jsfeat.pyramid_t(3);
            curr_img_pyr.allocate(width, height, jsfeat.U8_t|jsfeat.C1_t);
            prev_img_pyr.allocate(width, height, jsfeat.U8_t|jsfeat.C1_t);

            console.log(curr_img_pyr);
         	console.log(prev_img_pyr);
            point_count = 0;
            point_status = new Uint8Array(100);
            prev_xy = new Float32Array(100*2);
            curr_xy = new Float32Array(100*2);

            // enable click to add tracking points
            hand_overlay.addEventListener('click', function(e){
            	var coords = relMouseCoords(e, hand_overlay);
            	console.log(coords.x+ ' ' + coords.y);
            	curr_xy[point_count<<1] = width - coords.x;
            	curr_xy[(point_count<<1)+1] = coords.y;
            	point_count++;
            }, false);
            
            drawHandLoop();
		},
		setBonesCoords: function(coords){
			bonesCoords = coords;
			fd.load(bonesImg, bonesCoords, pModel);		
		},
		setBonesImg: function(img){
			bonesImg = img;
			fd.load(bonesImg, bonesCoords, pModel);
		}
	}
});