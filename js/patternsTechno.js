// ***************************
//		PATTERN GENERATION
// ***************************

function TechnoBassDrum () {
	this.chooser = function (i) {
		preset = (Math.random() > 0.5) ? this.pattern1 : this.pattern2;
		result = preset(i);
		return result;
	};
	this.pattern1 =	function (i) {
		var result = false;
		if ( i % 4 == 0 ) result = new Note (1,  (i%4 == 0) ? 0.3 + Math.random() * 0.5 : 0.3 + Math.random() * 0.2, Math.random(), "kick");
		return result;		
	};
	this.pattern2 =	function (i) {
		var result = false;
		if ( i % 4 == 0 ) result = new Note (1,  (i%4 == 0) ? 0.5 + Math.random() * 0.5 : 0.3 + Math.random() * 0.2, Math.random() * 0.3, "kick");
		else if ( (i + 2)  % 16 == 0 ) result = new Note (1,  (i%4 == 0) ? 0.5 + Math.random() * 0.5 : 0.3 + Math.random() * 0.2, Math.random() * 0.3, "kick");
		return result;	
	};	
}


function TechnoSnare () {
	this.chooser = function (i) {
		preset = (Math.random() > 0.5) ? this.pattern1 : this.pattern2;
		result = preset(i);
		return result;
	};
	this.pattern1 = function (i) {
		var result = false;
		if (i != 0 && (i - 4 )  % 8 == 0 ) result = new Note (1,  ((i + 2) % 8 == 0) ? 0.7 + Math.random() * 0.4 : 0.3 + Math.random() * 0.2, Math.random(), Math.random() > 0.3 ? "snare" : "snareElectro");
		else if (i != 0 && (i - 7 )  % 16 == 0 ) result = new Note (1,  ((i + 2) % 8 == 0) ? 0.1 + Math.random() * 0.2 : 0.1 + Math.random() * 0.1, Math.random(), Math.random() > 0.3 ? "snare" : "snareElectro");
		return result;
	};	
	this.pattern2 = function (i) {
		var result = false;
		if (i != 0 && (i - 4 )  % 8 == 0 ) result = new Note (1,  ((i + 2) % 8 == 0) ? 0.7 + Math.random() * 0.4 : 0.3 + Math.random() * 0.5, Math.random(), Math.random() > 0.3 ? "snare" : "snareElectro");
		else if (i != 0 && (i - 7 )  % 16 == 0 ) result = new Note (1,  ((i + 2) % 8 == 0) ? 0.1 + Math.random() * 0.2 : 0.1 + Math.random() * 0.1, Math.random(), Math.random() > 0.3 ? "snare" : "snareElectro");
		else if (i != 0 && (i +  0  )  % 5 == 0 ) result = new Note (1,  ((i + 2) % 8 == 0) ? 0.1 + Math.random() * 0.2 : 0.1 + Math.random() * 0.1, Math.random(), Math.random() > 0.3 ? "snare" : "snareElectro");
		return result;
	};		
}

function TechnoHihat () {
	this.chooser = function (i) {
		preset = (Math.random() > 0.5) ? this.pattern1 : this.pattern2;
		result = preset(i);
		return result;
	};
	this.pattern1 = function (i) {
		var result = false;
		result = (i%2 == 0) ? 	new Note (1,  0.4 + Math.random() / 12, Math.random(), "hihatElectro") : 
								new Note (1,  0.1 + Math.random() / 6, Math.random(), "hihatElectro");
		return result;
	};	
	this.pattern2 = function (i) {
		var result = false;
		result = (i%2 == 0) ? 	new Note (1,  0.1 + Math.random() / 6, Math.random(), "hihatElectro") : 
								new Note (1,  0.4 + Math.random() / 12, Math.random(), "hihatElectro");
		return result;
	};				
}

function TechnoBass () {
	var phrase = [], longphrase = [], funkyphrase = [];
	var phraseLength = 3;
	var rand;
	this.chooser = function (i) {
		
		var preset;
		if (rand > 0 && rand < 0.25) {preset = this.pattern2;}
		else if (rand >= 0.25 && rand < 0.5) {preset = this.pattern2;}
		else if (rand >= 0.5 && rand < 0.75) {preset = this.pattern3;}	
		else if (rand >= 0.75 && rand < 1) {preset = this.pattern4;}
		//preset = 	this.pattern3;		
		return preset(i);

	};
	this.pattern1 = function (i) {
		return phrase[i % phraseLength];
	};	

	this.pattern2 = function (i) {
		return 	(i % (NOTES/4) < 2) ? longphrase[i % (NOTES / 4)] : 	phrase[i % phraseLength];
	};	
	
	this.pattern3 = function (i) {
		return (i % (NOTES/2) < 9) ? funkyphrase[i % (NOTES / 4)] : 
			Math.random() > 0.5 ? longphrase[i % phraseLength] : phrase[i % phraseLength];
	};	

	this.pattern4 = function (i) {
		return 	(i % (NOTES/4) < 5) ? phrase[i % phraseLength] : longphrase[i % (NOTES / 4)];
	};	
		
	this.initPhrase = function () {
		var phrase4 = [];
		var offX = 4 + Math.round (Math.random() * 3);
		var offY = 4 + Math.round (Math.random() * 3);
	
		for (var i = 0; i < phraseLength; i++) {
			duration = Math.random() * 16 * eighthNoteTime;
			var x = Math.round (Math.random() * 7 + offX  );
			var y = Math.round (Math.random() * 8 + offY);
			if (Math.random() > 0.3) {
				phrase4[i] = new Note (
					  la.get(x, y) 											//pitch
					, 0.5 + Math.random()  * 0.4							//volume
					, duration												//duration
					, Math.random() * 0.5									//type
					, 10 + Math.random() * 20														//modulation
					, x
					, y);													
			}
			else phrase4[i] = false;
		}
		phrase = phrase4;		
	};

	this.initFunkyPhrase = function () {
		var offX = 4 + Math.round (Math.random() * 3);
		var offY = 4 + Math.round (Math.random() * 3);		
		var phrase4 = [];
		var mult = 3 + Math.floor(3 * Math.random());
		var x = Math.round (Math.random() * 7 + offX);
		var y = Math.round (Math.random() * 8 + offY);
		duration = 8 * eighthNoteTime + Math.random() * 12 * eighthNoteTime;	
		var newNote = new Note (
					  la.get(x, y) 											//pitch
					, 0.3 + Math.random()  * 0.4							//volume
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
	
	this.initPhraseLength = function () {
		phraseLength = 3 + Math.floor (6 * Math.random());
		rand = Math.random();
	};
}

function TechnoLead () {
	var phrase = [], longphrase = [];
	var phraseLength = 3;
	this.chooser = function (i) {
		preset = (Math.random() > 0.5) ? this.pattern1 : this.pattern2;
		result = preset(i);
		return result;
	};
	this.pattern1 = function (i) {
		return phrase[i % phraseLength];
	};	
	this.pattern2 = function (i) {
		return (Math.random() > 0.4) ?
		(i % (NOTES/4) < 7) ? longphrase[i % (NOTES / 4)] : phrase[i % phraseLength] :
		(i % (NOTES/4) < 3) ? phrase[i % phraseLength] : longphrase[i % (NOTES / 4)]
		;
	};	
	this.pattern3 = function (i) { //funky beginning
		
	};	
	this.pattern4 = function (i) {
		//rekurzivna: generiraj dolgo frazo, rekurzivno jo deli na polovice, na začetku ali koncu vsakega dela daj nekaj drugaga 
	};	
	
	this.initPhrase = function () {
		var phrase4 = [];
		for (var i = 0; i < phraseLength; i++) {
			duration = Math.random() * 48 * eighthNoteTime;
			var x = Math.round (Math.random() * 5 + 10 );
			var y = Math.round (Math.random() * 5 + 10);
			if (Math.random() > 0.7) {
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
		for (var i = 0; i < NOTES/4; i++) {
			duration = Math.random() * 12 * eighthNoteTime;
			var x = Math.round (Math.random() * 4 + 11  );
			var y = Math.round (Math.random() * 4 + 11 );
			if (Math.random() > 0.8) {
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
		longphrase = phrase4;		
	};
	
	this.initPhraseLength = function () {
		phraseLength = 3 + Math.floor (6 * Math.random());
	};
}



function Techno () {
	this.bd = new TechnoBassDrum();
	this.snare = new TechnoSnare();
	this.hihat = new TechnoHihat();
	this.bass = new TechnoBass();
	this.lead = new TechnoLead();

	var count = -1;
	
	this.chooser = function (i) {
		count ++;
		if (count % 32 == 0) {
			this.bass.initPhraseLength();
			this.bass.initPhrase();	
			this.bass.initLongPhrase();	
			this.bass.initFunkyPhrase();		
			
			this.lead.initPhraseLength();
			this.lead.initPhrase();	
			this.lead.initLongPhrase();
				
		}

		return	{	bassdrum: this.bd.chooser(i), 
					snare: this.snare.chooser(i), 
					hihat: this.hihat.chooser(i), 
					bass: this.bass.chooser(i),
					lead: this.lead.chooser(i)
				};		
	};

}



var technodrums = new Techno();
