Meteor.methods({
	updateUserProfile: function(profileInfo) {
		if(!Meteor.userId()) {
			throw new Meteor.Error("Not signed in");
		}

		var current = Meteor.user();
		Meteor.users.update(current._id, { $set: {profile: profileInfo} });
	}
})