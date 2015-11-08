Template.index.helpers({
	songNames: function() {
		return Songs.find({songName: {$exists: true}}, {name: 1, _id: 0});
	},
	songs: function() {
		var nxtSong = Songs.findOne({_id: 'currentSong'}, {_id:0, currentSongName: 1} );
		if (nxtSong == undefined) return ;
		return Songs.find({songName: nxtSong.currentSongName});
	},
});

var hideChords = false;
Template.index.events({
	'change #nextSong': function(e) {
		e.preventDefault();
		Songs.update(
			{_id: 'currentSong'},
			{$set: {currentSongName: e.target.value}},
			{upsert: true}
		);
	},
	'change #hideChords': function(e) {
		e.preventDefault();
		hideChords = hideChords?false:true;
		$('.chord').toggle();
	}
});

Template.songLyric.onRendered(function(){
	if (hideChords) {
		$('.chord').hide();
	}
});