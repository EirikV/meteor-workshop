Template.editProfile.events({
	"click .profileFormSubmit": function(e) {
		e.preventDefault();
		var data = $("form.profileForm").serializeArray();
		var profileInfo = _.object(_.pluck(data, "name"), _.pluck(data, "value"));
		console.log("profileInfo", profileInfo);
		
		Meteor.call("updateUserProfile", profileInfo, function(error, result) {
			if(error) {
				Notifications.error(error.error);
			} else {
				Notifications.success("Successfully updated profile :)")
			}
		});
	},
	"change .profilePicUpload": function(event, template) {
		FS.Utility.eachFile(event, function(file) {
			Images.insert(file, function (err, fileObj) {
		  		if (err){
					Notifications.error("Couldn't upload image :(");		 
			  	} else {
		    		Meteor.call("updateProfileImage", "/cfs/files/images/" + fileObj._id);
			  	}
			});
		});
   }
});