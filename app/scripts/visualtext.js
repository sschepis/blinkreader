"use strict";

var PAUSE_NORMAL = 120;
var PAUSE_COMMA = 200;
var PAUSE_PERIOD = 280;
var BOOKEND = {bookend:true,word:false};

/**
 * VisualText A doubly linked list of strings
 * @param data
 * @constructor
 */
function VisualText(data) {
    this.word = data.trim();
    this.index = 0;
    this.nextWord = BOOKEND;
    this.prevWord = BOOKEND;
    if(this.word.indexOf(',') !== -1)
        this.pause = PAUSE_COMMA;
    else if (this.word.indexOf('.') !== -1)
        this.pause = PAUSE_PERIOD;
    else
        this.pause = PAUSE_NORMAL;
}
VisualText.split = function(textToDisplay, splbnd) {
    var displayOut = [];
    if(!splbnd) splbnd = ' ';
    var tarray = textToDisplay.split(splbnd);
    for(var el in tarray) {
        el = tarray[el];
        displayOut.push( new VisualText(el) );
        displayOut[displayOut.length-1].index = displayOut.length-1;
        if(displayOut.length > 1) {
            displayOut[displayOut.length - 2].nextWord = displayOut[displayOut.length - 1];
            displayOut[displayOut.length - 1].prevWord = displayOut[displayOut.length - 2];
        }
    }
    return displayOut.length > 0 ? displayOut[0] : BOOKEND;
};
VisualText.prototype.play = function(timeout, callback, complete) {
    var timeoutOverride =  callback ? timeout : -1;
    callback = callback ? callback : timeout;
    var start = this;
    if(!start || start.bookend )
        return;
    var playWord = function(word, visibility, callback) {
        if(callback && !callback(word, visibility)) return;
        if(visibility) {
            var theTimeout = timeoutOverride != -1 ? timeoutOverride : word.pause;
            if(theTimeout < 1) playWord(word, false, callback);
            else
                setTimeout(function(){
                    playWord(word, false, callback);
                }, theTimeout);
        } else {
            if(word) playWord(word.nextWord, true, callback);
            else {
                if(complete) complete(null);
            }
        }
    };
    playWord(start, true, callback);
};
