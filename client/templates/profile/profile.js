Template.editProfile.events({
	"click .profileFormSubmit": function(e) {
		e.preventDefault();
		var data = $("form.profileForm").serializeArray();
		var profileInfo = _.object(_.pluck(data, "name"), _.pluck(data, "value"));
		
		Meteor.call("updateUserProfile", profileInfo, function(error, result) {
			if(error) {
				Notifications.error(error.error);
			} else {
				Notifications.success("Successfully updated profile :)")
			}
		});
	}
});