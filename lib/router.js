Router.configure({
	layoutTemplate: 'Layout',
	notFoundTemplate: 'NotFound',
	waitOn: function() {
		return [
			Meteor.subscribe('images'),	
			Meteor.subscribe('profiles')		
		];	
	}
});

Router.plugin('dataNotFound', {notFoundTemplate: 'NotFound'});

Router.route('/', function() {
	this.render('Posts', {
		waitOn: function() {
			return [
				Meteor.subscribe('posts'),
				Meteor.subscribe('tags')
			]
		},
		data: function() {
			return {
				posts: Posts.find({}, {sort: {createdAt: -1}})
			}
		}		
	});
}, {name: "Posts"});

Router.route('/profile/:username', function() {
	this.render('editProfile', {
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
	});
}, {name: "edit.profile"});
