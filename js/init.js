var TRACKS = 4;
var NOTES = 32;
var BPM = 120;
var eighthNoteTime = (60 / BPM) / 4;
var COLORS = {
	bassdrum: "#0000ff",
	snare: "#0066cc",
	hihat : "#66ccff",
	bass : "#660066",
	lead : "#ff0000"
};
var BUFFERS = {};
var context = null;
var saveForm = "<span class = 'form'>Your name:</span><input class = 'forminput' id = 'username' type='text' name='username'><br><span class = 'form'>Loop name:</span><input type='text' class = 'forminput' id = 'loopname' name='loopname'><br><input type='submit' id = 'submitsave' value = 'Save' name='submit'><input type='submit' id = 'submitcancel' value = 'Cancel' name='submit'>";

    		
    		
function Decider(size)  {
	var probabilities = []
	var out = 0;
}    		
    		

// An object to track the buffers to load {name: path}
var BUFFERS_TO_LOAD = {
  kick: 'audio/kick.wav',
  snare: 'audio/snare.wav',
  hihat: 'audio/hihat.wav',
  kickElectro : 'audio/CYCdh_ElecK02-Kick01.wav',
  snareElectro: 'audio/CYCdh_ElecK02-FX03.wav',
  hihatElectro: 'audio/CYCdh_ElecK02-ClHat02.wav'
};

var contextClass = (window.AudioContext || 
  window.webkitAudioContext || 
  window.mozAudioContext || 
  window.oAudioContext || 
  window.msAudioContext);
  
if (contextClass) {
  var context = new contextClass();
} else {
  	alert ("Web audio not available");
}

// Loads all sound samples into the buffers object.
function loadBuffers() {
  // Array-ify
  var names = [];
  var paths = [];
  for (var name in BUFFERS_TO_LOAD) {
    var path = BUFFERS_TO_LOAD[name];
    names.push(name);
    paths.push(path);
  }
  bufferLoader = new BufferLoader(context, paths, function(bufferList) {
    for (var i = 0; i < bufferList.length; i++) {
      var buffer = bufferList[i];
      var name = names[i];
      BUFFERS[name] = buffer;
    }
  });
  bufferLoader.load();
}



String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length == 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

