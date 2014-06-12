
var PAUSE_NORMAL = 120;
var PAUSE_COMMA = 200;
var PAUSE_PERIOD = 280;
var BOOKEND = {bookend:true,word:false};

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

/*
 **********************************
 */

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
    out = out === '{{NEWLINE}}' ? '' : out;
    $('#blinkreader div.blink').html(out);
    recreateText(word);
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

var recreateText = function(theWord) {
    var outputText = '';
    var outputP = '<p>';
    $('#blinkreader div.reader').html('');
    theWord.play(0,
        function(word, visibility) {
            if(visibility && word && word.word) {
                if(word.word === '{{NEWLINE}}'
                    || word.nextWord.bookend) {
                    outputP += '</p>';
                    outputText += outputP;
                    $('#blinkreader div.reader')
                        .append($(outputP))
                        .css('left', 0)
                        .css('top', 0);
                    outputP = '<p>';
                } else {
                    var n = '<span style="float:left" id="word'
                        + word.index + '">'
                        + word.word
                        + '&nbsp;</span>';
                    outputP += word.word + ' ';
                }
            }
            return true;
        });
};



$('#slower').click(function() {
});

$('#faster').click(function() {
});

var play = function() {
    if(pause && currentWord && currentWord.play) {
        pause = false;
        currentWord.play(updateWordsOnPage);
        $('#playpause-btn .glyphicon')
            .removeClass('glyphicon-pause')
            .addClass('glyphicon-play');
    }
};

var pause = function() {
    if(!pause) {
        pause = true;
        $('#playpause-btn .glyphicon')
            .removeClass('glyphicon-play')
            .addClass('glyphicon-pause');
    }
};

var togglePlayPause = function() {
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
};
$('#playpause-btn').click(togglePlayPause);

var searchButtonPressed = function() {
    var address = $('#location').val();
    $.get('http://127.0.0.1:8080/alchemy/content?' + address, function(data) {
        var outtext = data.text.text.replace(/\n/g,' {{NEWLINE}} ');
        console.log(outtext);
        currentWord = firstWord = VisualText.split(outtext);
        recreateText(currentWord);
        currentWord.play(updateWordsOnPage);
    });
};
$('#go-button').click(searchButtonPressed);

$(document).ready(function() {
    new hashgrid({ numberOfGrids: 1 });
    $( ".draggable" ).draggable();
    $( ".resizable" ).resizable();
    $("#blinkreader")
        .draggable()
        .resizable();
    $("#output-c")
        .draggable()
        .resizable();
    $("#blinkreader div.blink")
        .fitText();
    $('#blinkreader div.reader')
        .flowtype();

    if (annyang) {
        // Let's define our first command. First the text we expect, and then the function it should call
        var commands = {
            'go': play(),
            'stop': pause(),
            'play': play(),
            'pause': pause()
        };

        // Add our commands to annyang
        annyang.addCommands(commands);

        // Start listening. You can call this here, or attach this call to an event, button, etc.
        annyang.start();
    }
});
