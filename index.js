'use strict';
var gutil = require('gulp-util');
var File = gutil.File;
var through = require('through2');
var path = require('path');
var doxxuker = require('./lib/doxxuker');

module.exports = function (file, options) {
	if (!file) {
		throw new gutil.PluginError('gulp-doxxuker', '`file` required');
	}

	var latestFile;
	var latestMod;
	var docs;

	function bufferContents(file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-doxxuker', 'Streaming not supported'));
			return;
		}

		// set latest file if not already set,
		// or if the current file was modified more recently.
		if (!latestMod || file.stat && file.stat.mtime > latestMod) {
			latestFile = file;
			latestMod = file.stat && file.stat.mtime;
		}

		if(!docs){
			docs = [];
		}

		try {
			var doc = doxxuker.parse(file);
			if(doc !== null){
				docs = docs.concat(doc);
			}
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-doxxuker', err));
		}

		cb();
	}

	function endStream(cb) {

		if (!latestFile || !docs) {
      		cb();
      		return;
    	}

    	var docdata;

    	if (typeof file === 'string') {
	      docdata = latestFile.clone({contents: false});
	      docdata.path = path.join(latestFile.base, file);
	    } else {
	      docdata = new File(file);
	    }

    	docdata.contents = new Buffer(JSON.stringify(docs,null,2));

    	this.push(docdata);
    	cb();
	}

	return through.obj(bufferContents, endStream);
};
