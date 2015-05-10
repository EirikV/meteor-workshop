Template.registerHelper('getName', function(profile, username) {
	//It would be cool to display the name while the user is typing....
	if(profile && (profile.firstname || profile.lastname)) {
	    return profile.firstname + ' ' + profile.lastname;
	}
	
	return "Placeholder-username";
});