Tweeteor =  {};

Meteor.startup(function () {
    if(Meteor.isClient) {
        _.extend(Notifications.defaultOptions, {
            timeout: 1500
        });    
    }
});
