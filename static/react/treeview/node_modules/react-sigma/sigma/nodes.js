var Sigma =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 82);
/******/ })
/************************************************************************/
/******/ ({

/***/ 29:
/***/ (function(module, exports) {

/*** IMPORTS FROM imports-loader ***/
(function() {

;(function(undefined) {
  'use strict';

  var shapes = [];
  var register = function(name,drawShape,drawBorder) {
    shapes.push({
      'name': name,
      'drawShape': drawShape,
      'drawBorder': drawBorder
    });
  }

  var enumerateShapes = function() {
    return shapes;
  }

  /**
   * For the standard closed shapes - the shape fill and border are drawn the
   * same, with some minor differences for fill and border. To facilitate this we
   * create the generic draw functions, that take a shape drawing func and
   * return a shape-renderer/border-renderer
   * ----------
   */
  var genericDrawShape = function(shapeFunc) {
    return function(node,x,y,size,color,context) {
      context.fillStyle = color;
      context.beginPath();
      shapeFunc(node,x,y,size,context);
      context.closePath();
      context.fill();
    };
  }

  var genericDrawBorder = function(shapeFunc) {
    return function(node,x,y,size,color,context) {
      context.strokeStyle = color;
      context.lineWidth = size / 5;
      context.beginPath();
      shapeFunc(node,x,y,size,context);
      context.closePath();
      context.stroke();
    };
  }

  /**
   * We now proced to use the generics to define our standard shape/border
   * drawers: square, diamond, equilateral (polygon), and star
   * ----------
   */
  var drawSquare = function(node,x,y,size,context) {
    var rotate = Math.PI*45/180; // 45 deg rotation of a diamond shape
    context.moveTo(x+size*Math.sin(rotate), y-size*Math.cos(rotate)); // first point on outer radius, dwangle 'rotate'
    for(var i=1; i<4; i++) {
      context.lineTo(x+Math.sin(rotate+2*Math.PI*i/4)*size, y-Math.cos(rotate+2*Math.PI*i/4)*size);
    }
  }
  register("square",genericDrawShape(drawSquare),genericDrawBorder(drawSquare));

  var drawCircle = function(node,x,y,size,context) {
    context.arc(x,y,size,0,Math.PI*2,true);
  }
  register("circle",genericDrawShape(drawCircle),genericDrawBorder(drawCircle));

  var drawDiamond = function(node,x,y,size,context) {
    context.moveTo(x-size, y);
    context.lineTo(x, y-size);
    context.lineTo(x+size, y);
    context.lineTo(x, y+size);
  }
  register("diamond",genericDrawShape(drawDiamond),genericDrawBorder(drawDiamond));

  var drawCross = function(node,x,y,size,context) {
    var lineWeight = (node.cross && node.cross.lineWeight) || 5;
    context.moveTo(x-size, y-lineWeight);
    context.lineTo(x-size, y+lineWeight);
    context.lineTo(x-lineWeight, y+lineWeight);
    context.lineTo(x-lineWeight, y+size);
    context.lineTo(x+lineWeight, y+size);
    context.lineTo(x+lineWeight, y+lineWeight);
    context.lineTo(x+size, y+lineWeight);
    context.lineTo(x+size, y-lineWeight);
    context.lineTo(x+lineWeight, y-lineWeight);
    context.lineTo(x+lineWeight, y-size);
    context.lineTo(x-lineWeight, y-size);
    context.lineTo(x-lineWeight, y-lineWeight);
  }
  register("cross",genericDrawShape(drawCross),genericDrawBorder(drawCross));

  var drawEquilateral = function(node,x,y,size,context) {
    var pcount = (node.equilateral && node.equilateral.numPoints) || 5;
    var rotate = ((node.equilateral && node.equilateral.rotate) || 0)*Math.PI/180;
    var radius = size;
    context.moveTo(x+radius*Math.sin(rotate), y-radius*Math.cos(rotate)); // first point on outer radius, angle 'rotate'
    for(var i=1; i<pcount; i++) {
      context.lineTo(x+Math.sin(rotate+2*Math.PI*i/pcount)*radius, y-Math.cos(rotate+2*Math.PI*i/pcount)*radius);
    }
  }
  register("equilateral",genericDrawShape(drawEquilateral),genericDrawBorder(drawEquilateral));


  var starShape = function(node,x,y,size,context) {
    var pcount = (node.star && node.star.numPoints) || 5,
        inRatio = (node.star && node.star.innerRatio) || 0.5,
        outR = size,
        inR = size*inRatio,
        angleOffset = Math.PI/pcount;
    context.moveTo(x, y-size); // first point on outer radius, top
    for(var i=0; i<pcount; i++) {
      context.lineTo(x+Math.sin(angleOffset+2*Math.PI*i/pcount)*inR,
          y-Math.cos(angleOffset+2*Math.PI*i/pcount)*inR);
      context.lineTo(x+Math.sin(2*Math.PI*(i+1)/pcount)*outR,
          y-Math.cos(2*Math.PI*(i+1)/pcount)*outR);
    }
  }
  register("star",genericDrawShape(starShape),genericDrawBorder(starShape));

  /**
   * An example of a non standard shape (pacman). Here we WILL NOT use the
   * genericDraw functions, but rather register a full custom node renderer for
   * fill, and skip the border renderer which is irrelevant for this shape
   * ----------
   */
  var drawPacman = function(node,x,y,size,color,context) {
    context.fillStyle = 'yellow';
    context.beginPath();
    context.arc(x,y,size,1.25*Math.PI,0,false);
    context.arc(x,y,size,0,0.75*Math.PI,false);
    context.lineTo(x,y);
    context.closePath();
    context.fill();

    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    context.beginPath();
    context.arc(x+size/3,y-size/3,size/4,0,2*Math.PI,false);
    context.closePath();
    context.fill();
    context.stroke();

    context.fillStyle = 'black';
    context.beginPath();
    context.arc(x+4*size/9,y-size/3,size/8,0,2*Math.PI,false);
    context.closePath();
    context.fill();
  }
  register("pacman",drawPacman,null);

  /**
   * Exporting
   * ----------
   */
  this.ShapeLibrary = {

    // Functions
    enumerate: enumerateShapes,
    // add: addShape,

    // Version
    version: '0.1'
  };

}).call(window);

}.call(window));

/***/ }),

/***/ 30:
/***/ (function(module, exports) {

/*** IMPORTS FROM imports-loader ***/
(function() {

;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  if (typeof ShapeLibrary === 'undefined')
    throw 'ShapeLibrary is not declared';


  // Initialize package:
  sigma.utils.pkg('sigma.canvas.nodes');
  sigma.utils.pkg('sigma.svg.nodes');

  var sigInst = undefined;
  var imgCache = {};

  var initPlugin = function(inst) {
    sigInst = inst;
  }

  var drawImage = function (node,x,y,size,context) {
    if(sigInst && node.image && node.image.url) {
      var url = node.image.url;
      var ih = node.image.h || 1; // 1 is arbitrary, anyway only the ratio counts
      var iw = node.image.w || 1;
      var scale = node.image.scale || 1;
      var clip = node.image.clip || 1;

      // create new IMG or get from imgCache
      var image = imgCache[url];
      if(!image) {
        image = document.createElement('IMG');
        image.src = url;
        image.status = 'loading';
        image.onerror = function() {
          console.log("error loading", url);
          image.status = 'error';
        };
        image.onload = function(){
          // TODO see how we redraw on load
          // need to provide the siginst as a parameter to the library
          console.log("redraw on image load", url);
          image.status = 'ok';
          sigInst.refresh();
        };
        imgCache[url] = image;
      }

      // calculate position and draw
      var xratio = (iw<ih) ? (iw/ih) : 1;
      var yratio = (ih<iw) ? (ih/iw) : 1;
      var r = size*scale;

      // Draw the clipping disc:
      context.save(); // enter clipping mode
      context.beginPath();
      context.arc(x,y,size*clip,0,Math.PI*2,true);
      context.closePath();
      context.clip();

      if(image.status === 'ok') {
        // Draw the actual image
        context.drawImage(image,
            x+Math.sin(-3.142/4)*r*xratio,
            y-Math.cos(-3.142/4)*r*yratio,
            r*xratio*2*Math.sin(-3.142/4)*(-1),
            r*yratio*2*Math.cos(-3.142/4));
      }
      context.restore(); // exit clipping mode
    }
  }

  var drawSVGImage = function (node, group, settings) {
    if(sigInst && node.image && node.image.url) {
      var clipCircle = document.createElementNS(settings('xmlns'), 'circle'),
        clipPath = document.createElementNS(settings('xmlns'), 'clipPath'),
        clipPathId = settings('classPrefix') + '-clip-path-' + node.id,
        def = document.createElementNS(settings('xmlns'), 'defs'),
        image = document.createElementNS(settings('xmlns'), 'image'),
        url = node.image.url;

      clipPath.setAttributeNS(null, 'id', clipPathId);
      clipPath.appendChild(clipCircle);
      def.appendChild(clipPath);

      // angular's base tag will change the relative fragment id, so
      // #<clipPathId> doesn't work
      // HACKHACK: IE <=9 does not respect the HTML base element in SVG.
      // They don't need the current URL in the clip path reference.
      var absolutePath = /MSIE [5-9]/.test(navigator.userAgent) ?
        "" : document.location.href;
      // To fix cases where an anchor tag was used
      absolutePath = absolutePath.split("#")[0];
      image.setAttributeNS(null, 'class',
        settings('classPrefix') + '-node-image');
      image.setAttributeNS(null, 'clip-path',
        'url(' + absolutePath + '#' + clipPathId + ')');
      image.setAttributeNS(null, 'pointer-events', 'none');
      image.setAttributeNS('http://www.w3.org/1999/xlink', 'href',
        node.image.url);
      group.appendChild(def);
      group.appendChild(image);
    }
  }

  var register = function(name,drawShape,drawBorder) {
    sigma.canvas.nodes[name] = function(node, context, settings) {
      var args = arguments,
          prefix = settings('prefix') || '',
          size = node[prefix + 'size'],
          color = node.color || settings('defaultNodeColor'),
          borderColor = node.borderColor || color,
          x = node[prefix + 'x'],
          y = node[prefix + 'y'];

      context.save();

      if(drawShape) {
        drawShape(node,x,y,size,color,context);
      }

      if(drawBorder) {
        drawBorder(node,x,y,size,borderColor,context);
      }

      drawImage(node,x,y,size,context);

      context.restore();
    };

    sigma.svg.nodes[name] = {
      create: function(node, settings) {
        var group = document.createElementNS(settings('xmlns'), 'g'),
        circle = document.createElementNS(settings('xmlns'), 'circle');

        group.setAttributeNS(null, 'class',
          settings('classPrefix') + '-node-group');
        group.setAttributeNS(null, 'data-node-id', node.id);
        // Defining the node's circle
        circle.setAttributeNS(null, 'data-node-id', node.id);
        circle.setAttributeNS(null, 'class',
          settings('classPrefix') + '-node');
        circle.setAttributeNS(null, 'fill',
          node.color || settings('defaultNodeColor'));

        group.appendChild(circle);
        drawSVGImage(node, group, settings);
        return group;
      },
      update: function(node, group, settings) {
        var classPrefix = settings('classPrefix'),
          clip = node.image.clip || 1,
          // 1 is arbitrary, anyway only the ratio counts
          ih = node.image.h || 1,
          iw = node.image.w || 1,
          prefix = settings('prefix') || '',
          scale = node.image.scale || 1,
          size = node[prefix + 'size'],
          x = node[prefix + 'x'],
          y = node[prefix + 'y'];

          var r = scale * size,
          xratio = (iw<ih) ? (iw/ih) : 1,
          yratio = (ih<iw) ? (ih/iw) : 1;

        for(var i = 0, childNodes = group.childNodes; i < childNodes.length; i ++) {
          var className = childNodes[i].getAttribute('class');

          switch (className) {
            case classPrefix + '-node':
              childNodes[i].setAttributeNS(null, 'cx', x);
              childNodes[i].setAttributeNS(null, 'cy', y);
              childNodes[i].setAttributeNS(null, 'r', size);

              // // Updating only if not freestyle
              if (!settings('freeStyle')) {
                childNodes[i].setAttributeNS(
                  null,
                  'fill',
                  node.color || settings('defaultNodeColor'));
              }
              break;
            case classPrefix + '-node-image':
              childNodes[i].setAttributeNS(null, 'x',
                x+Math.sin(-3.142/4)*r*xratio);
              childNodes[i].setAttributeNS(null, 'y',
                y-Math.cos(-3.142/4)*r*yratio);
              childNodes[i].setAttributeNS(null, 'width',
                r*xratio*2*Math.sin(-3.142/4)*(-1));
              childNodes[i].setAttributeNS(null, 'height',
                r*yratio*2*Math.cos(-3.142/4));
              break;
            default:
              // no class name, must be the clip-path
              var clipPath = childNodes[i].firstChild;
              if (clipPath != null) {
                var clipPathId = classPrefix + '-clip-path-' + node.id;
                if (clipPath.getAttribute('id') === clipPathId) {
                  clipPath.firstChild.setAttributeNS(null, 'cx', x);
                  clipPath.firstChild.setAttributeNS(null, 'cy', y);
                  clipPath.firstChild.setAttributeNS(null, 'r',
                    clip * size);
                }
              }
              break;
          }
        }

        // showing
        group.style.display = '';
      }
    }
  }

  ShapeLibrary.enumerate().forEach(function(shape) {
    register(shape.name,shape.drawShape,shape.drawBorder);
  });

  /**
   * Exporting
   * ----------
   */
  this.CustomShapes = {

    // Functions
    init: initPlugin,
    // add pre-cache images

    // Version
    version: '0.1'
  };



}).call(window);

}.call(window));

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sigma_react_plugins_sigma_renderers_customShapes_shape_library_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sigma_react_plugins_sigma_renderers_customShapes_shape_library_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sigma_react_plugins_sigma_renderers_customShapes_shape_library_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sigma_react_plugins_sigma_renderers_customShapes_sigma_renderers_customShapes_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sigma_react_plugins_sigma_renderers_customShapes_sigma_renderers_customShapes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_sigma_react_plugins_sigma_renderers_customShapes_sigma_renderers_customShapes_js__);



/***/ })

/******/ });