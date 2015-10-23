Meteor.startup(function() {
    Meteor.call('addUser', function(err, res) {
        if(res) {
            Session.set('currentUser', res);
        }
    });
});