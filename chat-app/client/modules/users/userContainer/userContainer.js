Template.UserContainer.helpers({
    users: function () {
        return Users.find({}, {sort: {lastOnline: -1}});
    }
});