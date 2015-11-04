Meteor.publish('posts', function () {
    var posts = Posts.find();

    return posts;
});

Meteor.publish('tags', function () {
    return Tags.find();
});