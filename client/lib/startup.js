var now = new Date();
function notify(post) {
    var user = Meteor.users.findOne(post.userId);
    if(post.userId === Meteor.user()._id) {
        return;
    } 
    if(post.createdAt > now) {
        new Notification('New post from: ' + user.username + '.');
    }
}

Meteor.startup(function(){
    Posts.find({}).observeChanges({
        added: function(id, post) {
            if(Notification.permission === 'granted') {
                notify(post);
            } else {
                Notification.requestPermission(function(permission) {
                    if(Notification.permission === 'granted') {
                        notify(post);
                    }
                });
            }
        }
    });
});