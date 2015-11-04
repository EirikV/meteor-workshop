Template.actionBar.events({
    'click .glyphicon-home': function () {
        Router.go('Posts');
    },

    'click .glyphicon-log-out': function () {
        Meteor.logout();
        Router.go('Posts');
    }
});