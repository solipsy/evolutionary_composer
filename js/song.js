	function Song(bars, id) {
		for (var b = 0; b < bars.length; b++) { 
			var old = bars[b]; 
			bars[b] = new Bar(old.code);
			bars[b].type = old.type;
			bars[b].instrument = old.instrument;
		}
		this.bars = bars || [];
		this.id = id || 0;
	}


	Song.prototype.init = function() {
		for (var i = 0; i < TRACKS; i++) {
			var bar = new Bar();
			switch (i) {
				case 0:
					bar.init("kickdrum");
					break;
				case 1:
					bar.init("snaredrum");
					break;
				case 2:
					bar.init("hihatdrum");
					break;
				case 3:
					bar.init("bass");
					break;		
				case 4:
					bar.init("lead");
					break;									
				default:
					bar.init("hihatdrum");
					break;
			}
			this.bars[i] = bar;
		}
	};

	Song.prototype.random = function() {
		for (var i = 0; i < TRACKS; i++) {
			var bar = new Bar();
			bar.random();
			this.bars[i] = bar;
		}
	};

	Song.prototype.mutate = function(type, threshold) {
		
		var newBars = [];
		for (var i = 0; i < TRACKS; i++) {
			var bar = this.bars[i];
			if (bar.type.indexOf(type) > -1) { // == type
				bar = bar.mutate(threshold);
			}
			else if (type == "all") {
				bar = bar.mutate(0.02 + threshold);
			}
			newBars[i] = bar;
		}
		return new Song(newBars, this.id);
	};

	Song.prototype.mate = function(song) {
		var result1 = [], result2 = [];
		for (var i = 0; i < TRACKS; i++) {
			var barMatingResult = this.bars[i].mate(song.bars[i]);
			result1.push(barMatingResult[0]);
			result2.push(barMatingResult[1]);
		}
		var newSong1 = new Song(result1, this.id);
		var newSong2 = new Song(result2, song.id);
		return [newSong1, newSong2];
	};

	
	
	Song.prototype.getArray = function () {
		var result = [];
		$.each(this.bars, function(i, d) {
			result.push ({code:d.code, type:d.type});
		});		
		return result;
	};
	
		
