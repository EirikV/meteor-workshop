Meteor.methods({
	updateUserProfile: function(profileInfo) {
		if(!Meteor.userId()) {
			throw new Meteor.Error("Not signed in");
		}

		var current = Meteor.user();
		
		Meteor.users.update(current._id, { 
			$set: {
				"profile.firstname": profileInfo.firstname,
				"profile.lastname": profileInfo.lastname,
				"profile.adress": profileInfo.adress,
				"profile.phone": profileInfo.phone				
			} 
		});
	},
	updateProfileImage: function(url) {
		if(!Meteor.userId()) {
			throw new Meteor.Error("Not signed in");
		}
		
		var current = Meteor.user();
		Meteor.users.update(current._id, { $set: {"profile.image": url} });
	}
})