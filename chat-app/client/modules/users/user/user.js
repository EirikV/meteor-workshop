var lastEvent = Date.now();
var updateDep = new Tracker.Dependency;

var setUserOnline = function() {
    if((Date.now() - lastEvent) > 10000) {
        Meteor.call('setUserOnline', Session.get('currentUser'));
        lastEvent = Date.now();
        updateDep.changed();
    }
};

var getTime = function() {
    updateDep.depend();
    return lastEvent;
};

Template.body.events({
    'mousemove': function() {
        setUserOnline();
    },
    'keyup': function() {
        setUserOnline();
    }
});

Template.User.helpers({
    name: function() {
        return this.firstname + ' ' + this.lastname;
    },
    displayMode: function() {
        var current = Session.get('currentUser');

        if(!current || !this) {
            return '';
        }

        return (current._id === this._id) ? '-current' : '';
    },
    status: function() {
        return (getTime()-this.lastOnline <= 30000) ? '-online' : '-offline';
    }
});