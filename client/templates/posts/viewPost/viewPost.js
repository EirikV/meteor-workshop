Template.viewPost.helpers({
	getUser: function(userId) {
		var user = Meteor.users.findOne(userId);
		if(!user) return;
		return {
			username: user.username,
			profile: user.profile
		};
	},

	tagError: function(error) {
	    if(error) {
	        return 'tag-forbidden';
        } else {
            return 'tag-not-found';
        }
	}

})