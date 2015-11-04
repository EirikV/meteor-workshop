Template.registerHelper('getAvatar', function(imageId) {
	var image = Images.findOne(imageId);
	if(!image)
		return '/img/user.png';
	return image.url();
});

var updateProfile = function(profileInfo) {
	Meteor.call('updateUserProfile', profileInfo, function(error, result) {
		if(error) {
			Notifications.error(error.error);
		}

	});
}

Template.registerHelper('getName', function(profile, username) {
	if(Session.get('nameChange') && Session.get('nameChange').trim() !== '') {
		return Session.get('nameChange');
	}

	if(profile && (profile.firstname || profile.lastname)) {
	    return profile.firstname + ' ' + profile.lastname;
	}

	var firstname = [
		'Anonymous',
		'Random',
		'Unidentified',
		'Nameless',
		'Unnamed',
		'Unknown',
		'Incognito'
	];

	var lastname = [
		'Sheep',
		'Badger',
		'Elephant',
		'Tiger',
		'Dog',
		'Wolf',
		'Cat',
		'Turtle',
		'Shark',
		'Dolphin',
		'Cow',
		'Hamster',
		'Giraffe',
		'Lion'
	];

	var profileInfo = {
		firstname: firstname[Math.round(Math.random()*(firstname.length-1))],
		lastname: lastname[Math.round(Math.random()*(lastname.length-1))]
	}

	updateProfile(profileInfo)
	
	return '';
});