module.exports = [
	function (str, parentContext) {
	    // mixin
	    if (/^\s*@mixin\s+([\w,\-$]+)\s*\(/.exec(str)) {
	      	return {
		        type: 'SASS Mixin', 
		        name: RegExp.$1, 
	      	};
	    } else {
	    	return false;
	    }
	},
	function (str, parentContext) {
	    // mixin
	    if (/^\s*@function\s+([\w,\-$]+)\s*\(/.exec(str)) {
	      	return {
		        type: 'SASS Function', 
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
		        type: 'SASS Placeholder', 
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
		        type: 'SASS Variable', 
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
		        type: 'CSS Class', 
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
		        type: 'CSS ID', 
		        name: RegExp.$1, 
	      	};
	    } else {
	    	return false;
	    }
	}
];