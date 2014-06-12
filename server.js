"use strict";

var restify = require('restify');
var async = require('async');
var url = require('url');
var request = require('request');

var config = require('./config');
var alchemy = require('./alchemy');

// configure bunyan logger
var Logger = require('bunyan');
var log = new Logger({
    name: 'blinkreader-server',
    streams: [
        {   // one debug logger to stdout
            stream: process.stdout,
            level: 'debug'
        },
        {   // one trace log to a logfile
            path: config.logging.trace.logpath,
            level: 'trace'
        }
    ],
    serializers: {
        req: Logger.stdSerializers.req,
        res: restify.bunyan.serializers.res
    }
});

// build the server now
var server = restify.createServer({
    name : config.host.name,
    version : '0.0.1',
    log : log
});

// add a server formatter for HTML
server.formatters['text/html'] = function (req, res, body) {
    return body.toString();
};

// add loggers to pre and after to log all requests
if(config.logging.log.request) {
    server.pre(function (req, res, next) {
        req.log.info({req: req}, 'begin');
        return next();
    });
}
if(config.logging.log.response) {
    server.on('after', function (req, res, route) {
        req.log.info({res: res, route: route}, "end");
    });
}

// set up all our standard server modules
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());
server.use(restify.dateParser());
server.use(restify.jsonp());
server.use(restify.requestLogger());
server.use(restify.sanitizePath());

server.get('/alchemy/content/', function(req, res, next) {
    var targetUrl = url.parse(req.url).query;
    var targetUrl = targetUrl.indexOf('http://') === -1
        ? targetUrl.replace('http:/','http://') : targetUrl;
    alchemy.transmuteURL(targetUrl, ['title', 'text'],
        function(err, out){
            res.send(out);
            next();
        });
});

server.get('/proxy/', function(req, res, next) {
    var targetUrl = url.parse(req.url).query;
    var targetUrl = targetUrl.indexOf('http://') === -1
        ? targetUrl.replace('http:/','http://') : targetUrl;
    request(theUrl, function(err, response) {
        res.send(response);
        next();
    });
});

// serve statically from this dir
server.get(/.*/, function(req, res, next) {
    return restify.serveStatic({
        directory: __dirname,
        default: 'index.html'
    })(req, res, next);
});

server.listen(config.host.port, function () {
    log.info({message:'%s listening at %s'}, server.name, server.url);
});


