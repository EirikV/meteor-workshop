Router.configure({
	layoutTemplate: 'Layout',
	notFoundTemplate: 'NotFound',
	waitOn: function(){
		return [
			Meteor.subscribe("profiles")
		]
	}
});

Router.plugin('dataNotFound', {notFoundTemplate: 'NotFound'});

Router.map(function() {
	this.route('Posts', {path: '/'});
	this.route('Profile', 
		{
			path: '/profile/:username',
			data: function() {
				if(!this.ready()) return;
				if(!Meteor.userId()) {
					Router.go('Posts');
					return;
				}
				var user = Meteor.users.findOne({username: this.params.username});
				var current = Meteor.user();
				
				
				
				return user ? {
					user: user,
					editPermissions: current.username === this.params.username
				} : null;
			},
			name: "edit.profile"
		});
});
