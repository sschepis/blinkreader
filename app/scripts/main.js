$(document).ready(function() {
    $("#container").fitText(0.85);
});

var PAUSE_NORMAL = 120;
var PAUSE_COMMA = 200;
var PAUSE_PERIOD = 280;
var BOOKEND = {bookend:true,word:false};

function VisualText(data) {
    this.word = data.trim();
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
        if(!el || el === '') continue;
        displayOut.push( new VisualText(el) );
        if(displayOut.length > 1) {
            displayOut[displayOut.length - 2].nextWord = displayOut[displayOut.length - 1];
            displayOut[displayOut.length - 1].prevWord = displayOut[displayOut.length - 2];
        }
    }
    return displayOut.length > 0 ? displayOut[0] : BOOKEND;
};

VisualText.prototype.play = function(callback) {
    var start = this;
    if(!start || start.bookend )
        return;
    var playWord = function(word, visibility, callback) {
        if(callback && !callback(word, visibility)) return;
        if(visibility) {
            setTimeout(function(){
                playWord(word, false, callback);
            }, word.pause);
        } else {
            playWord(word.nextWord, true, callback);
        }
    };
    playWord(start, true, callback);
};

/*
 **********************************
 */

var texttext = "A German man committed to a high-security psychiatric hospital after being accused of fabricating a story of money-laundering activities at a major bank is to have his case reviewed after evidence has emerged proving the validity of his claims.";

var pause = true;
var firstWord = BOOKEND;
var currentWord = BOOKEND;

var debugWords = function(word, visibility) {
    currentWord = word;
    if(visibility && word.word)
        console.log(word.word) + ' ';
    return true;
};

var updateWordsOnPage = function(word, visibility) {
    currentWord = word;
    var out = visibility ? word.word : '';
    $('#output').html(out);
    var ret = visibility ? !pause : true;
    if(!word.bookend && word.nextWord.bookend && visibility) {
        ret = false;
        if(firstWord)
            setTimeout(function(){
                pause = true;
                currentWord = firstWord;
                currentWord.play(updateWordsOnPage);
            }, 500);
    }
    return ret;
};

$('#slower').click(function() {
});

$('#faster').click(function() {
});

$('#playpause-btn').click(function() {
    if(!pause) {
        pause = true;
        $('#playpause-btn .glyphicon')
            .removeClass('glyphicon-play')
            .addClass('glyphicon-pause');
    }
    else {
        pause = false;
        currentWord.play(updateWordsOnPage);
        $('#playpause-btn .glyphicon')
            .removeClass('glyphicon-pause')
            .addClass('glyphicon-play');
    }
});

$('#go-button').click(function() {
    var address = $('#location').val();
    $.get('http://127.0.0.1:8080/url?' + address, function(data) {
        $('#content-converter').html(data.content);
        var text = $('#content-converter').text().trim();
        currentWord = firstWord = VisualText.split(text);
        currentWord.play(updateWordsOnPage);
    });
});

function testBReadability(theurl){
    read('http://127.0.0.1:8080/p?' + theurl,
        function(err, article, meta) {
            console.log(article.content);
        });
}

currentWord = firstWord = VisualText.split(texttext);
currentWord.play(updateWordsOnPage);
