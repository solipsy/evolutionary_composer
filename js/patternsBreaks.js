function BreaksBassDrum () {
	this.chooser = function (i) {
		preset = (Math.random() > 0.5) ? this.pattern1 : this.pattern2;
		result = preset(i);
		return result;
	};	
	this.pattern1 =	function (i) {
		var result = false;
		if (i % 16 == 0 ) 		result = new Note (1,  0.4 + Math.random() / 4, Math.random(), "kick");
		else if (i % 10 == 0) 	result = (Math.random () > 0.4) ? new Note (1,  0.3 + Math.random() / 4, Math.random(), "kick") : false;
		else if (i % 6 == 0) 	result = (Math.random () > 0.7) ? new Note (1,  0.3 + Math.random() / 4, Math.random(), "kick") : false;
		return result;	
	};	
	this.pattern2 =	function (i) {
		var result = false;
		if (i % 16 == 0 ) 		result = new Note (1,  0.4 + Math.random() / 4, Math.random(), "kick");
		else if (i % 10 == 0) 	result = (Math.random () > 0.4) ? new Note (1,  0.3 + Math.random() / 4, Math.random(), "kick") : false;
		else if (i % 6 == 0) 	result = (Math.random () > 0.7) ? new Note (1,  0.3 + Math.random() / 4, Math.random(), "kick") : false;
		return result;	
	};			
} 

function BreaksSnare () {
	this.chooser = function (i) {
		preset = (Math.random() > 0.5) ? this.pattern1 : this.pattern2;
		return preset(i);
	};
	this.pattern1 =	function (i) {
		var result = false;
		if ((i + 2) % 8 == 0)
				result = new Note (1,  0.4 + Math.random() / 4, Math.random(), Math.random() > 0.5 ? "snare" : "snareElectro");
		return result;	
	};	
	this.pattern2 =	function (i) {
		var result = false;
		if ((i + 2) % 8 == 0)
				result = new Note (1,  0.4 + Math.random() / 4, Math.random(), Math.random() > 0.5 ? "snare" : "snareElectro");
		return result;	
	};					
}


function BreaksHihat () {
	this.chooser = function (i) {
		preset = (Math.random() > 0.5) ? this.pattern1 : this.pattern2;
		return preset(i);
	};
	this.pattern1 =	function (i) {
		var result = false;
		if (i % 1 == 0)
			result = (i%2 == 0) ? new Note (1,  0.1 + Math.random() / 6, Math.random(), "hihatElectro") : new Note (1,  0.4 + Math.random() / 12, Math.random(), "hihatElectro");
		return result;	
	};
	this.pattern2 =	function (i) {
		var result = false;
		if (i % 1 == 0)
			result = (i%2 == 0) ? new Note (1,  0.1 + Math.random() / 6, Math.random(), "hihatElectro") : new Note (1,  0.4 + Math.random() / 12, Math.random(), "hihatElectro");
		return result;	
	};				
}

function BreaksBass () {
	var phrase = [], longphrase = [], funkyphrase = [];
	var phraseLength = 3;	
	this.chooser = function (i) {
		preset = (Math.random() > 0.5) ? this.pattern1 : this.pattern1;
		return preset(i);
	};
	this.pattern1 =	function (i) {
		return funkyphrase[i % 16];
	};	
	
	this.initPhrase = function () {
		var phrase4 = [];
		for (var i = 0; i < phraseLength; i++) {
			duration = Math.random() * 96 * eighthNoteTime;
			var x = Math.round (Math.random() * 5 + 10 );
			var y = Math.round (Math.random() * 5 + 10);
			if (Math.random() > 0.5) {
				phrase4[i] = new Note (
					  la.get(x, y) 											//pitch
					, 0.1 + Math.random()  * 0.2							//volume
					, duration												//duration
					, Math.random()											//type
					, 0
					, x
					, y);													//modulation
			}
			else phrase4[i] = false;
		}
		phrase = phrase4;		
	};
	
	this.initLongPhrase = function () {
		var phrase4 = [];
		var offX = 4 + Math.round (Math.random() * 3);
		var offY = 4 + Math.round (Math.random() * 3);		
		for (var i = 0; i < NOTES/4; i++) {
			duration = Math.random() * 12 * eighthNoteTime;
			var x = Math.round (Math.random() * 7 + offX  );
			var y = Math.round (Math.random() * 8 + offY );
			if (Math.random() > 0.1) {
				phrase4[i] = new Note (
					  la.get(x, y) 											//pitch
					, 0.5 + Math.random()  * 0.4							//volume
					, duration												//duration
					, Math.random()	* 0.5										//type
					, 0
					, x
					, y);													//modulation
			}
			else phrase4[i] = false;
		}
		longphrase = phrase4;		
	};	
	
	this.initFunkyPhrase = function () {
		var offX = 4 + Math.round (Math.random() * 3);
		var offY = 4 + Math.round (Math.random() * 3);		
		var phrase4 = [];
		var mult = 3 + Math.floor(3 * Math.random());
		var x = Math.round (Math.random() * 7 + offX);
		var y = Math.round (Math.random() * 8 + offY);
		duration = 24 * eighthNoteTime + Math.random() * 12 * eighthNoteTime;	
		var newNote = new Note (
					  la.get(x, y) 											//pitch
					, 0.1 + Math.random()  * 0.4							//volume
					, duration												//duration
					, Math.random()											//type
					, 0
					, x
					, y);
		for (var i = 0; i < NOTES; i++) {
			if (i%  mult == 0) {
				phrase4[i] = newNote;
			} 
			else phrase4[i] = false;						
					
		}
		funkyphrase = phrase4;		
	};		
	
	this.initPhraseLength = function () {
		phraseLength = 5 + Math.floor (6 * Math.random());
	};				
}


function Breaks () {
	this.bd = new BreaksBassDrum();
	this.snare = new BreaksSnare();
	this.hihat = new BreaksHihat();
	this.bass = new BreaksBass();
	//this.lead = new BreaksLead();

	var count = -1;
	
	this.chooser = function (i) {
		count ++;
		if (count % 32 == 0) {
			this.bass.initPhraseLength();
			this.bass.initPhrase();	
			//this.bass.initLongPhrase();	
			this.bass.initFunkyPhrase();		
			
			//this.lead.initPhraseLength();
			//this.lead.initPhrase();	
			//this.lead.initLongPhrase();						
		}

		return	{	bassdrum: this.bd.chooser(i), 
					snare: this.snare.chooser(i), 
					hihat: this.hihat.chooser(i), 
					bass: this.bass.chooser(i),
					//lead: this.lead.chooser(i)
				};		
	};

}


var breaks = new Breaks();



	
	function dnbSnare () {
		var newCode = [];
		for (var i = 0; i < NOTES; i++) {
			if ((i + 2) % 8 == 0)
				newCode[i] = new Note (1,  0.1 + Math.random() / 4, Math.random(), Math.random() > 0.5 ? "snare" : "snareElectro");
			else
				newCode[i] = false;
		}
		return newCode;		
	}	
	
	function dnbHihat () {
		var newCode = [];
		for (var i = 0; i < NOTES; i++) {
			if (i % 1 == 0)
				newCode[i] = (i%2 == 0) ? new Note (1,  0.1 + Math.random() / 6, Math.random(), "hihatElectro") : new Note (1,  0.4 + Math.random() / 12, Math.random(), "hihatElectro");
			else
				newCode[i] = false;
		}
		return newCode;		
	}	
	
	function bayesDnbHihat () {
		var bin = "";
		var newCode = [];
		for (var i = 0; i < NOTES; i++) {
			if (i % 1 == 0) {
				bin += "1";
				var q = bin.substr (0, i);
				var p = bb.get(q);
				if (p) {
					if (p > 0.5) newCode[i] = (i%2 == 0) ? new Note (1 + Math.random(),  0.1 + Math.random() / 4, Math.random(), "hihat") : new Note (1 + Math.random(),  0.1 + Math.random() / 8, Math.random(), "hihat");
					else newCode[i] = false;
				}
				else {
					q = q.substr (8, q.length);
					var p = bb.get(q);
					if (p > 0.7) newCode[i] = (i%2 == 0) ? new Note (1 + Math.random(),  0.1 + Math.random() / 4, Math.random(), "hihat") : new Note (1 + Math.random(),  0.1 + Math.random() / 8, Math.random(), "hihat");
					else newCode[i] = false;					
				}
				
			}
			else {
				newCode[i] = false;
				bin += "0";
			}
		}
		return newCode;		
	}		
	
	function dnbBass () {
		var newCode = [];
		var type = 0;
		var flag  = true;
		var duration = 0;
		if (Math.random() > 0.5) flag = false;
		
		for (var i = 0; i < NOTES; i++) {
			if (Math.random() > 0.5) {
				duration = Math.random() * 4;
				var x = Math.round (Math.random() * 5 + 2  );
				var y = Math.round (Math.random() * 5 + 2 );
				newCode[i] = new Note (
					  la.get(x, y) 											//pitch
					, 0.1 + Math.random() / 6 								//volume
					, duration												//duration
					, flag ? Math.floor ((Math.random() *  4)) : type		//type
					, Math.random() * 160);									//modulation
			}
		}		
		return newCode;
	}
	
	function dnbBass1 () {
		var newCode = [];
		var flag  = true;
		var duration = 0;
		var maxDuration = 2 *  NOTES * eighthNoteTime;
		var timeLeft = maxDuration;
		var prevDuration = 0;

		for (var i = 0; i < NOTES; i++) {
			if (Math.random() > 0.3) { 
				timeLeft -= eighthNoteTime;
				duration = Math.random() * 16 * eighthNoteTime;
				var x = Math.round (Math.random() * 7 + 2  );
				var y = Math.round (Math.random() * 7 + 3 );
				newCode[i] = new Note (
					  la.get(x, y) 											//pitch
					, 0.1 + Math.random()  / 2								//volume
					, duration												//duration
					, 0														//type
					, Math.random() * 160);									//modulation			
			}
			prevDuration = duration;
		}		
		return newCode;
	}	
