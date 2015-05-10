Meteor.publish('posts', function(username) {
	var posts = Posts.find();

	return posts;
});

Meteor.publish('tags', function() {
	return Tags.find();
});