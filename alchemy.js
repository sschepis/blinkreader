var AlchemyAPI = require('./alchemyapi');
var api = new AlchemyAPI();
var async = require('async');

exports.transmute_options_all = [
    'url',
    'text',
    'title',
    'feeds',
    'microformats',
    'taxonomy',
    'combined',
    'image'
];
exports.transmuteURL = function(url, options, cb) {
    var operations = {};
    if(!cb) {
        cb = options;
        options = exports.transmute_options_all;
    }
    if(options.indexOf('url')!==-1)
        operations.url= function(callback) {
            callback(null, url);
        };
    if(options.indexOf('text')!==-1)
        operations.text = function(callback) {
            api.text('url', url, {}, function(response) {
                callback(null, response);
            });
        };
    if(options.indexOf('title')!==-1)
        operations.title= function(callback){
            api.title('url', url, {}, function(response) {
                callback(null, response);
            });
        };
    if(options.indexOf('feeds')!==-1)
        operations.feeds= function(callback){
            api.feeds('url', url, {}, function(response) {
                callback(null, response['feeds']);
            });
        };
    if(options.indexOf('microformats')!==-1)
        operations.microformats = function(callback) {
            api.microformats('url', url, {}, function(response) {
                callback(null, response['microformats']);
            });
        };
    if(options.indexOf('taxonomy')!==-1)
        operations.taxonomy = function(callback) {
            api.taxonomy('url', url, {}, function(response) {
                callback(null, response);
            });
        };
    if(options.indexOf('combined')!==-1)
        operations.combined = function(callback) {
            api.combined('url', url, {}, function(response) {
                callback(null, response);
            });
        };
    if(options.indexOf('image')!==-1)
        operations.microformats = function(callback) {
            api.image('url', url, {}, function(response) {
                callback(null, response);
            });
        };
    async.parallelLimit(operations, 3, cb);
};
