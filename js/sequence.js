function Sequence(song) {
	this.members = [];
}

Sequence.prototype.add = function (song) {
	this.members.push(song);
};

Sequence.prototype.remove = function (index) {
	this.members.splice(index, 1);
};

Sequence.prototype.displayD3 = function (div) {
	
};

Sequence.prototype.play = function (loop) {
	
}; 

Sequence.prototype.stop = function () {
	
}; 