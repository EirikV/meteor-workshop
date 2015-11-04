Meteor.publish('profiles', function () {
    return Meteor.users.find({}, {
        fields: {'username': 1, 'profile': 1}
    });
});

Meteor.publish('images', function () {
    return Images.find();
});