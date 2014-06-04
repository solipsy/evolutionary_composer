function bayesBassDrum () {
	this.map = {};
};

bayesBassDrum.prototype.init = function (N) {
	for(var  i = 0; i < 65536 ;  i++) {
		var d = [];
		
		d[7] = Math.floor (i/128%2);
		d[6] = Math.floor (i/64%2);
		d[5] = Math.floor (i/32%2);
		d[4] = Math.floor (i/16%2);
		d[3] = Math.floor (i/8%2);
		d[2] = Math.floor (i/4%2);
		d[1] = Math.floor (i/2%2);
		d[0] = Math.floor (i%2);
		
		var out = "", out1 = "";
		var lock = "";
		
		for (var j = N-1; j >= 0; j--) {
			if (d[j]) lock = "0";
			if (lock) out  += d[j] ? "1" : lock; 
			out1 += d[j] ? "1" : "0"; 
		}
		
		this.map[out] = Math.random();
		if (out.length < 8 ) this.map[out1] = Math.random();
	}		
};

bayesBassDrum.prototype.get = function (string) {
	return this.map[string];
};

var bb = new bayesBassDrum();
//bb.init(8);
