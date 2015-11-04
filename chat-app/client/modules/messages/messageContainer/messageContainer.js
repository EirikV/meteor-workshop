Template.MessageContainer.helpers({
    messages: function () {
        return Messages.find({}, {sort: {timestamp: -1}});
    }
});

Template.MessageContainer.events({
    'keydown textarea': function (e) {

        if (!(e.which === 13 && !e.shiftKey)) return;
        Meteor.call('addMessage', $('textarea').val(), Session.get('currentUser'), function (err) {
            if (!err) {
                $('textarea').val('');
            }
        });
    }
});