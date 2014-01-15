/**
 @author Jean-Baptiste de Borman  - jb@noloading.com
 Generates svg graphics. Use SVGFactory.Params to specify the parameters in the right format.

 */

/*jslint vars:true, white:true, nomen:true, plusplus:true */
/*global $, trace, ScreenTools, openItems_array, ArrayTools, project_$, OPEN_WIDTH*/

var SVGFactory = {

	/**
	 Instanciate this object to get the right parameters structure with default values.
	 @constructor
	 @property {array} size : a 2 cells array containing height and width of the SVG-object

	 @property {int} strokeWidth : the thickness of strokes
	 @property {int} strokePadding : the distance between border and graphics inside the shape
	 @property {int} borderRadius : sets round corners to the background value = 0 => square ---- value = size/2 => circular shape
	 @property {boolean} flipV_bool : flips the graphic vertically if true;
	 */

	Params : function() {"use strict";

		this.strokeWidth = 3;
		this.strokePadding = 8;
		this.size = [30, 30];
		this.strokeWidth = 2;
		//value = 0 => square ---- value = size/2 => circular shape
		this.borderRadius = 15;
		this.flipV_bool = false;

	},

	/// PUBLIC FUNCTIONS

	/**
	 * Generates a close button.
	 * @param {object} params  an instance of the SVGFactory.Params object
	 * @return {object} svg_obj: An SVG-tag containing the SVG button.
	 */
	getCloseButton : function(params) {"use strict";

		var strokeWidth = Number(params.strokeWidth);
		var width = Number(params.size[0]);
		var height = Number(params.size[1]);

		var center = [width / 2, height / 2];
		var r = Number(width * 0.5) - params.strokeWidth;
		var tl = [params.strokePadding, params.strokePadding];
		var tr = [width - params.strokePadding, params.strokePadding];
		var bl = [params.strokePadding, height - params.strokePadding];
		var br = [width - params.strokePadding, height - params.strokePadding];
		var borderRadius = params.borderRadius;
		var flipH_bool = params.flipH_bool;
		var svg_str = "<svg class='svgClose' xmlns='http://www.w3.org/2000/svg' version='1.1' width = '" + width + "' height = '" + height + "'>";
		svg_str += this._getShape(width, height, strokeWidth, borderRadius);
		svg_str += "<line x1='" + tl[0] + "' y1='" + tl[1] + "' x2='" + br[0] + "' y2='" + br[1] + "' stroke='black' stroke-width='" + strokeWidth + "'></line>";
		svg_str += "<line x1='" + bl[0] + "' y1='" + bl[1] + "' x2='" + tr[0] + "' y2='" + tr[1] + "' stroke='black' stroke-width='" + strokeWidth + "'></line></svg>";
		return $(svg_str);
	},

	/**
	 * Generates an arrow-button pointing to the right. Can be flipped to left by setting params.flipV_bool to false;
	 * @param {object} params  an instance of the SVGFactory.Params object
	 * @return {object} svg_obj: An SVG-tag containing the SVG buttons.
	 */
	getArrowButton : function(params) {"use strict";
		var width = Number(params.size[0]);
		var height = Number(params.size[1]);
		var strokeWidth = params.strokeWidth;
		var r = Number(width * 0.5) - params.strokeWidth;
		var tl = [params.strokePadding, params.strokePadding];
		var tr = [width - params.strokePadding, params.strokePadding];
		var bl = [params.strokePadding, height - params.strokePadding];
		var br = [width - params.strokePadding, height - params.strokePadding];
		var center = [width / 2, height / 2];

		var borderRadius = params.borderRadius;
		var flipV_bool = params.flipV_bool;

		var svg_str = "<svg class='svgArrow' xmlns='http://www.w3.org/2000/svg' version='1.1' width = '" + width + "' height = '" + height + "'>";

		svg_str += this._flipV(flipV_bool, width);

		svg_str += this._getShape(width, height, strokeWidth, borderRadius);
		svg_str += "<line x1='" + center[0] + "' y1='" + tl[0] + "' x2='" + br[0] + "' y2='" + center[1] + "' stroke='black' stroke-width='" + strokeWidth + "'></line>";
		svg_str += "<line x1='" + center[0] + "' y1='" + bl[1] + "' x2='" + br[0] + "' y2='" + center[1] + "' stroke='black' stroke-width='" + strokeWidth + "'></line>";

		svg_str += "<line x1='" + tl[0] + "' y1='" + center[1] + "' x2='" + br[0] + "' y2='" + center[1] + "' stroke='black' stroke-width='" + strokeWidth + "'></line></svg>";
		return $(svg_str);
	},
	
	/**
	 * Generates a circle
	 * @param {object} params  an instance of the SVGFactory.Params object
	 * @return {object} svg_obj: An SVG-tag containing the SVG buttons.
	 */
	getShape : function(params) {"use strict";
		var width = Number(params.size[0]);
		var height = Number(params.size[1]);
		var strokeWidth = params.strokeWidth;
		var borderRadius = params.borderRadius;
		var svg_str = "<svg class='svgShape' xmlns='http://www.w3.org/2000/svg' version='1.1' width = '" + width + "' height = '" + height + "'>";
		svg_str += this._getShape(width, height, strokeWidth, borderRadius);
		return $(svg_str);
	},

	/* PRIVATE FUNCTIONS
	 @ignore */
	_getShape : function(width, height, strokeWidth, borderRadius) {"use strict";

		return "<rect class='mainShape' x='" + strokeWidth * 0.5 + "'y = '" + strokeWidth * 0.5 + "' ry='" + borderRadius + "' rx='" + borderRadius + "' width='" + Number(width - strokeWidth) + "' height='" + Number(height - strokeWidth) + "' stroke='black' stroke-width='" + strokeWidth + "'  fill='white'> </rect>";

	},

	//this string flips svg graphics;
	//@ignore
	_flipV : function(flipV_bool, width) {"use strict";

		if (flipV_bool) {
			var svg_str = "";
			svg_str += " <g transform='translate (" + width + " 0)'>";
			svg_str += " <g transform='scale(-1 1)'>";
			return svg_str;
		}
		return ("");

	}
}