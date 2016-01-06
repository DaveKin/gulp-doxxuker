'use strict'
var fs = require('fs');
var path = require('path');
var dox = require('dox');
var glob = require('glob');

var scssCM = require('./doxxuker-contextmatchers-scss.js');

dox.contextPatternMatchers = dox.contextPatternMatchers.concat(scssCM);

module.exports = {
	/**
	 * reads the file and parses for annotations
	 * @param  {file} file - the file to parse
	 * @return {array} the parsed and transformed documentation array
	 */
	parse: function(file){
		try{
			var docs = dox.parseComments(file.contents.toString());
			for (var i = docs.length - 1; i >= 0; i--) {
				docs[i].file = file.path.replace(file.cwd,'.');
				docs[i] = this.transform(docs[i]);
			};
			return docs;
		} catch (err) {
			//console.log(err);
			return null;
		}
	},
	/**
	 * transform the object structure
	 * @param  {object} obj the parsed object
	 * @return {object}     the transformed object
	 */
	transform: function(obj){
		var promoteTags = ['group','component'];
		// if the object has tags which match the promoteTags entries
		// create base object properties with the values
		for (var i = obj.tags.length - 1; i >= 0; i--) {
			if( promoteTags.indexOf( obj.tags[i].type ) >= 0 ){
				obj[obj.tags[i].type] = obj.tags[i].string;
				obj.tags.splice(i,1);
				//i--;
			}
		};

		// remove non required properties
		delete obj.isPrivate;
	    delete obj.isConstructor;
	    delete obj.isClass;
	    delete obj.isEvent;
	    delete obj.ignore;

		return obj;
	}
};
