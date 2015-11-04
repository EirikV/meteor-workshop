Template.actionBar.events({
	'click .glyphicon-home': function() {
        Router.go("Posts");
	},

	'click .glyphicon-log-out': function() {
//			Uncomment this line, sign in in two different browsers, sign out and se what happens.
//  		Meteor.logoutOtherClients();
		Meteor.logout();
        Router.go("Posts");
	}
});