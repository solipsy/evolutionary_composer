function Lambdoma (freq) {
	this.N = 17;
	this.mat = [];
	for (var x = 1; x < this.N; x++) {
		var row = [];
		for (var y = 1; y < this.N; y++) {
			row.push ({value: y / x * freq, x : x, y: y});
			//row.push (y / x * freq);
		}
		this.mat.push (row);
	}
}

Lambdoma.prototype.print = function () {
	for (var i = 0; i < this.N-1; i++) console.log (this.mat[i]);
};

Lambdoma.prototype.get = function (x, y) {
	return this.mat[x][y].value;
};

Lambdoma.prototype.display = function (div) {
	$("#" + div).empty();

	var lambdomaSvg = d3.select("#" + div).append("svg").attr("class", "lambda").attr("width", 400).attr("height", 400).style("background-color", "black");
	$.each (this.mat, function (i, d) {
		//console.log (d);
		lambdomaSvg.selectAll("rect.row" + i).data(d).enter().append("rect")
			.attr("x", function (x, e) {
				return 10 + (e) * 20;
			})
			.attr("y", function (y, e) {
				return 10 + (i) * 20;
			})
			.attr("width", 16).attr("height", 16)
			.attr("class", "row" + i)
			.attr("fill", function (e) {
				var tail = e.value  - Math.floor(e.value);
				var result = "white";
				//console.log (tail + " " + e.x + "  " + e.y );
				if (e.x == 3 ) return "#ffff00";
				else if (e.y == 3 ) return "#99ff66";
				else if (e.x == 7 || e.y == 7) result = "#ff0000";
				else if (e.x == 9 || e.y == 9) result ="#330033";
				else if (e.x == 11 || e.y == 11) result = "#330033";
				else if (e.x == 13 || e.y == 13) result = "#330033";
				else if (e.x == 15 || e.y == 15) result = "#330033";
				if (tail == 0 ) result = "white";
				return result;
			})
			.on ("click", function (e) {
				playLambdoma (e.value, 0);
			})			
			;
	});
};



