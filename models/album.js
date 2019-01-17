var mongoose  = require('mongoose');
var timestamp = require('mongoose-timestamp'); 

const ArtistSchema = mongoose.Schema({
	id: { type: String },
	href: { type: String },
	name: { type: String },
	uri: { type: String },
	type: { type: String }
});

const ImageSchema = mongoose.Schema({
	height: { type: Number },
	width: { type: Number },
	url: { type: String }
});

module.exports = mongoose.model('Album', 
	mongoose.Schema({
		id: { type: String },
		href: { type: String },
		album_type : { type: String },
		artists: [ArtistSchema],
		images: [ImageSchema],
        name: { type: String },
        release_date:{ type: String },
        total_tracks: { type: Number },
        uri: { type: String },
        type: { type: String }
  	}).plugin(timestamp)
);