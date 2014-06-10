$(document).ready(function() {
    $("#container").fitText(0.85);
});

var PAUSE_NORMAL = 120;
var PAUSE_COMMA = 200;
var PAUSE_PERIOD = 240;
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
    if(!start || start.bookend || !start.word )
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

var texttext = "A German man committed to a high-security psychiatric hospital after being accused of fabricating a story of money-laundering activities at a major bank is to have his case reviewed after evidence has emerged proving the validity of his claims. In a plot worthy of a crime blockbuster, Gustl Mollath, 56, was submitted to the secure unit of a psychiatric hospital seven years ago after court experts diagnosed him with paranoid personality disorder following his claims that staff at the Hypo Vereinsbank (HVB) – including his wife, then an assets consultant at HVB – had been illegally smuggling large sums of money into Switzerland. Mollath was tried in 2006 after his ex-wife accused him of causing her physical harm. He denied the charges, claiming she was trying to sully his name in the light of the evidence he allegedly had against her. He was admitted to the clinic, where he has remained against his will ever since. But recent evidence brought to the attention of state prosecutors shows that money-laundering activities were indeed practiced over several years by members of staff at the Munich-based bank, the sixth-largest private financial institute in Germany, as detailed in an internal audit report carried out by the bank in 2003. The report, which has now been posted online, detailed illegal activities including money-laundering and aiding tax evasion. A number of employees, including Mollaths wife, were subsequently sacked following the banks investigation.";

var pause = true;
var currentWord = BOOKEND;

var updateWordsOnPage = function(word, visibility) {
  currentWord = word;
  var out = visibility ? word.word : ''; 
  $('#output').html(out);  
  return visibility ? !pause : true;
};

$('#back-btn').click(function() {
});

$('#next-btn').click(function() {
});

$('#playpause-btn').click(function() {
  if(!pause) pause = true;
  else {
      pause = false;
      currentWord.play(updateWordsOnPage);
  }
});

currentWord = VisualText.split(texttext);
currentWord.play(updateWordsOnPage);

