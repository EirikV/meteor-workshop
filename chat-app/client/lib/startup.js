var findUserFromLocalStorage = function(userId) {
    //DB is not ready on client yet. Find user on server.
    Meteor.call('initUserFromLocalStorage', userId, function(err, res) {
        if(res) {
            Session.set('currentUser', res);
        } else {
            createUser();
        }
    });
};

var createUser = function(){
    Meteor.call('addUser', function(err, res) {
        if(res) {
            Session.set('currentUser', res);
            localStorage.setItem('meteorChatUserId', res._id);
        }
    });
};

Meteor.startup(function() {
    var userId = localStorage.getItem('meteorChatUserId');

    if(userId) {
        findUserFromLocalStorage(userId);
    } else {
        createUser();
    }

});