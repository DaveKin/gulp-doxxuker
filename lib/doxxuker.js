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
            var last = {
                group: '',
                component: ''
            };
            var docs = dox.parseComments(file.contents.toString());

            var sanitised = [];
            var saneDoc;
            // if(path.extname(file.path)=='.md'){
            //  console.log(docs);
            // }
            for (var i = 0; i < docs.length; i++) {
                docs[i].file = file.path.replace(file.cwd,'.');
                saneDoc = this.transform(docs[i], last);
                //console.log(last);
                if(saneDoc !== false){
                    last.group = saneDoc.group;
                    last.component = saneDoc.component;
                    sanitised.push(saneDoc);
                }
            };
            return sanitised;
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
    transform: function(obj, last){
        if(!obj.ctx || obj.ignore){
            return false;
        }
        var promoteTags = ['group','component','example','type','doc-type','doc-mixin'];
        // if the object has tags which match the promoteTags entries
        // create base object properties with the values
        for (var i = promoteTags.length - 1; i >= 0; i--) {
            obj[promoteTags[i]] = last[promoteTags[i]];
        };
        for (var i = obj.tags.length - 1; i >= 0; i--) {
            if( promoteTags.indexOf( obj.tags[i].type ) >= 0 ){
                switch(obj.tags[i].type){
                    case 'example':
                        obj[obj.tags[i].type] = this.unescapeAtSymbols(obj.tags[i].html);
                        break;
                    default:
                        obj[obj.tags[i].type] = obj.tags[i].string;
                        break;
                }
                obj.tags.splice(i,1);
            }
        };

        //add stylenames for style set vars
        if(obj['doc-type']==='styleset'){
            obj.stylenames = this.getStyleNames(obj.code);
        }

        // remove non required properties
        delete obj.isPrivate;
        delete obj.isConstructor;
        delete obj.isClass;
        delete obj.isEvent;
        delete obj.ignore;

        return obj;
    },

    unescapeAtSymbols: function(text){
        return text.replace(/\\@/g, '@');
    },

    getStyleNames: function(map){
        //remove whitespace and split at parentheses
        var arr = map.replace(/\s/g,'').split(/[\('\),']/);
        //remove variable name
        arr.shift();
        //keep first level labels
        var names = [];
        for(var i=0;i<arr.length;i++){
            if(arr[i].substr(-1) === ':' && arr[i+1].substr(-1) === ':'){
                names.push(arr[i].replace(/:/,''));
            }
        }
        return names;
    }

};
