'use strict';

var BOOKEND = { bookend : true, word : false };
var pause = true;
var firstWord = BOOKEND;
var currentWord = BOOKEND;
var fb = new Firebase('https://blazing-fire-378.firebaseio.com/');

var debugWords = function(word, visibility) {
    currentWord = word;
    if(visibility && word.word) {
        console.log(word.word + ' ');
    }
    return true;
};

var updateWordsOnPage = function(word, visibility) {
    currentWord = word;
    var out = visibility ? word.word : '';
    out = out === '{{NEWLINE}}' ? '' : out;
    $('#blinkreader div.blink').html(out);
    var ret = visibility ? !pause : true;
    if(!word.bookend && word.nextWord.bookend && visibility) {
        ret = false;
        if(firstWord) {
            setTimeout(function(){
                pause = true;
                currentWord = firstWord;
                currentWord.play(updateWordsOnPage);
            }, 500);
        }
    }
    return ret;
};

var recreateText = function(theWord, callback) {
    var outputText = '';
    var outputP = '<p>';
    $('#blinkreader div.reader').html('');
    theWord.play(0,
        function(word, visibility) {
            if(visibility && word && word.word) {
                if(word.word === '{{NEWLINE}}' ||
                    word.nextWord.bookend) {
                    outputP += '</p>';
                    outputText += outputP;
                    outputP = '<p>';
                } else {
                    var n = '<span style="float:left" id="word' +
                        word.index + '">' +
                        word.word +
                        '&nbsp;</span>';
                    outputP += word.word + ' ';
                }
            }
            outputP += '</p>';
            outputText += outputP;
            if(callback) {
                callback(null, outputText);
            }
            return true;
        });
};

var updateLinksView = function(callback) {
    var l = localStorageCache.get('links');
    $('.linksview').html('');
    for(var li in l) {
        li = l[li];
        var newel = $('<div class="listitem">' + li.title.title + '</div>');
//         newel.find('.listitem')
//             .data(li.url.hashCode())
//             .click(function() {
//                 var links = localStorageCache.get('links');
//                 var data = $(this).data();
//                 //        var link = links[data];
//                 console.log(JSON.stringify(data));
// //       cueAndPlayText(link.text.text);
//             });
        $('.linksview').append(newel);
    }
    if(callback) callback(null, l);
};

var localStorageCache = new Cache({
    base: 'cache',
    data: {
        links : {},
        entities : {},
        categories : {}
    },
    onSet : function(cache) {
        var cacheValue = cache.stringify();
        fb.set(cacheValue);
        console.log('wrote ' + cacheValue.length + ' chars to cache.');
    }
});

var cueAndPlayText = function(text) {
    var outtext = text.replace(/\n/g,' {{NEWLINE}} ');
    currentWord = firstWord = VisualText.split(outtext);
    recreateText(currentWord,function(err, text){
        $('#blinkreader div.reader').html(text);
    });
    updateLinksView();
    currentWord.play(updateWordsOnPage);
};

var updateLink = function(link) {
    var l = localStorageCache.get('links');
    l[link.url.hashCode()] = link;
    localStorageCache.set('links', l);
};

var updateEntities = function(link) {
    var c = localStorageCache.get('entities') || {};
    for(var ee in link.combined.entities) {
        ee = link.combined.entities[ee];
        delete ee.disambiguated;
        if(!c[ee.text]) {
            c[ee.text] = ee;
            c[ee.text].links = [];
        }
        if(c[ee.text].links.indexOf(link.url.hashCode())===-1) {
            c[ee.text].links.push(link.url.hashCode());
        }
    }
    localStorageCache.set('entities', c);
};
var updateKeywords = function(link) {
    var c = localStorageCache.get('keywords') || {};
    for(var ee in link.combined.keywords) {
        ee = link.combined.keywords[ee];
        if(!c[ee.text]) {
            c[ee.text] = ee;
            c[ee.text].links = [];
        }
        if(c[ee.text].links.indexOf(link.url.hashCode())===-1) {
            c[ee.text].links.push(link.url.hashCode());
        }
    }
    localStorageCache.set('keywords', c);
};
var updateConcepts = function(link) {
    var c = localStorageCache.get('concepts') || {};
    for(var ee in link.combined.concepts) {
        ee = link.combined.concepts[ee];
        if(!c[ee.text]) {
            c[ee.text] = ee;
            c[ee.text].links = [];
        }
        if(c[ee.text].links.indexOf(link.url.hashCode())===-1) {
            c[ee.text].links.push(link.url.hashCode());
        }
    }
    localStorageCache.set('concepts', c);
};
var updateCategory = function(link) {
    var c = localStorageCache.get('categories') || {};
    var cat = link.combined.category;
    if(!c[cat.category]) {
        c[cat.category] = cat;
        c[cat.category].links = [];
    }
    if(c[cat.category].links.indexOf(link.url.hashCode())===-1) {
        c[cat.category].links.push(link.url.hashCode());
    }
    localStorageCache.set('categories', c);
};

var addLinkToCache = function(link) {
    updateCategory(link);
    updateEntities(link);
    updateKeywords(link);
    updateConcepts(link);
    delete link.combined;
    updateLink(link);
    console.log('link titled \'' + link.title.title + '\' added to cache');
};

var rescanCache = function() {
    var l = localStorageCache.get('links');

    for(var link in l) {
        link = l[link];
        if(link.combined) {
            console.log('rescanning link titled \'' + link.title.title + '\'');
            addLinkToCache(link);
        }
    }
};

var iterateThroughLinks = function() {
    var l = localStorageCache.get('links');
    for(var li in l) {
        li = l[li];
        console.log(JSON.stringify(li, null, 4));
    }
};
var iterateThroughCategories = function() {
    var l = localStorageCache.get('categories');
    for(var li in l) {
        li = l[li];
        console.log(JSON.stringify(li, null, 4));
    }
};
var iterateThroughEntities = function() {
    var l = localStorageCache.get('entities');
    for(var li in l) {
        li = l[li];
        console.log(JSON.stringify(li, null, 4));
    }
};
var iterateThroughKeywords = function() {
    var l = localStorageCache.get('keywords');
    for(var li in l) {
        li = l[li];
        console.log(JSON.stringify(li, null, 4));
    }
};
var iterateThroughConcepts = function() {
    var l = localStorageCache.get('concepts');
    for(var li in l) {
        li = l[li];
        console.log(JSON.stringify(li, null, 4));
    }
};
    
var iterateThroughAll = function() {
    iterateThroughLinks();
    iterateThroughCategories();
    iterateThroughEntities();
    iterateThroughKeywords();
    iterateThroughConcepts();
};
  
fb.on('value', function(snapshot) {
    if(snapshot.val()) {
        console.log('read ' + snapshot.val() ? snapshot.val().length : 0 + ' chars from cache.');
    }
    if(snapshot.val()) {
        localStorageCache.parse(snapshot.val());
    }
    else {
        localStorage._Cache = localStorageCache._options.data;
    }
    updateLinksView();
});

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
        pause();
    }
    else {
        play();
    }
};
$('#playpause-btn').click(togglePlayPause);

var searchButtonPressed = function() {
    var address = $('#location').val();
    $.get('http://miserable-mule-109240.usw1-2.nitrousbox.com:9999/alchemy/content?' + address, function(data) {
        addLinkToCache(data);
        cueAndPlayText(data.text.text);
    });
};
$('#go-button').click(searchButtonPressed);

$(document).ready(function() {

    $('#blinkreader').dialog({
        width:600,
        height:300
    });

    $('.linksview').dialog({
        width:400,
        height:500,
        title:'My links'
    });
    $('.entitiesview').dialog({
        width:300,
        height:500,
        title:'My Entities'
    });
    $('.keywordsview').dialog({
        width:300,
        height:500,
        title:'My Keywords'
    });
    $('.conceptsview').dialog({
        width:300,
        height:500,
        title:'My Concepts'
    });
    $('.categoriesview').dialog({
        width:300,
        height:500,
        title:'My Categories'
    });
    
    $('#blinkreader .blink').fitText();

    $('#blinkreader .reader').on( 'resize', function() {
        $('#blinkreader .blink').css('line-height', $('#blinkreader .reader').css('height'));
        console.log($('#blinkreader .reader').css('height'));
    });
    $('#blinkreader .blink').css('line-height', $('#blinkreader .reader').css('height'));

    updateLinksView();

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
        //annyang.start();
    }
});

