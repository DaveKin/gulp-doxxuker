module.exports = [
	function (str, parentContext) {
	    // mixin
	    if (/^\s*@mixin\s+([\w,\-$]+)\s*\(/.exec(str)) {
	      	return {
		        type: 'mixin', 
		        name: RegExp.$1, 
	      	};
	    } else {
	    	return false;
	    }
	},
	function (str, parentContext) {
	    // placeholder
	    if (/^\s*(%[\w,\-$]+)\s*\{/.exec(str)) {
	      	return {
		        type: 'placeholder', 
		        name: RegExp.$1, 
	      	};
	    } else {
	    	return false;
	    }
	},
	function (str, parentContext) {
	    // variable
	    if (/^\s*(\$[\w,\-$]+)\s*:/.exec(str)) {
	      	return {
		        type: 'variable', 
		        name: RegExp.$1, 
	      	};
	    } else {
	    	return false;
	    }
	},
	function (str, parentContext) {
	    // class
	    if (/^\s*(\.[\w,\-,\_$]+)\s*\{/.exec(str)) {
	      	return {
		        type: 'class', 
		        name: RegExp.$1, 
	      	};
	    } else {
	    	return false;
	    }
	},
	function (str, parentContext) {
	    // id
	    if (/^\s*(\#[\w,\-,\_$]+)\s*\{/.exec(str)) {
	      	return {
		        type: 'id', 
		        name: RegExp.$1, 
	      	};
	    } else {
	    	return false;
	    }
	}
];