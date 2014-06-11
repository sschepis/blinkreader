#!/bin/sh
browserify -r fs:browserify-fs -r http:http-browserify -r request:browser-request -r async > ./app/scripts/bundle.js
