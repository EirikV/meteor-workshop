Router.configure({
	layoutTemplate: 'Layout',
	notFoundTemplate: 'NotFound',
	waitOn: function(){
		return [
			Meteor.subscribe("profiles")
		]
	}
});

Router.map(function() {
	this.route('Posts', {path: '/'});
	this.route('Profile', 
		{
			path: '/profile/:username',
			data: function() {
				if(!Meteor.userId()) {
					Notifications.error('Not signed in', 'You have to be signed in to view this page');
					Router.go('Posts');
					return;
				}
				var user = Meteor.users.findOne({username: this.params.username});
				var current = Meteor.user();
				return {
					user: user,
					editPermissions: current.username === this.params.username
				};
			},
			name: "edit.profile"
		});
});
