	var la = new Lambdoma(40);

	function Bar(code) {
		this.code = code || [];  //pitch, volume, duration, type, modulation, x, y
		for (var i = 0; i < this.code.length; i++) {
			if (this.code[i]) 
			this.code[i] = new Note (this.code[i].pitch,this.code[i].volume, this.code[i].duration, this.code[i].type, this.code[i].modulation, this.code[i].x, this.code[i].y);
		}
		this.type = 0;
		this.instrument = 0;
	}

	
	function bassDrumSelector () {
		var newCode = [];
		for (var i = 0; i < NOTES; i++) {
			newCode[i] = technodrums.chooser(i).bassdrum;
			//newCode[i] = breaks.chooser(i).bassdrum;
		}	
		return newCode;	
	}
	
	function snareDrumSelector () {
		var newCode = [];
		for (var i = 0; i < NOTES; i++) {
			newCode[i] = technodrums.chooser(i).snare;
		}	
		return newCode;	
	}	
	
	function hihatSelector () {
		var newCode = [];
		for (var i = 0; i < NOTES; i++) {
			newCode[i] = technodrums.chooser(i).hihat;;
		}	
		return newCode;	
	}		
	
	function bassSelector () {
		var newCode = [];
		for (var i = 0; i < NOTES; i++) {
			newCode[i] = technodrums.chooser(i).bass;
			//newCode[i] = breaks.chooser(i).bass;
		}	
		return newCode;	
	}	
	
	function leadSelector () {
		var newCode = [];
		for (var i = 0; i < NOTES; i++) {
			newCode[i] = technodrums.chooser(i).lead;
		}	
		return newCode;	
	}		
	

	Bar.prototype.init = function(type) {
		this.type = type;
		switch (type) {
			case "kickdrum":
				this.code = bassDrumSelector(); 
				break;
			case "hihatdrum":
				this.code = hihatSelector();
				break;
			case "snaredrum":
				this.code = snareDrumSelector(); 
				break;
			case "bass":
				this.code = bassSelector();
				this.instrument = Math.floor(Math.random () * 2);
				break;		
			case "lead":
				this.code = leadSelector();
				break;							
		}
	};

	Bar.prototype.mate = function(bar) {
		var pivot = Math.round(this.code.length * Math.random());
		var child1 = this.code.slice(0, pivot);
		var child2 = bar.code.slice(0, pivot);
		Array.prototype.push.apply(child1, bar.code.slice(pivot, bar.code.length));
		Array.prototype.push.apply(child2, this.code.slice(pivot, this.code.length));
		return [new Bar(child1), new Bar(child2)];
	};

	Bar.prototype.mutate = function(threshold) {
		var decide =  Math.floor(6 * Math.random());
		//decide = Math.floor (1 / (0.1 + 1 * 5 * Math.random()));

		
		var newCode = [];
		switch(decide) {  //normal mutate by note
			case 0: 
				for (var i = 0; i < NOTES; i++) {
					var c = this.code[i];
					if (Math.random() > threshold) newCode[i] = c;
					else
						if (c) {
							newCode[i] = c.mutate ("pitch", 0.1);
							newCode[i] = newCode[i].mutate ("volume", 0.2);
							newCode[i] = newCode[i].mutate ("duration", 0.2);
							newCode[i] = newCode[i].mutate ("modulation", 0.3);
						}
				}
				var newBar = new Bar(newCode);
				newBar.type = this.type;

				return newBar;		
				break;	
			case 1:   // reverse
				for (var i = NOTES-1; i >= 0; i--) {
					var c = this.code[i];
					if (c) {
						newCode[NOTES - i - 1] = c;
					}
				}
				var newBar = new Bar(newCode);
				newBar.type = this.type;
				return newBar;		
				break;		
			case 2:  // slice random length phrase from beginning, then repeat
				var phraseLen = Math.floor(3 + 4 * Math.random());
				var begin = Math.floor(16 * Math.random());
				var phrase = this.code.slice(begin, begin + phraseLen);
				for (var i = 0; i < NOTES; i++) {
					newCode[i] = phrase[i%phraseLen];
				}
				var newBar = new Bar(newCode);
				newBar.type = this.type;
				return newBar;		
				break;	
			case 3:  // insert funky beginning int first half phrase 
				var phraseLen = NOTES/2;
				var phrase = [];
				var mult = Math.floor(6 * Math.random());
				for (var i = 0; i < NOTES/2; i++) {
					if (i < NOTES/(4)) {
						if (i% ( mult) == 0 && this.code[i]) {
							var note = this.code[i];
							note.duration = eighthNoteTime * 16;
							phrase[i] = note;
						} 
						else phrase[i] = false;						
					}
					else phrase[i] = this.code[i];
				}
				for (var i = 0; i < NOTES; i++) {
					newCode[i] = phrase[i%phraseLen];
				}					
				var newBar = new Bar(newCode);
				newBar.type = this.type;
				return newBar;		
				break;	
			case 4: //transpose
				var dx = 2 - Math.floor (Math.random() * 5);
				var dy = 2 - Math.floor (Math.random() * 5);			
				for (var i = 0; i < NOTES; i++) {
					var c = this.code[i];
					if (c) {
						newCode[i] = c.transpose (dx, dy);
					}
				}
				var newBar = new Bar(newCode);
				newBar.type = this.type;
				return newBar;		
				break;	
				
			case 5: //transpose a part
				var counter = 0;
				var dx = 4 - Math.floor (Math.random() * 9);
				var dy = 4 - Math.floor (Math.random() * 9);				
				var part = Math.floor (NOTES / (2 + Math.random() * 3));
				var transpose = Math.random > 0.5 ? false : true;
				for (var i = 0; i < NOTES; i++) {
					if (counter == part) {
						transpose = !transpose;
						counter = 0;
					}
					var c = this.code[i];
					if (c) {
						if (transpose)	newCode[i] = c.transpose (dx, dy);
						else newCode[i] = c;
					}
					counter++;
				}
				var newBar = new Bar(newCode);
				newBar.type = this.type;
				return newBar;		
				break;	
								
			default:
				for (var i = 0; i < NOTES; i++) {
					var c = this.code[i];
					if (Math.random() > threshold) newCode[i] = c;
					else
						if (c) {
							newCode[i] = c.mutate ("pitch", 0.1);
							newCode[i] = newCode[i].mutate ("volume", 0.5);
							newCode[i] = newCode[i].mutate ("duration", 0.8);
							newCode[i] = newCode[i].mutate ("modulation", 0.5);
						}
				}
				var newBar = new Bar(newCode);
				newBar.type = this.type;
				return newBar;		
				break;																	
		}
	
	
	};
	
	function recursePhrase (phrase, newphrase, level) {
		if (level == 3) return newphrase;
		else {
			var removed1 = phrase.slice (0, phrase.length/2-1);
			var removed2 = phrase.slice (phrase.length/2-1, phrase.length-1);
			newphrase.splice(0, 0, removed1);
			newphrase.splice(phrase.length/2-1, 0, removed2);
			recursePhrase(phrase, newphrase, level++);
		}
	}
	

	Bar.prototype.display = function(check) {
		var result = "<div class = 'bar " + this.type + "'>";
		$.each(this.code, function(i, d) {
			var opacity = 0;
			if (d) opacity = d.volume;
			result += "<span class = 'note' style = 'opacity:" + (0.3 + opacity) + "' >" + (d  ? "■" : "□") + "</span>";
		});

		result += "</div>";
		return result;
	};
	

	