var p;
$(document).ready(function() {
	
	var slider = $( "#slider" ).slider({
		min: 60,
		max: 170,
		step: 1,
		value: 120,
		slide: function (event, ui) {
			BPM = ui.value;
			eighthNoteTime = (60 / BPM) / 4;
			songLen = NOTES * eighthNoteTime ;
			$("#sliderValue").html (BPM);
		}
	});
	
	$("#sliderValue").html (BPM);


	
	loadBuffers();


	function Pop(size) {
		this.members = [];
		this.generationNumber = 0;
		for (var i = 0; i < size; i++) {
			var song = new Song([], i + 1);
			song.init();
			this.members.push(song);
		}
	}


	Pop.prototype.generation = function(type, s1, s2) {
		if (s1 != undefined && s2 != undefined) {
			children = this.members[s1].mate(this.members[s2]);
			this.members.splice(0, 2, children[0], children[1]);
		} else if (s1 == undefined || s2 == undefined) {
			var i = 0;
			i = (s1 == undefined) ? s2 : s1;
			console.log ("<> " + i);
			for (var s = 0; s < this.members.length; s++) {
				if ( (s) != (i)) { //(s+1) != (i+1)
					console.log ("mutating: " + (s));
					var child = this.members[i].mutate(type, 0.1);
					this.members[s] = child;
					this.members[s].id = s + 1;
				}
			}

			this.members[i] = child;
		} else	return;
		this.generationNumber++;
	};


	
	
	Pop.prototype.displayD3 = function () {
		$("#pop").empty();
		$.each(this.members, function(i, d) {
			
			d3.select("#pop").append("div").attr("class", i == 0 ? "songafirst" : "songa").attr("id", "songa" + i);
			var songSvg = d3.select("#songa" + i).append("svg").attr("class", "populi").attr("width", 450).attr("height", 80).style("background-color", "black");
			var song = d.getArray();
			$.each (song, function (f, bar) {
				//console.log (bar);
				songSvg.selectAll("rect.c" + i + "-" + f).data(bar.code).enter().append("rect")
					.attr("x", function (x, e) {
						return 10 + (e) * 16;
					})
					.attr ("y", function(y, e) {
						var offset =0;
						if ((bar.type == "bass")  && y) {
							offset = y.pitch / 80;	
							return 30 + (f - offset) * 10;
						}	
						else if (bar.type == "lead" && y) {
							offset = y.pitch / 160;
							return 30 + (f - offset) * 10;
						}
						return 10 +  (f - offset) * 10;
					})
					.attr("width", function (w, e) {
						var offset = 1;
						if ((bar.type == "bass" || bar.type == "lead") && w) {
							offset = w.duration / 2;		
						}						
						return Math.abs(8 * offset);
					})
					.attr("height", 8)
					.attr("class", "c" + i + "-" + f)
					.attr ("fill", function (cc, e) {
						var color = "red";
						switch (f) {
							case 0: color = COLORS.bassdrum; break;
							case 1: color = COLORS.snare; break;
							case 2: color = COLORS.hihat; break;
							case 3: color = COLORS.bass; break;
							case 4: color = COLORS.lead; break;
						}
						var r = cc ? color : "blue";
						return r;
					})
					.attr ("opacity", function (e) {
						if (e) {
							return 0.2 + e.volume;
						}
						else return 0.05;
						
					})
					.on ("click", function (e, i) { //editing
						hilite (e, i, this, d, f, "edit");
					})
					;
			});
			
			d3.select("#songa" + i).append("div").attr("class", "controls");
			d3.select("#songa" + i + " .controls").append("div").attr("class", "playing");
			d3.select("#songa" + i + " .controls .playing").append("input").attr("class", "modifying").attr("value", "Play").attr("id", "play" + (i+1)).attr("type", "button");
			d3.select("#songa" + i + " .controls .playing").append("input").attr("class", "modifying").attr("value", "Loop").attr("id", "loop" + (i+1)).attr("type", "button");
			d3.select("#songa" + i + " .controls .playing").append("input").attr("class", "modifying").attr("value", "Save").attr("id", "save" + (i+1)).attr("type", "button");
			
			d3.select("#songa" + i + " .controls").append("div").attr("class", "modification");
			d3.select("#songa" + i + " .controls .modification").append("span").attr("class", "ctrltext").html("Mutate: ");
			d3.select("#songa" + i + " .controls .modification").append("input").attr("class", "modifying").attr("value", "everything").attr("id", "mutate" + (i+1)).attr("type", "button");
			d3.select("#songa" + i + " .controls .modification").append("input").attr("class", "modifying").attr("value", "bass").attr("id", "bass" + (i+1)).attr("type", "button");
			d3.select("#songa" + i + " .controls .modification").append("input").attr("class", "modifying").attr("value", "drums").attr("id", "drums" + (i+1)).attr("type", "button");
			
			
			$("#songa" + i).draggable({
				containment : "parent",
				snap : $("#songa" + i),
				cursor: "move",
				stop : function () {p.generation("bass", 1, 2);p.displayD3("pop");console.log ("sss");}
			});
			$("#songa" + i).droppable();	
		});	
	};
	
	function hilite (e, i, el, d, f, type) {
		var note = d.bars[f].code[i];
		console.log (d);
		switch (type) {
			case "edit": 
				if (!note) { 
					var newNote;
					switch(f) {
						case 0 : 
							var newNote = new Note (1,  (i%4 == 0) ? 0.3 + Math.random() * 0.5 : 0.3 + Math.random() * 0.2, Math.random(), "kick");
							break;
						case 1 : 
							var newNote = new Note (1,  (i%4 == 0) ? 0.3 + Math.random() * 0.5 : 0.3 + Math.random() * 0.2, Math.random(), "snare");
							break;
						case 2 : 
							var newNote = new Note (1,  (i%4 == 0) ? 0.3 + Math.random() * 0.5 : 0.3 + Math.random() * 0.2, Math.random(), "hihat");
							break;																		
					}
					d.bars[f].code[i] = newNote;
					d3.select(el).attr("opacity", 0.2 + newNote.volume);	
				}
				else {
					d.bars[f].code[i] = false;
					d3.select(el).attr("opacity", 0.05);
				}		
				break;
			case "progress":
				console.log ("progress");
				break;
		}

	}
	
	
	Pop.prototype.bindControls = function () {
	
		$(".modifying").on ("click", function () {
			var b = $(this).attr("id");
			if (b.indexOf ("play") > -1) {
				b = b.replace("play", "");
				p.playSong(b - 1);			
			}
			if (b.indexOf ("loop") > -1) {
				b = b.replace("loop", "");
				p.loopSong(b - 1);			
			}			
			if (b.indexOf ("mutate") > -1) {
				b = b.replace("mutate", "");
				p.generation("all", b - 1);	
				p.displayD3("pop");	
				p.bindControls();		
			}	
			if (b.indexOf ("bass") > -1) {
				b = b.replace("bass", "");
				p.generation("bass", b - 1);	
				console.log ("btnMut: " + (b-1));
				p.displayD3("pop");
				p.bindControls();			
			}		
			if (b.indexOf ("drums") > -1) {
				b = b.replace("drums", "");
				p.generation("drum", b - 1);	
				console.log ("btnMut: " + (b-1));
				p.displayD3("pop");
				p.bindControls();			
			}				
			if (b.indexOf ("save") > -1) {
				b = b.replace("save", "");
				var songToSave = p.members[b - 1];
				var userName = "user";
				var loopName = "loop";
				var jsonToSend = JSON.stringify(songToSave);
				saveLoop(jsonToSend, b);
			}
		});
	};
	
	function saveLoop (songToSave, buttonID) {
		$("#savesong").show();
		//$("#songa" + buttonID).append(saveForm);
		$("#blackout").show();	
		$("#submitsave").on ("click", function () {
			$("#savesong").hide();
			$("#blackout").hide();				
			var userName = $("#username").val();
			var loopName = $("#loopname").val();		
			//validate fields
				
			setTimeout (function() {
			$.ajax({
			    url : "info.php",
			    type: "post",
			    cache: false,
			    async: true,
			    dataType: 'text',
			    data : {name : userName, json : songToSave, loop : loopName, bpm : BPM },
			    success: function(data, textStatus, jqXHR)    {
							//console.log ("JS: " + textStatus);
							//console.log ("JS: " + data);

							$("#save" + buttonID).css({background:"#240047", color: "#666"});
							$("#save" + buttonID).prop("value", "Saved");													
			    		},
			    error: function (jqXHR, textStatus, errorThrown)   {
			 				console.log ("error");
			    		}				
			}, 1000);	

			});	
			
		});	
		$("#submitcancel").on ("click", function () {
			$("#savesong").hide();
			$("#blackout").hide();
		});	
		return null;
	}
	
	Pop.prototype.playSong = function (id) {
		var song = this.members[id];
		Player.play(song);
	};
	
	Pop.prototype.loopSong = function (id) {
		var song = this.members[id];
		Player.loop(song);
	};	
	

	p = new Pop(6);
	console.log ("init");
	p.displayD3("pop");
	p.bindControls();

	$("#go").on("click", function() {
		p = new Pop(6);
		p.displayD3("pop");
		p.bindControls();
	
	});
	
	
	$("#load").on("click", function() {
		$.ajax ({
				url : "get.php",
				async: true
			})
			.success (function (data) {
				data.sort (function (a, b) {
					return b.id - a.id;
				});
				displayLoadList(data);
			}) ;
	});	
	
	function displayLoadList (data) {
		$("#loadlist").empty().show();
		$("#blackout").empty().show();
		var html = "<div class = 'header'><span class = 'id'>ID</span><span class = 'username'>User</span><span class = 'loopname'>Loop name</span><input type = 'button' class = 'loadingbtn' value = 'Close' id = 'closeload'></div>";
		html += "<div class = 'loadresults'>";
		
		$.each(data, function (i, d) {
			html += "<div class = 'loadrow'><span class = 'id'>" + d.id + "</span><span class = 'username'>" + d.username + "</span><span class = 'loopname'>" + d.loopname + "</span><span class = 'loadingbtn'><input type = 'button' value = 'Load' id = 'loadsong" + d.id + "'></span></div>";
		});
		html += "</div>";
		$("#loadlist").append (html);
		
		$("input").on ("click", function () {

			var b = $(this).attr("id");
			if (b.indexOf ("closeload") > -1) {
				$("#loadlist").hide();
				$("#blackout").hide();					
			}
			if (b.indexOf ("loadsong") > -1) {
				b = b.replace("loadsong", "");
				$.ajax ({
						url : "getsong.php",
						async: true,
						type: "post",
						dataType:'json',
						data : {id : b}
					})
					.done (function (data) {
						var result = JSON.parse(data[0].data);
						var s = new Song (result.bars, 1);
						for (var i = 0; i < p.members.length; i++) p.members[i].id = i+1;
						p.members[0] = s;
						//p.generation("bass", 0);
						p.displayD3("pop");
						p.bindControls();		
						$("#loadlist").hide();
						$("#blackout").hide();		
					}) ;				
			}				
		});

	}

	//
	la.display("lambdoma");
	$("#showkeys").on ("click", function ()  {
		$("#lambdoma").toggleClass("hidden");
		
	});


});

