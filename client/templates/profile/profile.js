Template.editProfile.events({
	'submit .profileForm': function(e) {
		//What use is this form-data without putting it in the database?
	},
	'keyup input': function(e) {
		//This event might be used for some fun reactive programming stuff
	},
	'change .profilePicUploadInput': function(event, template) {
		//Sure would be nice to have my picture stored somewhere... If there only was some packages already installed I could use..
	}
});

Template.editProfile.helpers({
	displayClass: function(editPermissions) {
		return editPermissions ? "edit" : "read-only";
	}
});
