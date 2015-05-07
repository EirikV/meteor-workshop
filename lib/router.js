Router.configure({
	layoutTemplate: 'Layout',
	notFoundTemplate: 'NotFound'
});

Router.plugin('dataNotFound', {notFoundTemplate: 'NotFound'});

Router.map(function() {
	this.route('Posts', {path: '/'});
	this.route('Profile', 
		{
			path: '/profile/:username',
			waitOn: function() {
				return Meteor.subscribe("profile", this.params.username)	
			},
			data: function() {
				var user = Meteor.users.findOne({username: this.params.username});
				if(!user)
					return null;
					
				var current = Meteor.user();				
				
				return {
					user: user,
					editPermissions: current.username === this.params.username
				};
			},
			name: "edit.profile"
		});
});
