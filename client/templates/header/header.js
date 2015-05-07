Template.header.helpers({
	getName: function(profile) {
		if(Session.get('nameChange') && Session.get('nameChange').trim() !== '') {
			return Session.get('nameChange');
		}

		if(profile.firstname || profile.lastname) {
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


		return firstname[Math.round(Math.random()*(firstname.length-1))] + ' ' + lastname[Math.round(Math.random()*(lastname.length-1))];
	},

	getAvatar: function(profileImage) {
		if(profileImage) {
			return profileImage;
		}

		return '/img/user.png';
	}
});