Meteor.publish("posts", function(username) {
	var posts = Posts.find();

	return posts;
});