var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	battleId: String,
	battleTag: String,
	created: { type: Date, default: Date.now },
	lastLogin: { type: Date, default: Date.now },
	reputation: { type: Number, default: 0 },
	totalPosts: { type: Number, default: 0 },
	signature: { type: String, default: '' },
	posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
	communities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Community' }]
});

UserSchema.methods.upvote = function(cb) {
	this.reputation += 1;
	this.save(cb);
};

mongoose.model('UserModel', UserSchema);