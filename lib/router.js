Router.configure({
	layoutTemplate: 'Layout',
	notFoundTemplate: 'NotFound',
	waitOn: function() {
		return [
			Meteor.subscribe("images"),	
			Meteor.subscribe("profiles")		
		];	
	}
});

Router.plugin('dataNotFound', {notFoundTemplate: 'NotFound'});

Router.map(function() {
	this.route('Posts', {
			path: '/',
			waitOn: function() {
				Meteor.subscribe('posts');
			},
			data: function() {
				return {
					posts: Posts.find({}, {sort: {createdAt: -1}})
				}
			}
		});
	this.route('Profile', {
		path: '/profile/:username',
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
