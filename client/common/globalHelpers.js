Template.registerHelper("getAvatar", function(imageId) {
	var image = Images.findOne(imageId);
	if(!image)
		return '/img/user.png';
	return image.url();
});

Template.registerHelper("getName", function(profile) {
	if(Session.get('nameChange') && Session.get('nameChange').trim() !== '') {
    		return Session.get('nameChange');
    	}

    	if(profile && (profile.firstname || profile.lastname)) {
    	    return profile.firstname + ' ' + profile.lastname;
    	}

    	var firstname = [
    	    'Captain',
    	    'Jane',
    	    'John',
    	    'Ola',
    	    'Miss.',
    	    'Mr.',
    	    'Doctor',
    	    'Mrs.',
    	    'Sir.'
    	];

    	var lastname = [
    	    'NoName',
    	    'Nameless',
    	    'JohnDoe',
    	    'Nordmann',
    	    'HazNoName',
    	    'QuestionMark'
    	];

    	var profileInfo = {
    		firstname: firstname[Math.round(Math.random()*(firstname.length-1))],
    		lastname: lastname[Math.round(Math.random()*(lastname.length-1))]
    	}

		Meteor.call('updateUserProfile', profileInfo, function(error, result) {
			delete Session.keys['nameChange'];

			if(error) {
				Notifications.error(error.error);
			}

		});


    	return;
});