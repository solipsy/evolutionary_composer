function Note(pitch, volume, duration, type, modulation, x, y) {
	this.pitch = pitch || 0;
	this.volume = volume || 0;
	this.duration = duration || 0;
	this.type = type || 0;
	this.modulation = modulation || 0;
	this.x = x || 0;
	this.y = y || 0;
}

Note.prototype.mutate = function(type, threshold) {
	var newPitch = this.pitch, newVolume = this.volume, newDuration = this.duration, newType = this.type, newMod = this.modulation;
	if (Math.random() > threshold) {
		switch (type) {
			case "pitch":
				var x = Math.round (Math.random() * 5 + 10 );
				var y = Math.round (Math.random() * 5 + 7 );
				this.x = x;
				this.y = y;
				newPitch = la.get(x, y) 	;
				break;
			case "volume":
				newVolume = this.volume + (1 - Math.random() * 1);
				break;
			case "duration":
				newDuration = this.duration +  (0.1 - Math.random() * 0.2);
				break;
			case "type":
				newType = Math.floor((Math.random() * 4));
				break;
			case "modulation":
				newMod =  this.modulation *  (Math.random() * 2);
				break;				
		}
	}
	return new Note(newPitch, newVolume, newDuration, newType, newMod);
}; 

Note.prototype.transpose = function (dx, dy) {
	if (this.x + dx > 15 || this.x + dx < 0) {
		if (this.x + dx > 15) dx = 15;
		if (this.x + dx < 0) dx = 0;
	}
	else dx = this.x + dx;
	
	if (this.y + dy > 15 || this.y + dy < 0) {
		if (this.y + dy > 15) dy = 15;
		if (this.y + dy < 0) dy = 0;
	}
	else dy = this.y + dy;	

	return new Note (la.get (dx, dy), this.volume, this.duration, this.type, this.modulation);
};
