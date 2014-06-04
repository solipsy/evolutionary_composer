var VCO = (function(context) {
  function VCO(){
    this.oscillator = context.createOscillator();
    this.oscillator.type = 'sawtooth';
    this.setFrequency(440);
    this.oscillator.start(0);

    this.input = this.oscillator;
    this.output = this.oscillator;

    var that = this;
    $(document).bind('frequency', function (_, frequency) {
      that.setFrequency(frequency);
    });
  };

  VCO.prototype.setFrequency = function(frequency) {
    this.oscillator.frequency.setValueAtTime(frequency, context.currentTime);
  };

  VCO.prototype.connect = function(node) {
    if (node.hasOwnProperty('input')) {
      this.output.connect(node.input);
    } else {
      this.output.connect(node);
    };
  };

  return VCO;
})(context);

var EnvelopeGenerator = (function(context) {
  function EnvelopeGenerator() {
    this.attackTime = 0.1;
    this.releaseTime = 0.1;

    var that = this;
    $(document).bind('gateOn', function (_) {
      that.trigger();
    });
    $(document).bind('setAttack', function (_, value) {
      that.attackTime = value;
    });
    $(document).bind('setRelease', function (_, value) {
      that.releaseTime = value;
    });
  };

  EnvelopeGenerator.prototype.trigger = function() {
    now = context.currentTime;
    this.param.cancelScheduledValues(now);
    this.param.setValueAtTime(0, now);
    this.param.linearRampToValueAtTime(1, now + this.attackTime);
    this.param.linearRampToValueAtTime(0, now + this.attackTime + this.releaseTime);
  };

  EnvelopeGenerator.prototype.connect = function(param) {
    this.param = param;
  };
  return EnvelopeGenerator;
  })(context);
  
var VCA = (function(context) {
  function VCA() {
    this.gain = context.createGain();
    this.gain.gain.value = 0;
    this.input = this.gain;
    this.output = this.gain;
    this.amplitude = this.gain.gain;
  };

  VCA.prototype.connect = function(node) {
    if (node.hasOwnProperty('input')) {
      this.output.connect(node.input);
    } else {
      this.output.connect(node);
    };
  };

  return VCA;
})(context);  

function playSample(note, time) {
	var source = context.createBufferSource();
	var gainNode = context.createGain();
	gainNode.gain.value = note.volume  * 2;
	source.buffer = BUFFERS[note.type];
	source.playbackRate.value = note.pitch;
	source.connect(gainNode);
	gainNode.connect(context.destination);
	if (!source.start)
		source.start = source.noteOn;
	source.start(time);
}

function playBass (note, time) {
	var source = context.createOscillator();
	var source2 = context.createOscillator();
	source.type = 0;
	source2.type = 3;
	var gainNode = context.createGain();
	gainNode.gain.value = note.volume / 4;
	source.connect(gainNode);
	source2.connect(gainNode);
	gainNode.connect(context.destination);			
	
    gainNode.gain.cancelScheduledValues( time );	
    gainNode.gain.setValueAtTime(gainNode.gain.value, time);	    
    gainNode.gain.linearRampToValueAtTime(0 , time + note.duration * eighthNoteTime);	
	
	source.frequency.value = note.pitch * 16;
	source2.frequency.value = note.pitch * 8 - 10;
	source.noteOn(time);
	source2.noteOn(time);
	source.noteOff(time + note.duration * eighthNoteTime);
	source2.noteOff(time + note.duration * eighthNoteTime );
}

function playLambdoma (freq, time1) {
	var time = context.currentTime;
	var source = context.createOscillator();
	source.type = 0;
	var gainNode = context.createGain();
	gainNode.gain.value = 1;
	source.connect(gainNode);
	gainNode.connect(context.destination);			
	
	source.frequency.value = freq * 16;
	source.noteOn(time);
	source.noteOff(time + 4 * eighthNoteTime);
}


function playModBass (note, time) {
	var mod = context.createOscillator();
	mod.frequency.value = note.modulation;
	mod.type = 3;
	
	var osc = context.createOscillator();
	osc.frequency.value = note.pitch;
	osc.type = 2;
	var osc2 = context.createOscillator();
	osc2.frequency.value = note.pitch;
	osc2.detune.value = 100;
	osc2.type = 2;		
	
	var filter = context.createBiquadFilter();	
	filter.type = 0;
	filter.frequency.value = 80; 
	
    var modGain = context.createGain();
    modGain.gain.value = 40; 
    
    var overGain = context.createGain();
    overGain.gain.value = note.volume /4 ;  
    
    mod.connect(modGain);
    modGain.connect(osc.frequency);
    modGain.connect(osc2.frequency);
    osc.connect(overGain);	
    osc2.connect(filter);
    filter.connect (overGain);	
    overGain.connect (context.destination);

    mod.start (time);	    
    mod.stop(time + note.duration * eighthNoteTime);  
    
    overGain.gain.cancelScheduledValues( time );	
    overGain.gain.setValueAtTime(overGain.gain.value, time);	    
    overGain.gain.linearRampToValueAtTime(0 , time + note.duration * eighthNoteTime);
    osc.start (time);	    
    osc.stop(time + note.duration * eighthNoteTime);  
    osc2.start(time);	    
    osc2.stop(time + note.duration * eighthNoteTime);  		    
    		
}

function playModBass1 (note, time) {
	var mod = context.createOscillator();
	mod.frequency.value = note.modulation;
	mod.type = 2;
	
	var osc = context.createOscillator();
	osc.frequency.value = note.pitch * 2;
	osc.type = 2;
	var osc2 = context.createOscillator();
	osc2.frequency.value = note.pitch ;
	osc2.type = 0;	
	var osc3 = context.createOscillator();
	osc3.frequency.value = note.pitch ;
	osc3.type = 0;		

	
	var filter1 = context.createBiquadFilter();	
	filter1.type = 0;
	filter1.frequency.value = 540; 
	
	var filter2 = context.createBiquadFilter();	
	filter2.type = 0;
	filter2.frequency.value = 200; 	

	
    var modGain = context.createGain();
    modGain.gain.value = 40; 
    
    var overGain = context.createGain();
    overGain.gain.value = note.volume / 4;  
    
    var wetGain = context.createGain();
    wetGain.gain.value = 0.5 + note.type; //0.75;  
    
    var dryGain = context.createGain();
    dryGain.gain.value = (0.5-note.type);//0.25;          
    
    osc.connect(filter1);	
    osc2.connect(filter1);
    osc3.connect(filter1);
    
    osc.connect(filter2);	
    osc2.connect(filter2);
    osc3.connect(filter2);
   
    filter1.connect (wetGain);	
    filter2.connect (dryGain);	
    
    wetGain.connect (overGain);
    dryGain.connect (overGain);
    
    overGain.connect(context.destination);

    mod.start (time);	    
    mod.stop(time + note.duration * eighthNoteTime);  
    
    overGain.gain.cancelScheduledValues( time );	
    overGain.gain.setValueAtTime(overGain.gain.value, time);	  
    overGain.gain.setValueAtTime(overGain.gain.value, time + note.duration * eighthNoteTime / 24 );   
    overGain.gain.setValueAtTime(overGain.gain.value, time + note.duration * eighthNoteTime / 2 );
    overGain.gain.linearRampToValueAtTime(0 , time + note.duration * eighthNoteTime);
    osc.start (time);	    
    osc.stop(time + note.duration * eighthNoteTime);  
    osc2.start(time);	    
    osc2.stop(time + note.duration * eighthNoteTime);  		    
    osc3.start(time);	    
    osc3.stop(time + note.duration * eighthNoteTime);  	    		
}

function playModBass2 (note, time) {
	var mod = context.createOscillator();
	mod.frequency.value = note.modulation;
	mod.type = 2;
	
	var osc = context.createOscillator();
	osc.frequency.value = note.pitch * 2;
	osc.type = 3;
	var osc2 = context.createOscillator();
	osc2.frequency.value = note.pitch ;
	osc2.type = 1;	
	var osc3 = context.createOscillator();
	osc3.frequency.value = note.pitch ;
	osc3.type = 1;		

	
	var filter1 = context.createBiquadFilter();	
	filter1.type = 0;
	filter1.frequency.value = 540; 
	
	var filter2 = context.createBiquadFilter();	
	filter2.type = 1;
	filter2.frequency.value = 1200; 	

	
    var modGain = context.createGain();
    modGain.gain.value = 40; 
    mod.connect(modGain);
    
    //modGain.connect(osc.frequency);
    
    var overGain = context.createGain();
    overGain.gain.value = note.volume / 5;  
    
    var wetGain = context.createGain();
    wetGain.gain.value = 0.5 + note.type; //0.75;  
    
    var dryGain = context.createGain();
    dryGain.gain.value = (0.5-note.type);//0.25;          
    
    osc.connect(filter1);	
    osc2.connect(filter1);
    osc3.connect(filter1);
    
    osc.connect(filter2);	
    osc2.connect(filter2);
    osc3.connect(filter2);
   
    filter1.connect (wetGain);	
    filter2.connect (dryGain);	
    
    wetGain.connect (overGain);
    dryGain.connect (overGain);
    
    overGain.connect(context.destination);

    mod.start (time);	    
    mod.stop(time + note.duration * eighthNoteTime);  
    
    overGain.gain.cancelScheduledValues( time );	
    overGain.gain.setValueAtTime(overGain.gain.value, time);	  
    overGain.gain.setValueAtTime(overGain.gain.value, time + note.duration * eighthNoteTime / 24 );   
    overGain.gain.setValueAtTime(overGain.gain.value * 0.8 , time + note.duration * eighthNoteTime / 2 );
    overGain.gain.linearRampToValueAtTime(0 , time + note.duration * eighthNoteTime);
    osc.start (time);	    
    osc.stop(time + note.duration * eighthNoteTime);  
    osc2.start(time);	    
    osc2.stop(time + note.duration * eighthNoteTime);  		    
    osc3.start(time);	    
    osc3.stop(time + note.duration * eighthNoteTime);  	    		
}

	var Player = function () {
		this.looping = false;
	};
			
	var kick = BUFFERS.kick;
	var snare = BUFFERS.snare;
	var hihat = BUFFERS.hihat;
	var songLen = NOTES * eighthNoteTime ;
	var looping = false;
	var timer;
	
	Player.loop = function (song) {
		if (looping) {
			$("#loop" + song.id).css({background:"black"});
			clearInterval(timer);
			looping = false;
			console.log ("cancel looping");
			return;
		}
		else {
			$("#loop" + song.id).css({background:"#3333cc"});
			looping = true;
			
			runSong(song);
			timer = setInterval (function () {
				runSong(song);
				console.log ("looping");
			}, songLen * 1000);			
		}
	};
	
	Player.play = function(song) {
		if (!looping) {
			runSong (song);
			$("#play" + song.id).css({background:"#3333cc"});
			setInterval (function () {
				$("#play" + song.id).css({background:"black"});
			}, eighthNoteTime * 1000 * (NOTES + 1));
			
		}
	};
	
	function showProgress (song) {
		var index = 0;
		
		var progressTimer = setInterval (function () {
			//console.log (song.bars[3].code[index]);
			index++;
		}, eighthNoteTime * 1000);
		setTimeout (function () {
			clearInterval(progressTimer);
			
		}, eighthNoteTime * 1000 * (NOTES + 1));	
	}
	
	function runSong (song) {
		showProgress(song);
		var startTime = context.currentTime;
		for (var s = 0; s < song.bars.length ; s++) {
			var bar = song.bars[s];
			for (var i = 0; i < bar.code.length; i++) {
				if (bar.code[i]) {
					var time = startTime + i * eighthNoteTime;
					switch (bar.type) {
						case "hihatdrum":
							playSample(bar.code[i], time);
							break;
						case "snaredrum":
							playSample(bar.code[i], time);
							break;
						case "kickdrum":
							playSample(bar.code[i], time);
							break;
						case "bass":
							switch (bar.instrument) {
								case 0:
									playModBass2 (bar.code[i], time);
									break;
								case 1:
									playModBass1 (bar.code[i], time);
									break;								
							}
							
							break;		
						case "lead":
							console.log ("lead");
							playBass (bar.code[i], time);
							break;													
					}
				}
			}
		}			
	} 
	

