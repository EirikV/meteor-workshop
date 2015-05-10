Template.viewPost.helpers({
	getUser: function(userId) {
		var user = Meteor.users.findOne(userId);
		if(!user) return;
		return {
			username: user.username,
			profile: user.profile
		};
	},
	
	fetchTag: function(tag, postId) {
		return Tags.findOne({postId: postId, tag: tag});
	}

})