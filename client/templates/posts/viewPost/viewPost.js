Template.viewPost.helpers({
	getUser: function(userId) {
		var user = Meteor.users.findOne(userId);
		if(!user) return;
		return {
			username: user.username,
			profile: user.profile
		};
	}

})